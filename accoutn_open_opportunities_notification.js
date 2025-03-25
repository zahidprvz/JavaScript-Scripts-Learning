function showOpenOpportunities(executionContext) {
    var formContext = executionContext.getFormContext();
    var accountId = formContext.data.entity.getId(); // Get Account ID

    console.log("Account ID: ", accountId); // Debugging log

    if (!accountId) {
        console.log("No Account ID found.");
        return; // Exit if no account is selected
    }

    var fetchXml = `
        <fetch aggregate='true'>
            <entity name='opportunity'>
                <attribute name='opportunityid' alias='opportunity_count' aggregate='count'/>
                <filter>
                    <condition attribute='parentaccountid' operator='eq' value='${accountId}' />
                    <condition attribute='statecode' operator='eq' value='0' /> 
                </filter>
            </entity>
        </fetch>`;

    Xrm.WebApi.retrieveMultipleRecords("opportunity", "?fetchXml=" + encodeURIComponent(fetchXml))
        .then(function (result) {
            console.log("FetchXML Result: ", result);

            if (result.entities.length > 0) {
                var count = result.entities[0]["opportunity_count"];
                console.log("Open Opportunities Count: ", count);

                if (count > 0) {
                    formContext.ui.setFormNotification(`This Account has ${count} open opportunities.`, "INFO", "opportunityNotification");
                } else {
                    formContext.ui.clearFormNotification("opportunityNotification");
                }
            }
        })
        .catch(function (error) {
            console.error("Error fetching opportunities:", error);
        });
}
