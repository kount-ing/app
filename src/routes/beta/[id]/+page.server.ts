import { getFirebaseAdmin } from '$lib/firebase/firebase.admin';
import admin from 'firebase-admin';

export async function load({ params }) {
	let test = await getFirebaseAdmin()
		.firestore()
		.collection('kounts')
		.where(admin.firestore.FieldPath.documentId(), '==', params.id)
		.get();

	let data = {};

	test.forEach((res) => {
		data = { ...res.data(), id: res.id };
	});

	return {
		...data
	};
}
