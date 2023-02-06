import db from '$lib/seed.json';

// console.log('🚀 ~ file: layout.server.ts:3 ~ db', db);

export const load = async () => {
	const { products } = db;
	return { products };
};
