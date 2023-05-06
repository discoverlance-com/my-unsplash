import { createUser, getUser } from '$lib/server/users';
import type { Handle, RequestEvent } from '@sveltejs/kit';

async function setupNewUser(event: RequestEvent<Partial<Record<string, string>>, string | null>) {
	const response = await createUser();
	const user = response.user;
	if (!user.identifier) {
		throw new Error('Error Accessing User Data');
	}
	event.cookies.set('session', user.identifier, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		// only sent over HTTPS in production
		secure: process.env.NODE_ENV === 'production',
		// set cookie to expire after 6 months
		maxAge: 60 * 60 * 24 * 30 * 6
	});

	return user.identifier;
}

export const handle = (async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session');
	let userId = '';
	if (!session) {
		// create a new session for user
		userId = await setupNewUser(event);
	} else {
		const user = await getUser(event.cookies.get('session')!);

		if (!user) {
			userId = await setupNewUser(event);
		} else {
			userId = user.identifier!;
		}
	}

	event.locals.user = {
		userId: userId
	};

	// load page as normal
	return await resolve(event);
}) satisfies Handle;
