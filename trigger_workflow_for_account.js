function triggerWorkflow() {
    var accountId = Xrm.Page.data.entity.getId(); // Get Account ID

    if (!accountId) {
        alert("No Account found to trigger the workflow.");
        return;
    }

    var workflowId = "e5b278ca-cfca-4263-985f-a14a8693b5c4"; // Replace with your Workflow GUID

    var entityId = accountId.replace(/[{}]/g, ""); // Remove curly braces from GUID

    var requestUrl = Xrm.Page.context.getClientUrl() +
        "/api/data/v9.0/workflows(" + workflowId + ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";

    var requestBody = JSON.stringify({ "EntityId": entityId });

    fetch(requestUrl, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "OData-Version": "4.0",
            "OData-MaxVersion": "4.0"
        },
        body: requestBody
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => { throw new Error(errorData.error.message); });
        }
        alert("Workflow triggered successfully.");
    })
    .catch(error => {
        alert("Error triggering workflow: " + error.message);
        console.error(error);
    });
}
