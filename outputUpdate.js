let caseTable = base.getTable('Dev Cases');
let queryResult = await caseTable.selectRecordsAsync({fields: ["County"]});
let phrase = '';

for (let record of queryResult.records) {
   switch(record.getCellValueAsString("County")) {
      case "Baltimore":
         phrase = 'Hello, world!'
         break;
      case "Allegany":
         phrase = 'So long and thanks for all the fish'
         break;
      default:
         phrase = 'A county is needed.'
   }
   caseTable.updateRecordAsync(record.id, {'Output': phrase});
}
