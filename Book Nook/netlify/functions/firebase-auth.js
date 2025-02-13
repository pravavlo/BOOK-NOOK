
// exports.handler = async function () {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         apiKey: process.env.FIREBASE_API_KEY,
//         authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//         projectId: process.env.FIREBASE_PROJECT_ID,
//         storageBucket:  process.env.FIREBASE_STORAGE_BUCKET,
//         messagingSenderId: process.env.messagingSenderId,
//         appId: process.env.FIREBASE_APP_ID,
//         measurementId: process.env.FIREBASE_MEASUREMENT_ID
//       }),
//     };
//   };
  

//  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
//  import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

// exports.handler = async function () {
//   try {
//     const firebaseConfig = {
//       apiKey: process.env.FIREBASE_API_KEY,
//       authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       storageBucket:  process.env.FIREBASE_STORAGE_BUCKET,
//       messagingSenderId: process.env.messagingSenderId,
//       appId: process.env.FIREBASE_APP_ID,
//       measurementId: process.env.FIREBASE_MEASUREMENT_ID
//     };

//     const app = initializeApp(firebaseConfig);
//     const auth = getAuth(app);

//     // Set persistence to session-only
//     await setPersistence(auth, browserSessionPersistence);

//     // Google Sign-In Logic
//      window.googleSignIn = async () => {
//       console.log("yes we are firebase in auth");
//       const provider = new GoogleAuthProvider();
//       provider.setCustomParameters({ prompt: 'select_account' });

//       try {
//         const result = await signInWithPopup(auth, provider);
//         return {
//           statusCode: 200,
//           body: JSON.stringify({ user: result.user }),
//         };
//       } catch (error) {
//         return {
//           statusCode: 500,
//           body: JSON.stringify({ error: error.message }),
//         };
//       }
//     };

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: "Firebase initialized successfully." }),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message }),
//     };
//   }
// };

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence } 
  from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

export async function initializeFirebase() {
  try {
   
    const firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket:  process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.messagingSenderId,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID
          };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    await setPersistence(auth, browserSessionPersistence);
    console.log("✅ Firebase initialized with session persistence.");
    
    // Expose Google Sign-In globally
    window.googleSignIn = async () => {
      console.log("✅ Google Sign-In triggered.");
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      try {
        const result = await signInWithPopup(auth, provider);
        console.log("✅ User signed in:", result.user);
      } catch (error) {
        console.error("❌ Google Sign-In Error:", error.message);
      }
    };
  } catch (error) {
    console.error("❌ Firebase initialization error:", error.message);
  }
}
