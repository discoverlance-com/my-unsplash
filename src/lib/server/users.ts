import { getXataClient } from '$lib/server/xata';
import crypto from 'crypto';

export const createUser = async () => {
	const client = getXataClient();
	const userId = crypto.randomUUID();
	const user = await client.db.users.create({ identifier: userId });
	return { user, userId };
};

export const getUser = async (userId: string) => {
	const client = getXataClient();
	return await client.db.users.getFirst({
		filter: { identifier: { $is: userId } }
	});
};
