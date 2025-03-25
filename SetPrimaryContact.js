window.setPrimaryContact = async function (executionContext) {
    var formContext = executionContext.getFormContext();

    // Get selected Account
    var accountField = formContext.getAttribute("parentaccountid");
    if (!accountField || !accountField.getValue()) {
        console.log("No account selected.");
        return;
    }

    var accountId = accountField.getValue()[0].id.replace(/[{}]/g, ""); // Extract GUID
    console.log("Selected Account ID:", accountId);

    // Retrieve Account's Primary Contact using $expand
    Xrm.WebApi.retrieveRecord("account", accountId, "?$expand=primarycontactid($select=contactid,fullname)").then(
        function (result) {
            console.log("API Response:", result);

            if (result.primarycontactid) {
                console.log("Primary Contact Found:", result.primarycontactid.fullname);

                var contactField = formContext.getAttribute("parentcontactid");
                if (contactField) {
                    var contact = [{
                        id: result.primarycontactid.contactid,
                        name: result.primarycontactid.fullname,
                        entityType: "contact"
                    }];

                    contactField.setValue(contact);
                    console.log("Primary Contact Set:", result.primarycontactid.fullname);
                }
            } else {
                console.log("No primary contact found for the selected account.");
                
                // Clear contact field if no primary contact exists
                var contactField = formContext.getAttribute("parentcontactid");
                if (contactField) {
                    contactField.setValue(null);
                    console.log("Contact field cleared.");
                }
            }
        },
        function (error) {
            console.error("Error retrieving primary contact:", error.message);
        }
    );
};
