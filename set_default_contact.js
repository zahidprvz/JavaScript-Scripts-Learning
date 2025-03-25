function setDefaultContact(executionContext) {
    var formContext = executionContext.getFormContext();
    
    // Get the existing primary contact value
    var existingPrimaryContact = formContext.getAttribute("primarycontactid").getValue();
    
    // If a Primary Contact is already set, do nothing
    if (existingPrimaryContact && existingPrimaryContact.length > 0) {
        console.log("Primary Contact already exists. No changes made.");
        return;
    }

    // Define the default contact
    var defaultContact = [{
        id: "ecfac625-44f0-ef11-be20-7c1e5211c9c6", // GUID of your default contact
        entityType: "contact",
        name: "Zarshah"
    }];

    // Set the default contact
    formContext.getAttribute("primarycontactid").setValue(defaultContact);
}
