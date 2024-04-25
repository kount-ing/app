import { getFirebaseAdmin } from '$lib/firebase/firebase.admin';

console.log(getFirebaseAdmin().firestore().databaseId);
