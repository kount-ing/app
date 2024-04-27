import { fail } from '@sveltejs/kit';
import { getFirebaseAdmin } from '$lib/firebase/firebase.admin';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import schema from './schema.js';

export const load = async () => {
	const form = await superValidate(zod(schema));
	// Always return { form } in load functions

	return {
		form
	};
};

export const actions = {
	default: async ({ request }) => {
		let formData = await request.formData();
		const form = await superValidate(formData, zod(schema));

		console.log(form.data, form.errors);

		if (!form.valid) {
			return fail(400, form);
		}

		await getFirebaseAdmin()
			.firestore()
			.collection('kounts')
			.doc(form.data.link)
			.set({ ...form.data, count: 0 });

		redirect(302, '/beta/' + form.data.link);

		return { form };
	}
};
