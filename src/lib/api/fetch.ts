export default (input: RequestInfo, init?: RequestInit) => {
	const baseUrl = (() => {
		let token = process.env['EPITECH_API_KEY'].replace(/\/$/, '');

		if (!token.startsWith('https://intra.epitech.eu/')) token = `https://intra.epitech.eu/` + token;

		return `${token}/`;
	})();

	const url = baseUrl + input;
	return fetch(url, init);
};
