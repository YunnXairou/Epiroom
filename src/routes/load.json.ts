import { DateTime } from 'luxon';
import { groupBy } from 'lodash-es';

export async function get() {
	const campus = 'FR/TLS';
	const date = DateTime.now().toFormat('yyyy-LL-dd');

	const res = await fetch(
		`https://intra.epitech.eu/${process.env['EPITECH_API_KEY']}planning/load?format=json&start=${date}&end=${date}&location=${campus}`
	)
		.then((res) => res.json())
		.then((res) =>
			(Array.isArray(res) ? res : []).filter(({ semester, room }) => semester < 7 && room?.code)
		);

	console.log(
		groupBy(
			res
				.sort((a, b) => a.start.localeCompare(b.start))
				.filter(({ room: { code } }) => !['Visio', undefined].includes(code)),
			'room.code'
		)
	);

	return {
		body: {
			...Object.fromEntries(
				Object.entries(
					groupBy(
						res
							.sort((a, b) => a.start.localeCompare(b.start))
							.filter(({ room: { code } }) => !['Visio', undefined].includes(code)),
						'room.code'
					)
				).sort(([a], [b]) => a.localeCompare(b))
			)
		}
	};
}
