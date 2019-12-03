import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./Module";

window.Kakao.init("44cb0d837ce42427ba3f2e9d08b86f58");
//카카오 로그인 API

// function statusChangeCallback(response) {
//   // Called with the results from FB.getLoginStatus().
//   console.log("statusChangeCallback");
//   console.log("response"); // The current login status of the person.
//   if (response.status === "connected") {
//     // Logged into your webpage and Facebook.
//     testAPI();
//   } else {
//     // Not logged into your webpage or we are unable to tell.
//   }
// }

// function checkLoginState() {
//   // Called when a person is finished with the Login Button.
//   window.FB.getLoginStatus(function(response) {
//     // See the onlogin handler
//     statusChangeCallback(response);
//   });
// }

window.fbAsyncInit = function() {
  window.FB.init({
    appId: "737826633381169",
    cookie: true,
    xfbml: true,
    version: "v5.0"
  });

  window.FB.AppEvents.logPageView();
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

// function testAPI() {
//   // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
//   console.log("Welcome!  Fetching your information.... ");
//   window.FB.api("/me", function(response) {
//     console.log("Successful login for: " + response.name);
//   });
// }
//페이스북 로그인 API

const store = createStore(rootReducer, composeWithDevTools());
//redux store
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
