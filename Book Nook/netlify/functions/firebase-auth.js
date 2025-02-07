const { initializeApp } = require("firebase/app");
const { getAuth, signInWithPopup, GoogleAuthProvider } = require("firebase/auth");

// Load Firebase config from environment variables
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

exports.handler = async function(event, context) {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return {
            statusCode: 200,
            body: JSON.stringify({ email: user.email })
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message })
        };
    }
};
