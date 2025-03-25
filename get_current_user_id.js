function getCurrentUserId() {
    var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
    console.log("Current User ID: " + userId);
}
