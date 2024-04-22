import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string
);

// Initialize Firebase
const app = getApps()?.length ? getApps()[0] : initializeApp(firebaseConfig);

export const authClient = getAuth(app);
export const dbClient = getFirestore(app);
export const storageClient = getStorage(app);

// const isDev = process.env.NODE_ENV === 'development';
// if (isDev) {
//   connectAuthEmulator(authClient, 'http://127.0.0.1:9099');
//   connectFirestoreEmulator(dbClient, '127.0.0.1', 8080);
// }
