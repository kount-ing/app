import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.set('session', '', {
		path: '/',
		httpOnly: true,
		secure: true,
		maxAge: 0
	});

	return new Response(JSON.stringify({ status: 'logged out' }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
