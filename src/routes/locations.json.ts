import { fetch } from '$lib/api';

export async function get() {
	const locations = await fetch(`location.js`)
		.then((res) => res.text())
		.then((raw) => JSON.parse(raw.replace(/^[^=]*=/, '').replace(/;/, '')));

	return {
		body: { locations },
		headers: {
			'Cache-Control': 'max-age=86400, immutable'
		}
	};
}
