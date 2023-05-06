import { getXataClient } from '$lib/server/xata';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const client = getXataClient();
	const photos = await client.db.photos.getMany({ sort: 'label', pagination: { size: 100 } });

	return {
		photos
	};
}) satisfies PageServerLoad;
