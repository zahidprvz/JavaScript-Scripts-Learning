function lockFieldsOnLoad(executionContext) {
        var formContext = executionContext.getFormContext();
    
        // Lock the "Other Phone" field
        var otherPhoneControl = formContext.getControl("telephone2");
        if (otherPhoneControl) {
            otherPhoneControl.setDisabled(true);
        }
    }
    