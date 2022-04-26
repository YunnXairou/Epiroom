<script lang="ts">
	import { page } from '$app/stores';

	const { locations } = $page.stuff;
	const { country } = $page?.params || { country: null };

	$: countries = Object.entries(locations).filter(([k, _]) => !k.includes('/'));

	const cities = (c) =>
		Object.entries(locations).filter(
			([k, _]) => k.startsWith(c + '/') && k.split('/').length === 2
		);
</script>

<div class="mx-auto prose">
	{#each countries as [k, { title }]}
		<details open={country === k}>
			<summary>{title}</summary>
			<ul>
				{#each cities(k) as [href, { title }]}
					<li><a {href}>{title}</a></li>
				{/each}
			</ul>
		</details>
	{/each}
</div>
