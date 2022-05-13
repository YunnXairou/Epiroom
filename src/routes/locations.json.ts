import { getLocations } from '$lib/api';

export const get = async () => ({
	body: {
		locations: await getLocations(([, v]) => !v.disabled).then((json) =>
			Object.fromEntries(
				Object.entries(json).filter(
					([k], _, arr) =>
						k.split('/').length > 2 ||
						arr.filter(([_k]) => _k.startsWith(k) && _k.split('/').length > 2).length > 1
				)
			)
		)
	},
	headers: {
		'Cache-Control': 'max-age=86400, immutable'
	}
});
