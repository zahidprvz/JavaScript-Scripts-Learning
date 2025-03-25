function clearPrimaryContact(executionContext) {
    var formContext = executionContext.getFormContext();
    formContext.getAttribute("primarycontactid").setValue(null);
}
