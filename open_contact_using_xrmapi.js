function openContact() {
    var contactId = "2587600b-07f9-ef11-bae2-00224884d21e"; // Contact GUID
    Xrm.Navigation.openForm({
        entityName: "contact",
        entityId: contactId
    });
}
