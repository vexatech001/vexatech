
const admin = require('firebase-admin');
require('dotenv').config({path:'.env.local'});

const privateKey = process.env.FIREBASE_PRIVATE_KEY 
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n").replace(/^"(.*)"$/, '$1')
  : undefined;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

const db = admin.firestore();

async function test() {
  try {
    console.log("Attempting to connect to Firestore...");
    const collections = await db.listCollections();
    console.log("Connected! Collections:", collections.map(c => c.id));
  } catch (err) {
    console.error("FAILED TO CONNECT:");
    console.error(err.code, err.message);
    if (err.message.includes("database")) {
       console.log("👉 Tip: It looks like the Firestore database hasn't been created in your project yet.");
    }
  }
}

test();
