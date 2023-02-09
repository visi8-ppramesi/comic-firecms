import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import {
    browserLocalPersistence,
    getAuth,
    setPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const functions = getFunctions(app, "asia-southeast2");
const performance = getPerformance(app);

setPersistence(auth, browserLocalPersistence);

export {
    app,
    db,
    auth,
    storage,
    analytics,
    performance,
    firebaseConfig,
    functions,
};
