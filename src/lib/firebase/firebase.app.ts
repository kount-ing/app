import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { env } from '$env/dynamic/public';

/**
 * Your firebase client SDK config goes here
 */
const config = JSON.parse(env['PUBLIC_FIREBASE_CLIENT']);

let firebaseApp: FirebaseApp | undefined;

if (!getApps().length) {
	firebaseApp = initializeApp(config);
} else {
	firebaseApp = getApps()[0];
}

const firestore = getFirestore(firebaseApp);

export { firebaseApp, firestore };
