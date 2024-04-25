import admin from 'firebase-admin';
import { FIREBASE_ADMIN_KEY } from '$env/static/private';
/**
 * @type {admin.app.App}
 */
var firebaseAdmin;

/**
 * @type {admin.auth.Auth}
 */
var firebaseAdminAuth;

function getFirebaseAdmin() {
	if (!firebaseAdmin) {
		if (admin.apps.length === 0) {
			firebaseAdmin = admin.initializeApp({
				credential: admin.credential.cert(JSON.parse(FIREBASE_ADMIN_KEY))
			});
		} else {
			if (admin.apps[0]) firebaseAdmin = admin.apps[0];
		}
	}

	return firebaseAdmin;
}

function getFirebaseAdminAuth() {
	const currentAdmin = getFirebaseAdmin();
	if (!firebaseAdminAuth) {
		firebaseAdminAuth = currentAdmin.auth();
	}
	return firebaseAdminAuth;
}

export { getFirebaseAdmin, getFirebaseAdminAuth };
