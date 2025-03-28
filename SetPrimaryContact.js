window.setPrimaryContact = async function (executionContext) {
    const formContext = executionContext.getFormContext();

    // Get the selected Account
    const accountField = formContext.getAttribute("parentaccountid");
    if (!accountField || !accountField.getValue()) {
        console.log("No account selected. Skipping primary contact lookup.");
        return;
    }

    const accountId = accountField.getValue()[0].id.replace(/[{}]/g, ""); // Extract GUID
    console.log(`Selected Account ID: ${accountId}`);

    try {
        // Retrieve the Account's Primary Contact using $expand
        const result = await Xrm.WebApi.retrieveRecord("account", accountId, "?$expand=primarycontactid($select=contactid,fullname)");
        console.log("API Response:", result);

        const contactField = formContext.getAttribute("parentcontactid");

        if (result.primarycontactid) {
            console.log(`Primary Contact Found: ${result.primarycontactid.fullname}`);

            if (contactField) {
                contactField.setValue([{
                    id: result.primarycontactid.contactid,
                    name: result.primarycontactid.fullname,
                    entityType: "contact"
                }]);
                console.log(`Primary Contact Set: ${result.primarycontactid.fullname}`);
            }
        } else {
            console.log("No primary contact found for the selected account.");

            // Clear the contact field if no primary contact exists
            if (contactField) {
                contactField.setValue(null);
                console.log("Contact field cleared.");
            }
        }
    } catch (error) {
        console.error("Error retrieving primary contact:", error.message);
    }
};
