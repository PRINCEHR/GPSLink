var checkStatus = function() {
  if (navigator.onLine) {
    // user is online
    document.querySelector(".wifi").style.display = "none";
  } else {
    // user is offline
    document.querySelector(".wifi").style.display = "table";
  }
};

// Check Internet Connection
checkStatus();
window.addEventListener("online", function() {
  checkStatus();
});
window.addEventListener("offline", function() {
  checkStatus();
});