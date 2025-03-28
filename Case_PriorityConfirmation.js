function confirmHighPriority(executionContext) {
    console.log("JavaScript Loaded: confirmHighPriority executed");

    const formContext = executionContext.getFormContext();
    if (!formContext) {
        console.error("Error: Unable to retrieve form context.");
        return;
    }

    console.log("Checking the priority field...");
    const priorityField = formContext.getAttribute("prioritycode");

    if (!priorityField) {
        console.error("Error: Priority field not found.");
        return;
    }

    const priorityValue = priorityField.getValue();
    console.log(`Retrieved Priority Value: ${priorityValue}`);

    // Assuming that number 1 represents High Priority
    if (priorityValue === 1) { 
        const userConfirmed = confirm("The priority is set to HIGH. Are you sure you want to proceed?");
        
        if (!userConfirmed) {
            console.log("User chose 'No'. Preventing save action.");
            executionContext.getEventArgs().preventDefault();
        } else {
            console.log("User confirmed. Proceeding with save.");
        }
    }
}
