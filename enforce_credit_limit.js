function enforceCreditLimit(executionContext) {
    var formContext = executionContext.getFormContext(); // Get form context
    var industryField = formContext.getAttribute("industrycode"); // Get Industry field

    if (industryField) {
        var industryValue = industryField.getValue(); // Get selected Industry value

        if (industryValue === 1) { // Assuming "1" is the value for "Accounting"
            formContext.getAttribute("creditlimit").setRequiredLevel("required"); // Make required
        } else {
            formContext.getAttribute("creditlimit").setRequiredLevel("none"); // Remove requirement
        }
    }
}
