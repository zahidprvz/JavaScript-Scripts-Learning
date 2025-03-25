function filterCountryByCity(executionContext) {
    var formContext = executionContext.getFormContext();

    var cityField = formContext.getAttribute("new_customcity");
    var countryField = formContext.getAttribute("new_customcountry");

    if (!cityField || !countryField) {
        console.log("Custom City or Custom Country field not found.");
        return;
    }

    var cityText = cityField.getText(); // Get the selected city's label
    console.log("Selected City Label:", cityText);

    // Mapping cities to country labels
    var cityToCountryMap = {
        "Waterloo": "Canada",
        "Banglore": "India"
    };

    if (cityText && cityToCountryMap[cityText]) {
        var countryLabel = cityToCountryMap[cityText];
        console.log("Setting Country to:", countryLabel);

        // Get available options in the Country option set
        var countryOptions = countryField.getOptions();
        var countryValue = null;

        // Find the correct value based on label
        countryOptions.forEach(function(option) {
            if (option.text === countryLabel) {
                countryValue = option.value;
            }
        });

        if (countryValue !== null) {
            countryField.setValue(countryValue); // Set country based on label
        } else {
            console.log("Country label not found in options.");
            countryField.setValue(null);
        }
    } else {
        console.log("Clearing Custom Country field.");
        countryField.setValue(null);
    }
}
