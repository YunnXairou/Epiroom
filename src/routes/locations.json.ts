export async function get() {
	const { locations } = await fetch(
		`https://intra.epitech.eu/${process.env['EPITECH_API_KEY']}location.js`
	)
		.then((res) => res.text())
		.then((res) => {
			const window = { locations: {} };
			eval(res);
			return window;
		});

	return {
		body: { locations },
		headers: {
			'Cache-Control': 'max-age=86400, immutable'
		}
	};
}
