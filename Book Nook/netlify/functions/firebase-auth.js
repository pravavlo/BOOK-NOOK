
exports.handler = async function () {
    return {
      statusCode: 200,
      body: JSON.stringify({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
      }),
    };
  };
  

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
// import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";


//     const firebaseConfig = {
//         apiKey: process.env.FIREBASE_API_KEY,
//         authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//         projectId: process.env.FIREBASE_PROJECT_ID,
//         storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//         messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//         appId: process.env.FIREBASE_APP_ID
//     };
    
    //   const app = initializeApp(firebaseConfig);
    //   const auth = getAuth(app);
     
    //   setPersistence(auth, browserSessionPersistence)
    //     .then(() => {
    //       console.log("Persistence set to session-only.");
    //     })
    //     .catch(error => {
    //       console.error("Error setting persistence:", error.message);
    //     });
     
    //   // Automatically sign out the user when the page loads or reloads
    //   window.googleSignIn = function () {
    //     const provider = new GoogleAuthProvider();
     
    //     // Force the user to select an account every time
    //     provider.setCustomParameters({
    //       prompt: 'select_account'
    //     });
     
    //     signInWithPopup(auth, provider)
    //       .then(result => {
    //         console.log("User signed in with Google:", result.user);
    //       })
    //       .catch(error => {
    //         console.error("Error:", error.message);
    //       });
    //   };