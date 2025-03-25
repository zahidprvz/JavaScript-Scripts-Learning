function createCaseForContact() {
    var formContext = Xrm.Page; // Use Xrm.Page instead of executionContext

    var contactLookup = formContext.getAttribute("primarycontactid").getValue(); // Lookup Field

    if (contactLookup) {
        var contactId = contactLookup[0].id.replace(/[{}]/g, ""); // Remove curly braces

        var parameters = {
            title: "New Case for " + contactLookup[0].name,
            customerid: contactId
        };

        Xrm.Navigation.openForm({
            entityName: "incident",
            useQuickCreateForm: true,
            createFromEntity: { entityType: "contact", id: contactId },
            parameters: parameters
        });
    } else {
        alert("No primary contact found for this record.");
    }
}
