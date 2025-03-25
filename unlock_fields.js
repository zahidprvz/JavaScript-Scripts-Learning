function unlockFields(executionContext) {
    var formContext = executionContext.getFormContext();
    var phoneValue = formContext.getAttribute("telephone1").getValue();

    var otherPhoneControl = formContext.getControl("telephone2");
    if (otherPhoneControl) {
        otherPhoneControl.setDisabled(!phoneValue); // Unlock only if Phone has a value
    }
}
