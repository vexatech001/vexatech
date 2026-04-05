import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBSPbfVl7IYWJMn-JgHe9OYOqsng5hxMhM",
  authDomain: "vexatech-2fc3e.firebaseapp.com",
  projectId: "vexatech-2fc3e",
  storageBucket: "vexatech-2fc3e.firebasestorage.app",
  messagingSenderId: "439685377238",
  appId: "1:439685377238:web:ba213aad68038c81646d77",
  measurementId: "G-Q4KMQ0TXV2",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

// Optional analytics for browser only
let analytics: any = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, analytics };
