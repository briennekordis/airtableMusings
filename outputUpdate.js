const caseTable = base.getTable('Dev Cases');
const officeTable = base.getTable('Dev Offices');
let cases = await caseTable.selectRecordsAsync({fields: ['Id', 'County']});
let offices = await officeTable.selectRecordsAsync({fields: ['Id', 'Name', 'Planet', 'Counties served']});
let caseCounty = '';
let officesData = {};
let recommendedOffices = [];
let recOffice1 = '';
let recOffice2 = '';
let recOffice3 = '';

// Get the Airtable record ID of the current Case record.
let inputConfig = input.config();
let caseId = inputConfig.CaseID;

// Use the Airtable record ID to get the Case record.
let caseRecord = cases.getRecord(caseId);

// Get the county of the current case record.
caseCounty = caseRecord.getCellValue('County').name;

// Get information about the offices.
for (let office of offices.records) {
  let officeId = office.getCellValue('Id');
  officesData[officeId] = {
    name: office.getCellValue('Name'), 
    planet: office.getCellValueAsString('Planet'), 
    countiesServed: office.getCellValueAsString('Counties served')
  };
  if (officesData[officeId].countiesServed.includes(caseCounty)) {
    recommendedOffices.push(officesData[officeId].name);
  }
};

/* This is rather inellegant code, so hope to find a better solution in future.
 * Essentially, this code block breaks out the recommendedOffices array, checking if that index in the array exsists.
 * If the index exists, is assigns the value to a new variable.
 * Seperate variables are being used to update seperate columns in the Dev Cases table.
*/ 
if (recommendedOffices[0]) {
    recOffice1 = recommendedOffices[0];
    if (recommendedOffices[1]) {
        recOffice2 = recommendedOffices[1];
        if (recommendedOffices[2]) {
            recOffice3 = recommendedOffices[2];
        }
    }
}

// Update columns in the Dev Cases table with the relevant values.
caseTable.updateRecordAsync(caseId, {
  'Recommended Office 1': recOffice1,
  'Recommended Office 2': recOffice2,
  'Recommended Office 3': recOffice3,
});
