// Register icons only once
if (typeof window.iconsRegistered === "undefined") {
    registerIcons({
        icons: {
            Warning: <svg>...</svg>, // Define your icon
        },
    });
    window.iconsRegistered = true;
}

// Function to handle form load
function onLoad(executionContext) {
    var formContext = executionContext.getFormContext();

    // Ensure cr18d_Restrict_BPF_Stage_Change exists before accessing
    var stageField = formContext.getAttribute("cr18d_Restrict_BPF_Stage_Change");
    if (stageField) {
        console.log("Stage ID field found:", stageField.getValue());
    } else {
        console.warn("Stage ID field not found.");
    }
}

// Function to restrict stage change based on estimated revenue
function restrictStageChange(executionContext) {
    var formContext = executionContext.getFormContext();

    // Get Estimated Revenue
    var estimatedRevenueField = formContext.getAttribute("estimatedvalue");
    if (!estimatedRevenueField) {
        console.log("Estimated Revenue field not found.");
        return;
    }

    var estimatedRevenue = estimatedRevenueField.getValue();
    console.log("Estimated Revenue:", estimatedRevenue);

    // Get Current Stage ID
    var stageIdField = formContext.getAttribute("stageid");
    if (!stageIdField) {
        console.log("Stage ID field not found.");
        return;
    }

    var stageId = stageIdField.getValue();
    console.log("Current Stage ID:", stageId);

    // If Estimated Revenue is more than 30,000, prevent stage change
    if (estimatedRevenue > 30000) {
        alert("You cannot move to the next or previous stage because Estimated Revenue is greater than 30,000.");
        executionContext.getEventArgs().preventDefault(); // Stop stage change
    }
}

// Register onLoad function
window.onload = function (event) {
    onLoad(event);
};
