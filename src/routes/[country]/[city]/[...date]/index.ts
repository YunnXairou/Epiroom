import { DateTime } from 'luxon';
import { groupBy } from 'lodash-es';

export async function get({ params: { country, city, date } }) {
	let start: DateTime = DateTime.fromFormat(date, 'yyyy-L-d');
	if (!start.isValid) start = DateTime.fromFormat(date, 'L-d');
	if (!start.isValid) start = DateTime.fromFormat(date, 'd');
	if (!start.isValid) start = DateTime.now();

	date = start.toFormat('yyyy-LL-dd');
	const campus = country.toUpperCase() + '/' + city.toUpperCase();

	const res = await fetch(
		`https://intra.epitech.eu/${process.env['EPITECH_API_KEY']}planning/load?format=json&start=${date}&end=${date}&location=${campus}`
	)
		.then((res) => res.json())
		.then((res) =>
			(Array.isArray(res) ? res : []).filter(({ semester, room }) => semester < 7 && room?.code)
		);

	return {
		status: 200,
		body: {
			data: Object.entries(
					groupBy(
						res
							.sort((a, b) => a.start.localeCompare(b.start))
							.filter(({ room: { code } }) => !['Visio', undefined].includes(code)),
						'room.code'
					)
				).sort(([a], [b]) => a.localeCompare(b))
		}
	};
}
