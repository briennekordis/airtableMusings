const caseTable = base.getTable('Dev Cases');
const officeTable = base.getTable('Dev Offices');
let cases = await caseTable.selectRecordsAsync({fields: ['Id', 'County', 'Case type']});
let offices = await officeTable.selectRecordsAsync({fields: ['Id', 'Name', 'Counties served', 'Case types accepted']});
let officesData = {};
let recommendedOffices = [];

// Get the Airtable record ID of the current Case record.
let inputConfig = input.config();
let caseId = inputConfig.CaseID;

// Use the Airtable record ID to get the Case record.
let caseRecord = cases.getRecord(caseId);

// Get the county of the current case record. If there's no value, set to an empty string.
let caseCounty = caseRecord.getCellValue('County').name ?? '';

// Get the case type of the current case record. If there's no value, set to an empty string.
let caseType = caseRecord.getCellValue('Case type').name ?? '';

// Get information about the offices from the Dev Offices table.
for (let office of offices.records) {
  let officeId = office.getCellValue('Id');
  officesData[officeId] = {
    name: office.getCellValue('Name'), 
    typesAccepted: office.getCellValueAsString('Case types accepted'), 
    countiesServed: office.getCellValueAsString('Counties served')
  };
    // Check to see if the office being currently evaluated in the loop serves the county of this case.
  if (officesData[officeId].countiesServed.includes(caseCounty)) {
    // Check to see if this office accepts the case type of this case.
    if (officesData[officeId].typesAccepted.includes(caseType)) {
        // If both conditions are met, add this office to the recommendedOffices array.
        recommendedOffices.push(officesData[officeId].name);
    }
  }
};

/* 
 * This method of variable assignment breaks out the recommendedOffices array, checking if that index in the array exsists.
 * If the index exists, it assigns the value of that element to a new variable.
 * If it doesn't exist, the variable is set to an empty string.
 * Seperate variables are being used to update seperate columns in the Cases table.
*/ 
let recOffice1 = recommendedOffices[0] ?? '';
let recOffice2 = recommendedOffices[1] ?? '';
let recOffice3 = recommendedOffices[2] ?? '';

// Update columns in the Dev Cases table with the relevant values.
caseTable.updateRecordAsync(caseId, {
  'Recommended Office 1': recOffice1,
  'Recommended Office 2': recOffice2,
  'Recommended Office 3': recOffice3,
});
