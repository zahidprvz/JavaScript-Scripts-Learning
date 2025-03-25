function confirmHighPriority(executionContext) {
    console.log("✅ JavaScript Loaded! (confirmHighPriority function executed)"); 

    var formContext = executionContext.getFormContext();
    if (!formContext) {
        console.error("❌ Error: Form Context is null.");
        return;
    }

    console.log("🔍 Checking Priority Field...");
    var priorityField = formContext.getAttribute("prioritycode");
    if (!priorityField) {
        console.error("❌ Error: Priority field not found.");
        return;
    }

    var priorityValue = priorityField.getValue();
    console.log("📌 Priority Value Retrieved:", priorityValue);

    // Assuming 1 = High Priority (Check your system for correct value)
    if (priorityValue === 1) { 
        var userResponse = confirm("⚠️ The priority is set to HIGH. Are you sure you want to continue?");
        
        if (!userResponse) {
            console.log("🚫 User clicked 'No'. Preventing Save.");
            executionContext.getEventArgs().preventDefault(); // Stops the save process
        } else {
            console.log("✅ User clicked 'Yes'. Case will be saved.");
        }
    }
}
