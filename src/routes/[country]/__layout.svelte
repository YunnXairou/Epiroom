<script lang="ts" context="module">
	export async function load({ params: { country }, fetch }) {
		if (!country.match('[a-zA-Z]{2}'))
			return {
				status: 404,
				error: new Error(`The country code ${country} is not correctly formated`)
			};

		const response = await fetch('/locations.json');
		if (!response.ok) return { status: response.status };

		const { locations } = await response.json();
		if (!(`${country}` in locations))
			return {
				status: 404,
				error: new Error(`No school associated with the country code ${country}`)
			};

		return {
			status: response.status,
			stuff: { locations }
		};
	}
</script>

<slot />
