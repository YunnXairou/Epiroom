import { getDaySchedule, getLocations } from '$lib/api';
import { DateTime } from 'luxon';

export async function get({ url: { searchParams } }) {
	const campus = searchParams.get('location');
	let start = searchParams.get('start');

	start = start ? DateTime.fromFormat(start, 'yyyy-L-d') : DateTime.now();

	const locations = await getLocations();
	const schedule = await getDaySchedule(campus, start);

	for (const event of schedule) {
		if (event?.room?.code)
			event.room = Object.assign(event.room, locations[event.room.code]);
	}

	return {
		body: schedule
	};
}
