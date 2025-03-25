function clearPrimaryContact(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get the Account Name value
    var accountName = formContext.getAttribute("name").getValue();

    // Check if Account Name is "Devsinc"
    if (accountName && accountName.toLowerCase() === "devsinc") {
        // Clear the Primary Contact field
        formContext.getAttribute("primarycontactid").setValue(null);

        // Disable the Primary Contact field
        formContext.getControl("primarycontactid").setDisabled(true);
    } else {
        // Enable the Primary Contact field if the name is not "Devsinc"
        formContext.getControl("primarycontactid").setDisabled(false);
    }
}
