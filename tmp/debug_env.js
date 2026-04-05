
console.log("PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log("CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
console.log("PRIVATE_KEY EXISTS:", !!process.env.FIREBASE_PRIVATE_KEY);
if (process.env.FIREBASE_PRIVATE_KEY) {
  console.log("PRIVATE_KEY STARTS WITH QUOTE:", process.env.FIREBASE_PRIVATE_KEY.startsWith('"'));
}
