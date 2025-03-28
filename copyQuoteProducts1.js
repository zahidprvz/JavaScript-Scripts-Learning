function copyQuoteProducts1(executionContext) {
    var formContext = executionContext.getFormContext();
    console.log("Executing reassignQuoteLineItems function.");
    debugger;
    
    // Get the Main Quote ID (current record)
    var mainQuoteId = formContext.data.entity.getId();
    if (!mainQuoteId) {
        console.warn("Main Quote ID is missing. Process cannot continue.");
        return;
    }
    mainQuoteId = mainQuoteId.replace("{", "").replace("}", "");
    console.log("Retrieved Main Quote ID:", mainQuoteId);

    // Get the selected Related Quote ID
    var relatedQuoteField = formContext.getAttribute("new_relatedquote");
    if (!relatedQuoteField || !relatedQuoteField.getValue()) {
        console.warn("No related quote has been selected.");
        return;
    }
    var relatedQuoteId = relatedQuoteField.getValue()[0].id.replace("{", "").replace("}", "");
    console.log("Retrieved Related Quote ID:", relatedQuoteId);

    // **Step 1: Fetch and Remove Existing Products from the Main Quote**
    var deleteFetchXml = `?$select=quotedetailid&$filter=_quoteid_value eq ${mainQuoteId}`;
    Xrm.WebApi.retrieveMultipleRecords("quotedetail", deleteFetchXml).then(
        function (deleteResult) {
            console.log("Removing existing products from the Main Quote...", deleteResult.entities);
            
            var deletePromises = deleteResult.entities.map(function (item) {
                return Xrm.WebApi.deleteRecord("quotedetail", item.quotedetailid);
            });

            // Execute all deletions
            Promise.all(deletePromises).then(function () {
                console.log("All previous products from the Main Quote have been removed.");

                // **Step 2: Retrieve Products from the Related Quote**
                var fetchRelatedProducts = `?$select=quotedetailid,quoteid&$filter=_quoteid_value eq ${relatedQuoteId}`;
                Xrm.WebApi.retrieveMultipleRecords("quotedetail", fetchRelatedProducts).then(
                    function (relatedProducts) {
                        console.log("Successfully retrieved products from the Related Quote:", relatedProducts.entities);

                        if (relatedProducts.entities.length === 0) {
                            console.warn("No products are available in the Related Quote.");
                            return;
                        }

                        // **Step 3: Assign Related Quote Products to Main Quote**
                        var updatePromises = relatedProducts.entities.map(function (item) {
                            var updatedRecord = {
                                "quoteid@odata.bind": `/quotes(${mainQuoteId})` // Bind to main quote
                            };
                            return Xrm.WebApi.updateRecord("quotedetail", item.quotedetailid, updatedRecord);
                        });

                        Promise.all(updatePromises).then(function () {
                            console.log("Successfully linked related quote products to the Main Quote.");

                            // **Step 4: Refresh the Subgrid**
                            var subgridControl = formContext.getControl("quotedetailsGrid");
                            if (subgridControl) {
                                subgridControl.refresh();
                                console.log("The subgrid has been refreshed to reflect the updates.");
                            } else {
                                console.warn("Could not locate the 'quotedetailsGrid' subgrid.");
                            }
                        }).catch(function (error) {
                            console.error("An error occurred while updating quote products:", error.message);
                        });
                    },
                    function (error) {
                        console.error("Failed to retrieve products from the Related Quote:", error.message);
                    }
                );
            }).catch(function (error) {
                console.error("An error occurred while deleting existing quote products:", error.message);
            });
        },
        function (error) {
            console.error("Failed to retrieve quote line items for deletion:", error.message);
        }
    );
}
