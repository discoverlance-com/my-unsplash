import { getXataClient } from '$lib/server/xata';
import { fail } from '@sveltejs/kit';
import { isValidUrl } from '$lib/utils';
import type { PageServerLoad, Actions } from './$types';
import { getUser } from '$lib/server/users';

export const load = (async ({ url, locals }) => {
	const name = url.searchParams.get('name') || '';

	const userId = locals.user.userId;

	const client = getXataClient();
	const photos = await client.db.photos
		.filter({
			'user.identifier': { $is: userId }
		})
		.sort('created_at', 'asc')
		.getMany({
			pagination: { size: 100 },
			filter: { label: { $contains: name } }
		});

	return {
		photos
	};
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ locals, request }) => {
		const data = await request.formData();
		const url = data.get('url');
		const label = data.get('label');

		if (!url || !label) {
			return fail(422, { incorrect: true, url, label });
		}

		if (typeof url !== 'string' || typeof label !== 'string' || !isValidUrl(url)) {
			return fail(422, { incorrect: true, url, label });
		}

		try {
			const client = getXataClient();
			const user = await getUser(locals.user.userId);

			if (!user) {
				return fail(401, { error: true, label, url });
			}
			const photo = await client.db.photos.create({
				created_at: new Date(),
				label,
				url,
				user: user
			});
			return { success: true, photo };
		} catch (error) {
			console.error(error);
			return fail(403, { error: true, url, label });
		}
	},
	delete: async ({ request }) => {
		// TODO delete the photo
		const data = await request.formData();
		const id = data.get('id');

		if (!id) {
			return fail(400, { error: true, id });
		}

		if (typeof id !== 'string') {
			return fail(400, { error: true, id });
		}

		try {
			const client = getXataClient();
			await client.db.photos.deleteOrThrow({ id: id });
		} catch (error) {
			return fail(400, { error: true, id });
		}
	}
} satisfies Actions;
