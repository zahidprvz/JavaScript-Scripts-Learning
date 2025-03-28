function showOpenOpportunities(executionContext) {
    const formContext = executionContext.getFormContext();
    const accountId = formContext.data.getId();

    console.log("This is the account ID, we are fetching opportunities for: " + accountId);

    if (!accountId) {
        console.log("Account ID not found..!");
        return;
    }

    const fetchXml = `
    <fetch aggregate='true'>
        <entity name='opportunity'>
            <attribute name='opportunityid' alias='opportunity_count' aggregate='count' />
                <filter>
                    <condition attribute='parentaccountid' operator='eq' value='${accountId}' />
                    <condition attribute='statecode' operator='eq' value='0' />
                </filter>
        </entity>
    </fetch>`;

    Xrm.WebApi.retrieveMultipleRecords("opportunity", "?fetchXml=" + encodeURIComponent(fetchXml))
        .then(function (result) {
            console.log("FetchXML result: " + result);

            if (result.entities.length > 0 ) {
                var count = result.entities[0]["oppurtunity_count"];
                console.log("Open opportunities count: " + count);

                if (count > 0) {
                    formContext.ui.setFormNotification(`This account has ${count} open opportunities.`, "INFO", "opportunityNotification");
                } else {
                    formContext.ui.setFormNotification("opportunityNotification")
                }
            }
        })
        .catch(function (error) {
            console.log("Error fetching opportunities: ", error);
        });
}