const caseTable = base.getTable('Dev Cases');
const officeTable = base.getTable('Dev Offices');
let cases = await caseTable.selectRecordsAsync({fields: ['Id', 'County', 'Case type']});
let offices = await officeTable.selectRecordsAsync({fields: ['Id', 'Name', 'Counties served', 'Case types accepted']});
let caseCounty = '';
let caseType = '';
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

// Get the case type of the current case record.
caseType = caseRecord.getCellValue('Case type').name;

// Get information about the offices.
for (let office of offices.records) {
  let officeId = office.getCellValue('Id');
  officesData[officeId] = {
    name: office.getCellValue('Name'), 
    typesAccepted: office.getCellValueAsString('Case types accepted'), 
    countiesServed: office.getCellValueAsString('Counties served')
  };
  if (officesData[officeId].countiesServed.includes(caseCounty)) {
    if (officesData[officeId].typesAccepted.includes(caseType)) {
        recommendedOffices.push(officesData[officeId].name);
    }
  }
};

/* Not the most ellegant code, so hope to find a better solution in future.
 * Essentially, this code block breaks out the recommendedOffices array, checking if that index in the array exsists.
 * If the index exists, is assigns the value to a new variable.
 * Seperate variables are being used to update seperate columns in the Cases table.
 * Nesting of the conditionals is acceptable here because the recommendedOffices is created as indexed array, so a higher index would not exist if the previous index does not.
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
