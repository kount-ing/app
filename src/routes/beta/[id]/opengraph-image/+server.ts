import admin from 'firebase-admin';
import { ImageResponse } from '@ethercorps/sveltekit-og';
import { RequestHandler } from '@sveltejs/kit';

import { getFirebaseAdmin } from '$lib/firebase/firebase.admin';

import OGImage from 'compounds/OGImage.svelte';

export const GET: RequestHandler = async (event) => {
	let test = await getFirebaseAdmin()
		.firestore()
		.collection('kounts')
		.where(admin.firestore.FieldPath.documentId(), '==', event.params.id)
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

	// const fontFiles = await Promise.all([
	// 	fetch(
	// 		'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-Thin.woff2'
	// 	),
	// 	fetch(
	// 		'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-ExtraLight.woff2'
	// 	),
	// 	fetch(
	// 		'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-Light.woff2'
	// 	),
	// 	fetch(
	// 		'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-Regular.woff2'
	// 	),
	// 	fetch(
	// 		'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-Medium.woff2'
	// 	),
	// 	fetch(
	// 		'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-SemiBold.woff2'
	// 	),
	// 	fetch(
	// 		'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-Bold.woff2'
	// 	),
	// 	fetch(
	// 		'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-ExtraBold.woff2'
	// 	),
	// 	fetch(
	// 		'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-Black.woff2'
	// 	)
	// ]);

	// const fontData: ArrayBuffer[] = await Promise.all(
	// 	fontFiles.map((fontFile) => fontFile.arrayBuffer())
	// );

	return new ImageResponse(
		OGImage as any,
		{
			height: 630,
			width: 1200,
			fonts: [
				// {
				// 	name: 'Poppins',
				// 	data: fontData[3],
				// 	weight: 400,
				// 	lang: 'en'
				// }
			]
		},
		{ ...data }
	);
};
