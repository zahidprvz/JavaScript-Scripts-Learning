function refreshSubgrid(executionContext) {
    var formContext = executionContext.getFormContext();
    var subgrid = formContext.getControl("Subgrid_new_1"); // Change "Contacts" to your subgrid name
    if (subgrid) {
        subgrid.refresh();
        console.log("Sub-grid refreshed successfully.");
    } else {
        console.log("Sub-grid not found.");
    }
}

function countSubgridRecords(executionContext) {
    var formContext = executionContext.getFormContext();
    var subgrid = formContext.getControl("Subgrid_new_1"); // Change "Contacts" to your subgrid name
    if (subgrid && subgrid.getGrid()) {
        var recordCount = subgrid.getGrid().getTotalRecordCount();
        alert("Total records in sub-grid: " + recordCount);
    } else {
        alert("Sub-grid not found.");
    }
}
