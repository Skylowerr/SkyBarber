import admin from 'firebase-admin';
import path from 'path';

const serviceAccountPath = path.resolve(__dirname, '../../firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath)
});

export const db = admin.firestore();