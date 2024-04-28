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

	let data = {};

	test.forEach((res) => {
		data = { ...res.data(), id: res.id };
	});

	const fontFiles = await Promise.all([
		fetch(
			'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-Thin.woff2'
		),
		fetch(
			'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-ExtraLight.woff2'
		),
		fetch(
			'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-Light.woff2'
		),
		fetch(
			'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-Regular.woff2'
		),
		fetch(
			'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-Medium.woff2'
		),
		fetch(
			'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-SemiBold.woff2'
		),
		fetch(
			'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-Bold.woff2'
		),
		fetch(
			'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-ExtraBold.woff2'
		),
		fetch(
			'https://raw.githubusercontent.com/webfontworld/Poppins/da77eba89bedde2e01682c82bc8bb10658f311d2/Poppins-Black.woff2'
		)
	]);

	const fontData: ArrayBuffer[] = await Promise.all(
		fontFiles.map((fontFile) => fontFile.arrayBuffer())
	);

	console.log(fontData[7]);

	return new ImageResponse(
		OGImage as any,
		{
			height: 600,
			width: 800,
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
