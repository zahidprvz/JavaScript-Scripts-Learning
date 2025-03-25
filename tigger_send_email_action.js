function callCustomAction(primaryControl) {
    if (!primaryControl) {
        console.error("Primary control is undefined or invalid.");
        return;
    }

    var caseId = primaryControl.data.entity.getId(); // Get Case ID

    if (!caseId) {
        alert("No Case found to trigger the email.");
        return;
    }

    var request = {
        entity: { entityType: "incident", id: caseId }, // "incident" is the entity name for Case
        getMetadata: function () {
            return {
                boundParameter: "entity",
                parameterTypes: {
                    entity: { typeName: "mscrm.incident", structuralProperty: 5 }
                },
                operationType: 0,
                operationName: "new_NotifyCustomeronCaseStatusChange" // Replace with your actual Custom Action name
            };
        }
    };

    Xrm.WebApi.online.execute(request).then(
        function success(response) {
            alert("Email sent successfully!");
        },
        function error(error) {
            console.error("Error triggering email:", error.message);
            alert("Error sending email: " + error.message);
        }
    );
}
