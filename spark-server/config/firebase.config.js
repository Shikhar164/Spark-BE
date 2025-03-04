const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

// Parse the Firebase Service Account JSON from .env
const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

// Get Firebase Storage bucket
exports.bucket = admin.storage().bucket();
