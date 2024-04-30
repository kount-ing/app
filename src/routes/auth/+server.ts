import { getFirebaseAdmin, getFirebaseAdminAuth } from '$lib/firebase/firebase.admin';
import { randomBytes } from 'crypto';
import admin from 'firebase-admin';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const auth = getFirebaseAdminAuth();
	const data = await request.json();
	const accessToken = data.stsTokenManager.accessToken.toString();
	const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

	const userDocument = {
		uid: data.uid,
		email: data.email,
		displayName: data.displayName,
		username: data.displayName.replace(/\s/g, '').toLowerCase()
	};

	// Create user document
	await getFirebaseAdmin().firestore().collection('kounters').doc(data.uid).set(userDocument);

	// Create cookie
	try {
		const sessionCookie = await auth.createSessionCookie(accessToken, { expiresIn });
		const csrfToken = randomBytes(64).toString('hex');

		cookies.set('session', sessionCookie, {
			maxAge: expiresIn,
			httpOnly: true,
			secure: true,
			path: '/'
		});

		cookies.set('csrf-token', csrfToken, {
			maxAge: expiresIn,
			secure: true,
			path: '/'
		});

		return new Response(JSON.stringify({ status: 'success', csrfToken }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error('Error creating session cookie:', error);
		return new Response(JSON.stringify({ status: 'error', message: 'Failed to create session' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};

export const GET: RequestHandler = async ({ cookies }) => {
	const auth = getFirebaseAdminAuth();
	const sessionCookie = cookies.get('session');

	if (!sessionCookie) {
		return new Response(JSON.stringify({ authenticated: false }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	try {
		const decodedClaims = await auth.verifySessionCookie(sessionCookie);
		const uid = decodedClaims.uid;

		let initialData = await getFirebaseAdmin()
			.firestore()
			.collection('kounters')
			.where(admin.firestore.FieldPath.documentId(), '==', uid)
			.get();

		let data = {};

		initialData.forEach((res) => {
			data = { ...res.data(), id: res.id };
		});

		return new Response(JSON.stringify({ authenticated: true, uid: uid, userData: data }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error('Session verification failed:', error);
		return new Response(JSON.stringify({ authenticated: false }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
