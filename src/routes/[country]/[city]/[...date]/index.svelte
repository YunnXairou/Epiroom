<script lang="ts">
	import { page } from '$app/stores';

	export let country, city, date;

	const { locations } = $page.stuff;
</script>

{country}/{city}/{date}
