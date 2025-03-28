function onLoad(executionContext) {
    const formContext = executionContext.getFormContext();

    // Register the event to validate BPF stage changes
    formContext.data.process.addOnPreStageChange(validateBPFStageMovement);
}

function validateBPFStageMovement(executionContext) {
    const eventArgs = executionContext.getEventArgs(); 
    const formContext = executionContext.getFormContext();

    console.log("Stage change detected.");

    // Get the active stage in the process flow
    const processFlow = formContext.data.process;
    const activeStage = processFlow.getActiveStage();

    if (!activeStage) {
        console.warn("No active stage found.");
        return;
    }

    const activeStageName = activeStage.getName();
    console.log(`Current stage: ${activeStageName}`);

    // Restrict movement from the "Propose" stage if conditions aren't met
    if (activeStageName === "Propose") {
        const estimatedRevenue = formContext.getAttribute("estimatedvalue").getValue();

        if (estimatedRevenue !== null && estimatedRevenue <= 30000) {
            console.warn("Stage movement blocked: Estimated revenue is too low.");
            eventArgs.preventDefault(); // Prevent the stage change
            
            Xrm.Navigation.openAlertDialog({
                text: "Estimated Revenue must be greater than 30,000 to proceed to the next stage."
            });
        }
    }
}
