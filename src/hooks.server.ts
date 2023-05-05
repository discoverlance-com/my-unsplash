import { getXataClient } from '$lib/server/xata';
import type { Handle } from '@sveltejs/kit';
import crypto from 'crypto';

export const handle = (async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session');

	let userId = '';
	const client = getXataClient();
	if (!session) {
		// create a new session for user
		userId = crypto.randomUUID();

		await client.db.users.create({ identifier: userId });
		event.cookies.set('session', userId, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			// only sent over HTTPS in production
			secure: process.env.NODE_ENV === 'production',
			// set cookie to expire after 6 months
			maxAge: 60 * 60 * 24 * 30 * 6
		});
	} else {
		const user = await client.db.users.getFirst({ filter: { identifier: { $is: userId } } });
		userId = user?.identifier!;
	}

	// if `user` exists set `events.local`
	event.locals.user = {
		userId: userId
	};

	// load page as normal
	return await resolve(event);
}) satisfies Handle;
