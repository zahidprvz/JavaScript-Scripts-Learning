    function copyQuoteProducts(executionContext) {
        var formContext = executionContext.getFormContext();

        // Get the selected Quote from Lookup
        var relatedQuoteField = formContext.getAttribute("new_relatedquote");
        if (!relatedQuoteField) {
            console.log("⚠️ Related Quote field not found.");
            return;
        }

        var selectedQuote = relatedQuoteField.getValue();
        if (!selectedQuote) {
            console.log("⚠️ No related Quote selected, clearing subgrid.");
            return;
        }

        var selectedQuoteId = selectedQuote[0].id.replace(/[{}]/g, "");
        console.log("🟢 Selected Related Quote ID:", selectedQuoteId);

        // Fetch Quote Products (Quote Lines) of the selected Quote
        Xrm.WebApi.retrieveMultipleRecords("quotedetail", "?$filter=_quoteid_value eq " + selectedQuoteId).then(
            function (result) {
                console.log("✅ Retrieved Quote Products:", result.entities);

                if (result.entities.length === 0) {
                    console.log("⚠️ No products found for the selected quote.");
                    return;
                }

                // Get the current Quote ID
                var currentQuoteId = formContext.data.entity.getId().replace(/[{}]/g, "");
                console.log("🟢 Current Quote ID:", currentQuoteId);

                // Loop through retrieved quote products and create new ones for the current quote
                result.entities.forEach(function (quoteProduct) {
                    var newQuoteProduct = {
                        "quoteid@odata.bind": "/quotes(" + currentQuoteId + ")",
                        "productid@odata.bind": "/products(" + quoteProduct._productid_value + ")",
                        "quantity": quoteProduct.quantity,
                        "priceperunit": quoteProduct.priceperunit,
                        "extendedamount": quoteProduct.extendedamount,
                        "description": quoteProduct.description
                    };

                    Xrm.WebApi.createRecord("quotedetail", newQuoteProduct).then(
                        function (success) {
                            console.log("✅ Product copied:", success);
                        },
                        function (error) {
                            console.error("❌ Error copying product:", error.message);
                        }
                    );
                });

                // Refresh the subgrid to display new products
                var productSubgrid = formContext.getControl("quotedetailsGrid"); // Adjust ID if needed
                if (productSubgrid) {
                    productSubgrid.refresh();
                    console.log("🔄 Subgrid refreshed.");
                }
            },
            function (error) {
                console.error("❌ Error retrieving quote products:", error.message);
            }
        );
    }
