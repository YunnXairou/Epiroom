<script lang="ts" context="module">
	export async function load({ params: { country, city }, fetch }) {
		if (!country.match('[a-zA-Z]{2}')) return { status: 404 };
		if (!city.match('[a-zA-Z]{3}')) return { status: 404 };

		const response = await fetch('/locations.json');
		if (!response.ok) return { status: response.status };

		const { locations } = await response.json();
		if (!(`${country}/${city}` in locations)) return { status: 404 };

		return {
			status: response.status,
			stuff: {
				locations: locations
			}
		};
	}
</script>

<slot />
