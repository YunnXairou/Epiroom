<script lang="ts">
	import { page } from '$app/stores';
	import Event from './_event.svelte';
	import Calendar from '$lib/Calendar/Calendar.svelte';

	export let data;
	const { locations } = $page.stuff;

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

<Calendar {events} let:e>
	<Event {...e} />
</Calendar>