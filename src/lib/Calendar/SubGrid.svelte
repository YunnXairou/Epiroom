<script lang="ts">
	import { DateTime } from 'luxon';
	import GridFilling from './GridFilling.svelte';

	export let start: DateTime;

	export let steps: 1 | 2 | 4;
	export let classMatrix: string[];

	export let cls: string;
	export let events: {
		start: string;
		meta: {
			start: number;
			end: number;
		};
	}[] = [];
	export let area: {
		start: number;
		end: number;
		offset: string;
	} = { start: 0, end: 0, offset: '0/0/span 0/auto' };

	$: rows = area.end - area.start;
	$: colsMatrix = Array.from({ length: rows }, () => []);
	$: areas = Array.from({ length: events.length }, (_, idx) => {
		const meta = events[idx].meta;

		const ds = meta.start - area.start;
		const de = meta.end - area.start;

		let banned_col = [];
		for (let i = ds; i < de && i < rows; i++) {
			banned_col.push(...colsMatrix[i]);
			colsMatrix[i].push(idx);
		}

		let col = 0;
		banned_col = [...new Set(banned_col)].map((i) => events[i].meta['col']);
		for (let i = 1; i <= idx + 1 && !col; i++) if (!banned_col.includes(i)) col = i;

		events[idx].meta['col'] = col;
		return `${ds + 1}/${col}/${de + 1}/auto`;
	});
	$: cols = Math.max(...colsMatrix.map((_) => _.length));

	function getCls(ev: { start: string }) {
		const _start = DateTime.fromFormat(ev.start, 'yyyy-L-d h:m:s');
		const ds = Math.floor(_start.diff(start, 'minutes').minutes / (60 / steps));

		return classMatrix[ds % steps];
	}
</script>

<div
	class="{cls} grid gap-x-px"
	style="grid-area: {area.offset};
    grid-template-columns: repeat({cols}, calc(100% / {cols} - 0.5px)); 
    grid-template-rows: repeat({rows}, {(20 * 4) / steps}px);"
>
	{#each events as e, i}
		<div class="{getCls(e)} relative z-10" style="grid-area: {areas[i]}">
			<slot {e} />
		</div>
	{/each}

	<GridFilling {rows} {cols} {classMatrix} skipArea={areas} />
</div>
