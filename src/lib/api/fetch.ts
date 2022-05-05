export default (input: RequestInfo, init?: RequestInit) => {
	const url = [`https://intra.epitech.eu/${process.env['EPITECH_API_KEY']}`, input].join('/');

	return fetch(url, init);
};
