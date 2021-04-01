// Based on https://github.com/andreassolberg/jso/tree/version3

var ROOTURL = "localhost/thv2";
const RESTROOT = ROOTURL + "/wp-json";
const RESTROUTE = RESTROOT + "/wp/v2/prescriptions/";

var jso = new JSO({
  providerID: "THPatient",
  client_id: "W5AjiiAG9yDDqbsa9hKzpwb6j2j19RFmFdn9yK1l",
  redirect_uri: "localhost/thv2/THPatient/prescriptionlist.html",
  authorization: ROOTURL + "/oauth/authorize",
});

// Catch the response after login:
jso.callback();

var token = localStorage.getItem("tokens-Prescriptionbook");

// Trigger OAuth 2 authentication sequence:
function oauthLogin() {
  jso.getToken();
}

// Log out and wipe all memory of the session:
function oauthLogout() {
  jso.wipeTokens();
}

// Monitor the login button:
$("#login").click(function () {
  oauthLogin();
});

// Monitor the logout button:
$("#logout").click(function () {
  oauthLogout();
  window.location.href = "/";
});

(function () {
  // If we are on the home page, redirect to tasklist.html:
  if (location.pathname == "localhost/thv2/thpatient") {
    // If we have a token, assume we're logged in:
    if (token !== null) {
      window.location.href = "/thv2/THPatient/prescriptionlist.html";
    }
  } else {
    // If we have a token, assume we're logged in:
    if (token !== null) {
      // Enable JSO jQuery wrapper:
      JSO.enablejQuery($);
    } else {
      // If we're not logged in, redirect to the login page:
      window.location.href = "localhost/thv2/roshan.html";
    }
  }
})();
