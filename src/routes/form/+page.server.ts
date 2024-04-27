import { getFirebaseAdmin } from '$lib/firebase/firebase.admin';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { message } from 'sveltekit-superforms';

import schema from './schema';

export const load = async () => {
	const form = await superValidate(zod(schema));

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		} else {
		}

		const formData = form.data;
		let finalDocument = {};

		for (let [key, value] of Object.entries(formData)) {
			if (!!formData[key]) {
				finalDocument[key] = value;
			}
		}

		await getFirebaseAdmin().firestore().collection('kounts').doc().set(finalDocument);

		return message(form, 'Form posted successfully!');
	}
};
