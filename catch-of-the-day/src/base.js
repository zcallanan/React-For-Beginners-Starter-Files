import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD-fL3Y8r8tr7gPw_jNoyAHjBlMn3pfvLg",
    authDomain: "catch-of-the-day-zcall.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-zcall.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

// Default export
export default base;
