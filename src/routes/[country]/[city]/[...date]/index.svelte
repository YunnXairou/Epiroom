<script lang="ts">
	import { page } from '$app/stores';

	export let country, city, date;

	const { locations } = $page.stuff;
	$: console.log(locations);
</script>

{country}/{city}/{date}
