function onFormLoad(executionContext) {
    var formContext = executionContext.getFormContext();

    // Hide Business Phone on form load
    formContext.getControl("telephone1").setVisible(false);

    // Check Job Title on Load (for existing records)
    var jobTitle = formContext.getAttribute("jobtitle").getValue();
    if (jobTitle && jobTitle.toLowerCase() === "manager") {
        formContext.getControl("emailaddress1").setDisabled(true);
    }

    // Attach an OnChange Event for First Name
    formContext.getAttribute("firstname").addOnChange(setPreferredContactMethod);
}

function setPreferredContactMethod(executionContext) {
    var formContext = executionContext.getFormContext();
    var firstName = formContext.getAttribute("firstname").getValue();

    if (firstName && firstName.toLowerCase() === "john") {
        formContext.getAttribute("preferredcontactmethodcode").setValue(2); // Phone
    }
}
