import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    const rawKey = process.env.FIREBASE_PRIVATE_KEY;
    const privateKey = rawKey 
      ? rawKey.replace(/\\n/g, "\n").replace(/^"(.*)"$/, '$1')
      : undefined;

    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
      console.warn("⚠️ Firebase Admin environment variables are missing. Initialization skipped.");
    } else {
      console.log(`📡 Initializing Firebase Admin for project: ${process.env.FIREBASE_PROJECT_ID}`);
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
      });
      console.log("✅ Firebase Admin initialized successfully.");
    }
  } catch (error) {
    console.error("❌ Firebase admin initialization error:", error);
  }
}

// These will be null if initialization failed, but at least the module won't throw on import.
export const db = admin.apps.length ? admin.firestore() : null as unknown as admin.firestore.Firestore;
export const auth = admin.apps.length ? admin.auth() : null as unknown as admin.auth.Auth;
