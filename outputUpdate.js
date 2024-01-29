let caseTable = base.getTable('Dev Cases');
let queryResult = await caseTable.selectRecordsAsync({fields: ["County"]});
let phrase = '';

// Loop through each of the records, and assign a phrase depending on the county listed. 
for (let record of queryResult.records) {
   switch(record.getCellValueAsString("County")) {
      case "Baltimore":
         phrase = 'Hello, world!'
         break;
      case "Allegany":
         phrase = 'So long and thanks for all the fish'
         break;
      default:
         phrase = 'No county; no fish.'
   }
   caseTable.updateRecordAsync(record.id, {'Output': phrase});
}
