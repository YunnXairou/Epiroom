<script lang="ts" context="module">
	export async function load({ params: { country, city }, stuff: { locations } }) {
		if (!city.match('[a-zA-Z]{3}'))
			return {
				status: 404,
				error: new Error(`The city code ${city} is not correctly formated`)
			};

		if (!(`${country}/${city}` in locations))
			return {
				status: 404,
				error: new Error(`No school associated with the city code ${city}`)
			};

		return { status: 200 };
	}
</script>

<slot />
