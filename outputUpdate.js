const caseTable = base.getTable('Dev Cases');
const assignmentTable = base.getTable('Dev Case Assignments');
const officeTable = base.getTable('Dev Offices');
let cases = await caseTable.selectRecordsAsync({fields: ['Id', 'County']});
let assignments = await assignmentTable.selectRecordsAsync({fields: ['Case Id']});
let offices = await officeTable.selectRecordsAsync({fields: ['Name', 'Planet', 'Counties served']});
let county = '';
let phrase = '';

// Loop through the case records.
for (let caseRecord of cases.records) {
  // Get the value in the 'Id' column.
  let caseIdFromCases = caseRecord.getCellValueAsString('Id');
  // Get the value in the 'County' column.
  county = record.getCellValueAsString('County');
  // Assign a phrase based on the value of the 'County' column.
  if (county == 'Baltimore') {
    phrase = 'Hello, world!'
  } else if (county == 'Allegany') {
    phrase = 'So long and thanks for all the fish.'
  } else (
    phrase = 'No county, no fish.'
  )

  // Update the 'Output' column in the Dev Cases tavke with that phrase.
  caseTable.updateRecordAsync(caseRecord.id, {'Output': phrase});

  // Loop through the assignment records.
  for (let assignment of assignments.records) {
    // Get the value in the 'Case Id' column.
    let caseIdFromAssignments = assignment.getCellValueAsString('Case Id');

    // For testing.
    console.log(`assignmentTable case id: ${caseIdFromAssignments}`);
    console.log(`caseTable case id:  ${caseIdFromCases}`);
    
    // If the Ids from the Cases and Assignments table match, update the 'Cross table output' column.
    if (caseIdFromCases == caseIdFromAssignments) {
       assignmentTable.updateRecordAsync(assignment.id, {'Cross table output': 'DONT PANTIC'});
    }
  }
}
