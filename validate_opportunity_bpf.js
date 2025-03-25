function onLoad(executionContext) {
    var formContext = executionContext.getFormContext();
    // Register BPF events dynamically
    formContext.data.process.addOnPreStageChange(validateBPFStageMovement);
}
function validateBPFStageMovement(executionContext) {
    var eventArgs = executionContext.getEventArgs(); // Get event arguments to prevent stage movement
    var formContext = executionContext.getFormContext();
    console.log("State Changed");
    // Get Active Stage
    var processFlow = formContext.data.process;
    var activeStage = processFlow.getActiveStage();
    if (!activeStage) {
        console.log("No Active Stage Found.");
        return;
    }
    var activeStageName = activeStage.getName();
    console.log("Current Stage: " + activeStageName);
    // Restrict only in the "Propose" stage
    if (activeStageName === "Propose") {
        var estimatedRevenue = formContext.getAttribute("estimatedvalue").getValue(); // Get Estimated Revenue
        if (estimatedRevenue !== null && estimatedRevenue <= 30000) {
            console.log("Estimated Revenue is too low.");
            eventArgs.preventDefault(); // Prevents stage change
            Xrm.Navigation.openAlertDialog({ text: "Estimated Revenue should be greater than 30,000. You cannot move to the next stage." });
        }
    }
}