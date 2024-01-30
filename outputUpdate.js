const caseTable = base.getTable('Dev Cases');
const assignmentTable = base.getTable('Dev Case Assignments');
let cases = await caseTable.selectRecordsAsync({fields: ['Id', 'County']});
let assignments = await assignmentTable.selectRecordsAsync({fields: ['Case Id']});
let county = '';
let phrase = '';

// Loop through each of the records, and assign a phrase depending on the county listed. 
for (let singleCase of cases.records) {
  county = singleCase.getCellValueAsString('County');
  if (county == 'Baltimore') {
    phrase = 'Hello, world!'
  } else if (county == 'Allegany') {
    phrase = 'So long and thanks for all the fish.'
  } else (
    phrase = 'No county, no fish.'
  )

  caseTable.updateRecordAsync(singleCase.id, {'Output': phrase});
   
  for (let assignment of assignments.records) {
    let caseIdFromAssignments = assignment.getCellValueAsString('Case Id');
    let caseIdFromCases = singleCase.getCellValueAsString('Id');
    
    console.log('case id from assignment table:' + caseIdFromAssignments);
    console.log('case id from case table:' + caseIdFromCases);
    
    if (caseIdFromCases == caseIdFromAssignments) {
       assignmentTable.updateRecordAsync(assignment.id, {'Cross table output': 'DONT PANTIC'});
    }
  }
}
