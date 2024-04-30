import { getFirebaseAdmin } from '$lib/firebase/firebase.admin';
import admin from 'firebase-admin';

export async function load({ params }) {
	let test = await getFirebaseAdmin()
		.firestore()
		.collection('kounts')
		.where(admin.firestore.FieldPath.documentId(), '==', params.id)
		.get();

	let data: any = {};

	test.forEach((res) => {
		data = { ...res.data(), id: res.id };
	});

	if (data.uid) {
		let user = await getFirebaseAdmin()
			.firestore()
			.collection('kounters')
			.where(admin.firestore.FieldPath.documentId(), '==', data?.uid)
			.get();

		user.forEach((res) => {
			data = { ...data, username: res.data()?.username };
		});
		delete data['uid'];
	}

	return {
		...data
	};
}
