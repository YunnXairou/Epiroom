<script lang="ts" context="module">
	export async function load({ fetch }) {
		const response = await fetch('/locations.json');
		return {
			status: response.status,
			stuff: {
				...(response.ok && (await response.json()))
			}
		};
	}
</script>

<script>
	import '../app.css';
</script>

<slot />
