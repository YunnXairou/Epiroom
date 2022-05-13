<script lang="ts">
	import type { PlanningEvent } from '$lib/api';

	import { page } from '$app/stores';
	import Event from './_event.svelte';
	import Calendar from '$lib/Calendar/Calendar.svelte';
	import { DateTime } from 'luxon';
	import { set_attributes } from 'svelte/internal';

	export let params;
	export let data: [string, PlanningEvent[]][];
	const { locations } = $page.stuff;

	$: date = DateTime.fromFormat(params.date, 'yyyy-L-d');

	$: events = Object.fromEntries(
		data.map(([k, v]) => [
			locations[k].title,
			v.map((_) => ({
				..._,
				room: {
					..._.room,
					...locations[_.room.code]
				}
			}))
		])
	);

	function change(event) {
		params.date = event.target.value;
		location.replace(`/${params.campus}/${event.target.value}`);
	}
</script>

<div class="flex flex-col max-h-screen">
	<div class="flex items-stretch text-zinc-700 h-20">
		<a href="/{params.campus}/{date.minus({ day: 1 }).toFormat('yyyy-LL-dd')}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<polyline points="15 18 9 12 15 6" />
			</svg>
		</a>
		<div class="flex flex-1 flex-col justify-center items-center">
			<h1 class="text-2xl text-bold text-center text-zinc-800">
				{locations[params.campus].title}
			</h1>
			<input
				class="text-xl text-center text-zinc-700"
				on:change={change}
				data-date={date.toLocaleString(DateTime.DATE_HUGE)}
				type="date"
				id="data"
			/>
		</div>
		<a href="/{params.campus}/{date.plus({ day: 1 }).toFormat('yyyy-LL-dd')}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<polyline points="9 18 15 12 9 6" />
			</svg>
		</a>
	</div>

	<hr />

	<Calendar {events} let:e>
		<Event {...e} />
	</Calendar>
</div>

<style lang="postcss">
	a {
		@apply cursor-pointer hover:bg-zinc-300 flex justify-center;

		/* aspect-ratio: 1; */
		height: 100%;
		width: 3em;

		svg {
			fill: none;

			padding: 10%;

			stroke: currentColor;
			stroke-width: 2;
			stroke-linecap: round;
			stroke-linejoin: round;
		}
	}

	input {
		@apply hover:ring-1 ring-zinc-500 rounded;

		font-size: 0;

		max-width: 90%;
		width: fit-content;

		&:before {
			font-size: initial;
			content: attr(data-date);
			padding: 0.25em 0.5em;
		}

		&::-webkit-calendar-picker-indicator {
			font-size: initial;
		}

		&::-webkit-datetime-edit,
		&::-webkit-inner-spin-button,
		&::-webkit-clear-button {
			display: none;
		}
	}
</style>
