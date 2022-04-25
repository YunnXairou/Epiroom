<script lang="ts">
	import { DateTime } from 'luxon';
	import GridFilling from './GridFilling.svelte';

	export let start: DateTime;

	export let steps: 1 | 2 | 4;
	export let classMatrix: string[];

	export let cls: string;
	export let events: any[] = [];
	export let area: {
		start: number;
		end: number;
		offset: string;
	} = { start: 0, end: 0, offset: '0/0/span 0/auto' };

	$: rows = area.end - area.start;
	$: colsMatrix = Array.from({ length: rows }, () => []);
	$: areas = Array.from({ length: events.length }, (_, idx) => {
		const ev = events[idx];
		const _start = DateTime.fromFormat(ev.start, 'yyyy-L-d h:m:s');
		const _end = DateTime.fromFormat(ev.end, 'yyyy-L-d h:m:s');

		const ds = Math.floor(_start.diff(start, 'minutes').minutes / (60 / steps));
		const de = Math.ceil(_end.diff(start, 'minutes').minutes / (60 / steps));

		let col = 0;

		for (let i = ds; i < de; i++) {
			colsMatrix[i].push(1);
			col = Math.max(col, colsMatrix[i].length);
		}

		return `${ds + 1}/${col}/${de + 1}/auto`;
	});
	$: cols = Math.max(...colsMatrix.map((_) => _.length));

	function getCls(ev) {
		const _start = DateTime.fromFormat(ev.start, 'yyyy-L-d h:m:s');
		const ds = Math.floor(_start.diff(start, 'minutes').minutes / (60 / steps));

		return classMatrix[ds % steps];
	}
</script>

<div
	class="{cls} bg-red-400 grid gap-x-px"
	style="grid-area: {area.offset};
    grid-template-columns: repeat({cols}, 1fr); 
    grid-template-rows: repeat({rows}, {(20 * 4) / steps}px);"
>
	{#each events as e, i}
		<div class="{getCls(e)} bg-blue-200" style="grid-area: {areas[i]}" />
	{/each}

	<GridFilling {rows} {cols} {classMatrix} skipArea={areas} />
</div>
