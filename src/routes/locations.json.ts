export async function get() {
	const  locations  = await fetch(
		`https://intra.epitech.eu/${process.env['EPITECH_API_KEY']}location.js`
	)
		.then((res) => res.text())
		.then((raw) => ( JSON.parse(raw.replace(/^[^=]*=/, '').replace(/;/, '')) ));

	return {
		body: { locations },
		headers: {
			'Cache-Control': 'max-age=86400, immutable'
		}
	};
}
