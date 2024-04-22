import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccountKey = process.env.NEXT_FIREBASE_SERVICE_ACCOUNT_KEY!;
const cleaned = serviceAccountKey.replace(/[\u0000-\u001F]+/g, '');

const serviceAccount = JSON.parse(cleaned);

// https://zenn.dev/mktu/articles/55b3bfee839cfc
const app = !getApps()[0]
  ? initializeApp({
      credential: cert(serviceAccount),
    })
  : getApps()[0];

export const authAdmin = getAuth(app);
export const dbAdmin = getFirestore(app);
