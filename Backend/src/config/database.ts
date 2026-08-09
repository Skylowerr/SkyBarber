import admin from 'firebase-admin';
import path from 'path';

let serviceAccount: any;

if (process.env.FIREBASE_CREDENTIALS) {
    //Şifreyi (Environment Variable) okur
    serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
} else {
    const serviceAccountPath = path.resolve(__dirname, '../../firebase-service-account.json');
    serviceAccount = require(serviceAccountPath);
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();