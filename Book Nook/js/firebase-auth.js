import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { firebaseConfig } from "./config.js";

// Initialize Firebase Authentication
const auth = getAuth();

// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(auth);

ui.start("#firebaseui-auth-container", {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID, // Enable Google Login
  ],
  signInSuccessUrl: "index.html", // Redirect to homepage after login
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
});

// Handle user authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("user-info").innerText = `Logged in as: ${user.email}`;
    document.getElementById("logout-btn").classList.remove("d-none");
  } else {
    document.getElementById("user-info").innerText = "";
    document.getElementById("logout-btn").classList.add("d-none");
  }
});

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log("User logged out");
  });
});
