<script lang="ts">
	import type { PlanningEvent } from '$lib/api';

	import { page } from '$app/stores';
	import Event from './_event.svelte';
	import Calendar from '$lib/Calendar/Calendar.svelte';
	import { DateTime } from 'luxon';

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
</script>

<div class="flex flex-col max-h-screen">
	<div class="flex text-zinc-700">
		<a
			class="cursor-pointer"
			href="/{params.campus}/{date.minus({ day: 1 }).toFormat('yyyy-LL-dd')}"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="100%"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg
			>
		</a>
		<div class="flex flex-1 flex-col">
			<h1 class="text-2xl text-bold pt-1 text-center text-zinc-800">
				{locations[params.campus].title}
			</h1>
			<div class="text-xl pb-2 text-center text-zinc-700">
				<label for="date">
					{date.toLocaleString(DateTime.DATE_HUGE)}
				</label>
				<input
					on:change={(e) => location.replace(`/${params.campus}/${e.target.value}`)}
					class="w-6"
					type="date"
					id="data"
				/>
			</div>
		</div>
		<a
			class="cursor-pointer"
			href="/{params.campus}/{date.plus({ day: 1 }).toFormat('yyyy-LL-dd')}"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="100%"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg
			>
		</a>
	</div>

	<hr />

	<Calendar {events} let:e>
		<Event {...e} />
	</Calendar>
</div>
