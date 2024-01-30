const caseTable = base.getTable('Dev Cases');
const assignmentTable = base.getTable('Dev Case Assignments');
const officeTable = base.getTable('Dev Offices');
let cases = await caseTable.selectRecordsAsync({fields: ['Id', 'County']});
let assignments = await assignmentTable.selectRecordsAsync({fields: ['Case Id']});
let offices = await officeTable.selectRecordsAsync({fields: ['Id', 'Name', 'Planet', 'Counties served']});
let caseCounty = '';
let phrase = '';
let officeData = {};
let officeAssigned = '';

// Get the data about offices in a usable format.
for (let office of offices.records) {
  officeData[office.getCellValue('Id')] = {
    name: office.getCellValue('Name'), 
    planet: office.getCellValue('Planet'), 
    countiesServed: office.getCellValue('Counties served')
  };

  // Get a list of counties served.
  let officeCounties =[];
  for (let i = 0; i < officeData[office.getCellValue('Id')].countiesServed.length; i++) {
    officeCounties[i] = officeData[office.getCellValue('Id')].countiesServed[i]['name'];
  }

  // For testing.
  // console.log(officeData[office.getCellValue('Id')].name);
  // console.log(officeData[office.getCellValue('Id')].planet.name);
  // console.log(Object.values(officeData[office.getCellValue('Id')].countiesServed));


  // Loop through the case records.
  for (let caseRecord of cases.records) {
    // Get the value in the 'County' column.
    caseCounty = caseRecord.getCellValueAsString('County');

    // Check to see if caseCounty is within officeCounties.
    if (officeCounties.includes(caseCounty)) {
      officeAssigned = officeData[office.getCellValue('Id')].name; 
    }

    // For testing
    console.log(`
      officeCounty: ${officeCounties}
      caseCounty: ${officeCounties}
      officeAssigned: ${officeAssigned}
      `)

    // Assign a phrase based on the value of the 'County' column.
    if (caseCounty == 'Baltimore') {
      phrase = 'Hello, world!'
    } else if (caseCounty == 'Allegany') {
      phrase = 'So long and thanks for all the fish.'
    } else (
      phrase = 'No county, no fish.'
    )

  // Update the 'Output' and 'Office assigned' columns in the Dev Cases table.
  caseTable.updateRecordAsync(caseRecord.id, {
    'Output': phrase,
    'Office assigned': officeAssigned
  });
  
  }
}
