async function copyQuoteProducts(executionContext) {
    try {
        var formContext = executionContext.getFormContext();

        // Get the selected Quote from Lookup
        var relatedQuoteField = formContext.getAttribute("new_relatedquote");
        if (!relatedQuoteField) {
            console.warn("⚠️ Related Quote field not found.");
            return;
        }

        var selectedQuote = relatedQuoteField.getValue();
        if (!selectedQuote) {
            console.warn("⚠️ No related Quote selected, clearing subgrid.");
            return;
        }

        var selectedQuoteId = selectedQuote[0].id.replace(/[{}]/g, "");
        console.log("🟢 Selected Related Quote ID:", selectedQuoteId);

        // Get the current Quote ID
        var currentQuoteId = formContext.data.entity.getId();
        if (!currentQuoteId) {
            console.error("❌ Error: Current Quote has no ID. Save the record first.");
            alert("Please save the Quote before copying products.");
            return;
        }
        currentQuoteId = currentQuoteId.replace(/[{}]/g, "");
        console.log("🟢 Current Quote ID:", currentQuoteId);

        // Fetch Quote Products (Quote Lines) of the selected Quote
        var fetchQuery = `?$select=_productid_value,_uomid_value,quantity,priceperunit,extendedamount,description&$filter=_quoteid_value eq ${selectedQuoteId}`;
        var response = await Xrm.WebApi.retrieveMultipleRecords("quotedetail", fetchQuery);

        if (!response || response.entities.length === 0) {
            console.warn("⚠️ No products found for the selected quote.");
            return;
        }

        console.log(`✅ Retrieved ${response.entities.length} Quote Products.`);

        // Create Quote Products for the current quote
        var createPromises = response.entities.map(async (quoteProduct) => {
            try {
                // Check if unit ID is available; if not, fetch default unit
                let unitId = quoteProduct._uomid_value;
                if (!unitId) {
                    console.warn(`⚠️ Unit ID missing for product ${quoteProduct._productid_value}, fetching default unit...`);
                    unitId = await getDefaultUnitForProduct(quoteProduct._productid_value);
                    if (!unitId) {
                        console.error(`❌ No default unit found for product ${quoteProduct._productid_value}, skipping.`);
                        return;
                    }
                }

                var newQuoteProduct = {
                    "quoteid@odata.bind": `/quotes(${currentQuoteId})`,
                    "productid@odata.bind": `/products(${quoteProduct._productid_value})`,
                    "uomid@odata.bind": `/uoms(${unitId})`,  // Ensure unit is included
                    "quantity": quoteProduct.quantity || 1, // Default to 1 if missing
                    "priceperunit": quoteProduct.priceperunit || 0, // Default to 0 if missing
                    "extendedamount": quoteProduct.extendedamount || 0,
                    "description": quoteProduct.description || ""
                };

                console.log("📌 Creating Quote Product:", newQuoteProduct);

                var createdRecord = await Xrm.WebApi.createRecord("quotedetail", newQuoteProduct);
                console.log("✅ Product copied successfully:", createdRecord.id);
            } catch (error) {
                console.error("❌ Error copying product:", error.message);
            }
        });

        // Wait for all product creation operations to complete
        await Promise.all(createPromises);

        // Refresh subgrid if exists
        var productSubgrid = formContext.getControl("quotedetailsGrid"); // Adjust ID if needed
        if (productSubgrid) {
            productSubgrid.refresh();
            console.log("🔄 Subgrid refreshed.");
        }

    } catch (error) {
        console.error("❌ An unexpected error occurred:", error.message);
    }
}

/**
 * Fetches the default unit (UOM) for a given product.
 * @param {string} productId - The ID of the product.
 * @returns {Promise<string|null>} - The default unit ID or null if not found.
 */
async function getDefaultUnitForProduct(productId) {
    try {
        var fetchQuery = `?$select=_defaultuomid_value&$filter=productid eq ${productId}`;
        var response = await Xrm.WebApi.retrieveMultipleRecords("product", fetchQuery);

        if (response.entities.length > 0 && response.entities[0]._defaultuomid_value) {
            return response.entities[0]._defaultuomid_value;
        } else {
            console.warn(`⚠️ No default unit found for product ${productId}`);
            return null;
        }
    } catch (error) {
        console.error(`❌ Error fetching default unit for product ${productId}:`, error.message);
        return null;
    }
}
