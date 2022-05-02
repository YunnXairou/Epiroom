<script lang="ts">
	export let rows: number;
	export let cols: number;
	export let flowRow = true;
	export let classMatrix: string[] = [];
	export let skipArea: string[] = [];

	function computeSpan(idxText: string, spanText: string): [string, string] {
		const span = spanText.match(/\d+/);
		if (!span) return [idxText, spanText];

		const idx = Number(idxText);
		const sdx = Number(span[0]) - 1;

		return span[0] == span.input.trim()
			? [sdx > idx ? idxText.replace(/\d+/, `${idx + 1}`) : idxText, spanText]
			: sdx > 0
			? [idxText.replace(/\d+/, `${idx + 1}`), spanText.replace(/\d+/, `${sdx}`)]
			: [idxText, spanText];
	}

	$: skips = [...(Array.isArray(skipArea) ? skipArea : [])];
	$: matrix = Array.from({ length: flowRow ? rows : cols }, (_, r) =>
		Array.from({ length: flowRow ? cols : rows }, (_, c) =>
			classMatrix
				? Array.isArray(classMatrix[r % classMatrix.length])
					? classMatrix[r % classMatrix.length][c % classMatrix[r % classMatrix.length].length]
					: classMatrix[r % classMatrix.length]
				: undefined
		)
	)
		.map((rows, rdx) =>
			rows.filter((_, cdx) => {
				const reg = [
					`^([a-zA-Z\\s]*${(flowRow ? rdx : cdx) + 1}\\s*)`,
					`([a-zA-Z\\s]*${(flowRow ? cdx : rdx) + 1}\\s*)`,
					`([\\w\\s]+)`,
					`([\\w\\s]+)$`
				].join('\\/');

				const area = skips.find((a) => a.match(`^${reg}$`));
				if (!area) return true;

				const [r, c, rs, cs] = area.split('/');
				const [[nr, nrs], [nc, ncs]] = [computeSpan(r, rs), computeSpan(c, cs)];

				skips.push([nr, c, nrs, cs].join('/'));
				skips.push([r, nc, rs, ncs].join('/'));
				skips.push([nr, nc, nrs, ncs].join('/'));
			})
		)
		.flat();
</script>

{#each matrix as cls}
	<div class={cls} />
{/each}
