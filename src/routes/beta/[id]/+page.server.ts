import { getFirebaseAdmin } from '$lib/firebase/firebase.admin';
import admin from 'firebase-admin';

export async function load({ params }) {
	let test = await getFirebaseAdmin()
		.firestore()
		.collection('kounts')
		.where(admin.firestore.FieldPath.documentId(), '==', 'TFgrxrBj57Y5x02ElGI0')
		.get();

	let data = {};

	test.forEach((res) => {
		data = { ...res.data(), id: res.id };
	});

	return {
		...data
	};
}
