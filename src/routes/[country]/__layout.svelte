<script lang="ts" context="module">
	export async function load({ params: { country }, stuff: { locations } }) {
		if (!country.match('[a-zA-Z]{2}'))
			return {
				status: 404,
				error: new Error(`The country code ${country} is not correctly formated`)
			};

		if (!(`${country}` in locations))
			return {
				status: 404,
				error: new Error(`No school associated with the country code ${country}`)
			};

		return { status: 200 };
	}
</script>

<slot />
