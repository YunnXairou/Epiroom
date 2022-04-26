import { DateTime } from "luxon";

export async function get({params: {country, city, date}}) {
	let start: DateTime = DateTime.fromFormat(date, 'yyyy-L-d');
	if (!start.isValid) start = DateTime.fromFormat(date, 'L-d');
	if (!start.isValid) start = DateTime.fromFormat(date, 'd');
	if (!start.isValid) start = DateTime.now();

	return {
		status: 200,
		body: {
			country: country.toUpperCase(),
			city: city.toUpperCase(),
			date: start.toFormat('yyyy-LL-dd')
		}
	};
}
