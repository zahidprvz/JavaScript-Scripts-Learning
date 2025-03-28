function refreshOrderLines(executionContext) {
    const formContext = executionContext.getFormContext();

    const subgrid = formContext.getControl("salesorderdetailsGrid");

    // if subgrid exists then refresh the subgrid
    if (subgrid) {
        subgrid.refresh();
        console.log("Sales order details grid refreshed successfully.");
    } else {
        console.warn("Sales order details grid not found.");
    }
}
