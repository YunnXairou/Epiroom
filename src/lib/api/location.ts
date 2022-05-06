import { isObject, isArray } from 'lodash-es';
import fetch from './fetch';

export type Locations = { [key: string]: LocationMeta };
declare type LocationMeta = {
	title: string;
	floor?: number;
	disabled?: boolean;
	types?: {
		seats: number;
		type: string;
		title: string;
	}[];
};

declare type LocationsTree = { [key: string]: LocationTreeMeta };
declare type LocationTreeMeta = LocationMeta & { [key: string]: LocationTreeMeta };

const locationJsonToTree = (json: Locations): LocationsTree =>
	Object.entries(json).reduce((prev, [k, v]) => {
		let iterator = prev;

		for (const step of k.split('/')) {
			if (!Object.keys(iterator).includes(step)) {
				const obj = {};
				obj[step] = {};
				Object.assign(iterator, obj);
			}

			iterator = iterator[step];
		}

		Object.assign(iterator, v);
		return prev;
	}, {});

const locationTreeToJson = (
	tree: LocationsTree,
	fn: ([key, value]: [string, LocationMeta]) => boolean
): Locations => {
	const json = {};

	function propagate(tree: LocationTreeMeta, path: string): void {
		json[path] = {};

		for (const key of Object.keys(tree)) {
			if (!isObject(tree[key]) || isArray(tree[key])) json[path][key] = tree[key];
			else if (fn([`${path}/${key}`, tree[key]])) propagate(tree[key], `${path}/${key}`);
		}

		console.log(path, json[path]);
	}

	for (const [k, v] of Object.entries(tree)) propagate(v, k);
	return json;
};

/** @param fn filter function */
export async function getLocations(
	fn: ([key, value]: [string, LocationMeta]) => boolean = () => true
) {
	const json: Locations = await fetch('location.js')
		.then((res) => res.text())
		.then((raw) => JSON.parse(raw.replace(/^[^=]*=/, '').replace(/;/, '')));

	return locationTreeToJson(locationJsonToTree(json), fn);
}
