import { DateTime } from 'luxon';
import fetch from './fetch';

export enum ActivityTypeCode {
	other = 'other',
	class = 'class',
	tp = 'tp',
	rdv = 'rdv',
	exam = 'exam',
	proj = 'proj'
}

export type PlanningEvent = {
	scolaryear: number;
	codemodule: string;
	codeinstance: string;
	codeacti: `acti-${number}`;
	codeevent: `event-${number}`;
	semester: number;
	instance_location: string;
	titlemodule: string;
	//prof_inst
	acti_title: string;
	num_event: number;
	start: `${number}-${number}-${number} ${number}:${number}`;
	end: `${number}-${number}-${number} ${number}:${number}`;
	total_students_registered: number;
	title: string;
	type_title: string;
	type_code: ActivityTypeCode;
	is_rdv: boolean;
	//...
	room: {
		code?: string;
		type: string | null;
		seats: number;
	};
	//...
	event_registered: boolean;
	module_registered: boolean;
};

function getPlanning(from: DateTime, to: DateTime, location: string): Promise<PlanningEvent[]> {
	const start = from.toFormat('yyyy-LL-dd');
	const end = to.toFormat('yyyy-LL-dd');

	return fetch(`planning/load?format=json&start=${start}&end=${end}&location=${location}`).then(
		(res) => res.json()
	);
}

export const getDaySchedule = (location: string, date: DateTime = DateTime.now()) =>
	getPlanning(date, date, location);
export const getWeekSchedule = (location: string, date: DateTime = DateTime.now()) =>
	getPlanning(date.startOf('week'), date.endOf('week'), location);
export const getMonthSchedule = (location: string, date: DateTime = DateTime.now()) =>
	getPlanning(date.startOf('month'), date.endOf('month'), location);
