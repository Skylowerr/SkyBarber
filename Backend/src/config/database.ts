import admin from 'firebase-admin';
import path from 'path';

// Dosya yolunu Backend klasörünün kök dizinine bakacak şekilde düzelttik
const serviceAccountPath = path.resolve(__dirname, '../../firebase-service-account.json');
// Üstteki yol da hata verirse, riske atmamak için doğrudan kesin konumu şu şekilde de yazabilirsin:
// const serviceAccountPath = path.resolve(__dirname, '../../firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath)
});

export const db = admin.firestore();