function onCopyPhoneDetailsChange(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get the field correctly
    var copyPhoneField = formContext.getAttribute("new_copydetails");
    if (!copyPhoneField) {
        console.log("❌ Error: Copy Phone Details field not found.");
        return;
    }

    var copyPhoneValue = copyPhoneField.getValue();
    console.log("📌 Copy Phone Field Value Retrieved:", copyPhoneValue);

    if (copyPhoneValue === null || copyPhoneValue === undefined) {
        console.log("⚠️ No selection made for Copy Phone Details. Exiting.");
        return;
    }

    var phoneField = formContext.getAttribute("telephone1");
    var otherPhoneField = formContext.getAttribute("telephone2");

    if (!phoneField || !otherPhoneField) {
        console.log("❌ Error: One or more required fields not found.");
        return;
    }

    if (copyPhoneValue === true || copyPhoneValue === 1) { 
        // Handle 'Yes' selection
        var phoneValue = phoneField.getValue();
        console.log("✅ Copying Phone:", phoneValue);
        otherPhoneField.setValue(phoneValue); // Copy value
        formContext.getControl("telephone2").setDisabled(false); // Unlock field
        console.log("✅ Other Phone field is now unlocked.");
    } else if (copyPhoneValue === false || copyPhoneValue === 0) { 
        // Handle 'No' selection
        console.log("❌ Clearing Other Phone field.");
        otherPhoneField.setValue(null); // Clear value
        formContext.getControl("telephone2").setDisabled(true); // Lock field
        console.log("❌ Other Phone field is now locked.");
    } else {
        console.log("⚠️ Unexpected Copy Phone Value:", copyPhoneValue);
    }
}
