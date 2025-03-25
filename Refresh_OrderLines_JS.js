function refreshOrderLines(executionContext) {
    var formContext = executionContext.getFormContext(); // Get the form context

    // Ensure the subgrid exists before refreshing
    var subgrid = formContext.getControl("salesorderdetailsGrid");
    if (subgrid) {
        subgrid.refresh(); // Refresh the subgrid
        console.log("salesorderdetailsGrid subgrid has been refreshed successfully.");
    } else {
        console.log("salesorderdetailsGrid subgrid not found.");
    }
}
