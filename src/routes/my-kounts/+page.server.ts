import { getFirebaseAdmin, getFirebaseAdminAuth } from '$lib/firebase/firebase.admin';

export const load = async ({ request }) => {
	const auth = getFirebaseAdminAuth();
	const test = 'nigga';

	const cookies = request.headers.get('cookie');

	function parseCookies(cookieString) {
		return cookieString
			?.split(';')
			.map((cookie) => cookie.split('='))
			.reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: decodeURIComponent(value) }), {});
	}

	const parsedCookies = parseCookies(cookies);
	const sessionCookie = parsedCookies.session;
	const decodedClaims = await auth.verifySessionCookie(sessionCookie);
	const uid = decodedClaims.uid;
	const initialDocuments = await getFirebaseAdmin()
		.firestore()
		.collection('kounts')
		.where('uid', '==', uid)
		.get();

	const kounts = initialDocuments.docs.map((doc) => ({
		id: doc.id,
		...doc.data()
	}));

	return { kounts: kounts };
};
