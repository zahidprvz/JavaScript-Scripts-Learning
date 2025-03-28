function onCopyPhoneDetailsChange(executionContext) {
    const formContext = executionContext.getFormContext();

    // Get the "Copy Phone Details" field
    const copyPhoneField = formContext.getAttribute("new_copydetails");
    if (!copyPhoneField) {
        console.error("Error: 'Copy Phone Details' field not found.");
        return;
    }

    const copyPhoneValue = copyPhoneField.getValue();
    console.log(`Copy Phone Field Value: ${copyPhoneValue}`);

    if (copyPhoneValue === null || copyPhoneValue === undefined) {
        console.log("No selection made for 'Copy Phone Details'. Exiting function.");
        return;
    }

    // Get phone number fields
    const phoneField = formContext.getAttribute("telephone1");
    const otherPhoneField = formContext.getAttribute("telephone2");

    if (!phoneField || !otherPhoneField) {
        console.error("Error: One or more required phone fields are missing.");
        return;
    }

    if (copyPhoneValue === true || copyPhoneValue === 1) { 
        // If "Yes" is selected, copy the phone number and enable the field
        const phoneValue = phoneField.getValue();
        console.log(`Copying phone number: ${phoneValue}`);
        otherPhoneField.setValue(phoneValue);
        formContext.getControl("telephone2").setDisabled(false);
        console.log("Other Phone field is now editable.");
    } else if (copyPhoneValue === false || copyPhoneValue === 0) { 
        // If "No" is selected, clear the field and disable it
        console.log("Clearing Other Phone field.");
        otherPhoneField.setValue(null);
        formContext.getControl("telephone2").setDisabled(true);
        console.log("Other Phone field is now locked.");
    } else {
        console.warn(`Unexpected Copy Phone Value: ${copyPhoneValue}`);
    }
}
