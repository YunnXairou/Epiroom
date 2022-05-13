import { DateTime } from 'luxon';

export default (input: RequestInfo) => {
	const url =
		(() => {
			let token = process.env['EPITECH_API_KEY'].replace(/\/$/, '');

			if (!token.startsWith('https://intra.epitech.eu/'))
				token = `https://intra.epitech.eu/` + token;

			return `${token}/`;
		})() + input;

	return fetch(url, {
		headers: {
			// cookie: `tz=${DateTime.local().zoneName}` //@todo: get timezone from client and not server
		}
	});
}
