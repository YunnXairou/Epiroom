<script lang="ts">
	import { range, isEmpty } from 'lodash-es';
	import { DateTime } from 'luxon';
	import GridFilling from './GridFilling.svelte';
	import SubGrid from './SubGrid.svelte';

	export let steps: 1 | 2 | 4 = 4;
	export let from = 8;
	export let to = 20;
	export let events: {
		[k: string]: {
			start: string;
			end: string;
		}[];
	};

	let sections: number[];
	let classMatrix: string[];
	let data: any[][];

	$: if (isEmpty(events)) events = { '': [] };
	const gridRow = (idx: number) => `${idx * steps + 2}/ ${steps} span`;

	$: sections = range(Math.min(from, to), Math.max(from, to));
	$: classMatrix =
		steps == 1 ? ['hour'] : steps == 2 ? ['hour', 'half'] : ['hour', 'quarter', 'half', 'quarter'];
	$: data = Object.entries(events).map(([k, v], cdx) => [
		k,
		v.reduce((prev, cur) => {
			const start = DateTime.fromFormat(cur.start, 'yyyy-L-d h:m:s');
			const end = DateTime.fromFormat(cur.end, 'yyyy-L-d h:m:s');

			const sdx = sections.indexOf(start.hour);
			const edx = sections.indexOf(end.hour);

			let rstart = sdx * steps + Math.floor(start.minute / (60 / steps));
			let rend = edx * steps + Math.ceil(end.minute / (60 / steps));

			if (sdx < 0)
				rstart = Math.max(
					0,
					(sections[0] > start.hour ? rend : sections.length * steps) -
						Math.ceil(end.diff(start, 'minutes').minutes / (60 / steps))
				);

			if (edx < 0 || rstart == rend)
				rend = Math.min(
					sections.length * steps,
					rstart +
						(sections[0] >= end.hour
							? Math.min(steps, Math.ceil(end.diff(start, 'minutes').minutes / (60 / steps)))
							: Math.ceil(end.diff(start, 'minutes').minutes / (60 / steps)))
				);

			if (sections[0] <= start.hour && sdx < 0)
				rstart =
					rend - Math.ceil(steps - ((end.diff(start, 'minutes').minutes / (60 / steps)) % steps));

			for (let jdx = 0; jdx < prev.length; jdx++)
				if (
					(prev[jdx].area.start >= rstart && prev[jdx].area.end >= rstart) ||
					(prev[jdx].area.start < rend && prev[jdx].area.end >= rend)
				) {
					prev[jdx].events.push(cur);
					if (prev[jdx].end.diff(end).milliseconds < 0) {
						prev[jdx].end = end;
						prev[jdx].area.end = rend;
					}
					return prev;
				}

			return [
				...prev,
				{
					events: [cur],
					start,
					end,
					cls: classMatrix[rstart % steps],
					area: {
						start: rstart,
						end: rend,
						get inset() {
							return `${this.start + 1}/${cdx + 1}/span ${this.end - this.start}/auto`;
						},
						get offset() {
							return `${this.start + 2}/${cdx + 2}/span ${this.end - this.start}/auto`;
						}
					}
				}
			];
		}, [])
	]);
	$: skipArea = Object.values(data.flatMap((_) => _[1]).map((_) => _.area.inset));

	function offsetMatrix(start) {
		let offset = Array.from(classMatrix);

		for (let i = 0; i < start % steps; i++) offset.push(offset.shift());

		return offset;
	}
</script>

<div
	class="grid gap-x-px relative snap snap-mandatory snap-x scroll-pl-[5ch] overflow-x-auto h-screen"
	style="
		--cols: {data.length};
		grid-template-rows: 5ch repeat({sections.length * steps}, {(20 * 4) / steps}px);
	"
>
	<span class="bg-zinc-200 sticky top-0 left-0" />

	{#each data as [k, v]}
		<span
			class="bg-zinc-200 text-center text-zinc-800 sticky top-0 snap-center truncate p-2"
			dir="rtl"
			id={k}>{k}</span
		>

		{#each v as g}
			{#if g.events.length > 1}
				<SubGrid classMatrix={offsetMatrix(g.area.start)} {steps} {...g} />
			{:else}
				<div class="{g.cls} bg-slate-400" style="grid-area: {g.area.offset}" />
			{/if}
		{/each}
	{/each}

	{#each sections as h, i}
		<span
			class="bg-zinc-200 text-zinc-800 text-center sticky top-[5ch] left-0"
			style="grid-row: {gridRow(i)}"
		>
			{h}:00
		</span>
	{/each}

	<GridFilling rows={sections.length * steps} cols={data.length} {classMatrix} {skipArea} />
</div>

<style lang="postcss" global>
	:local(.grid) {
		grid-template-columns: 5ch repeat(var(--cols), minmax(calc(90% - 5ch), 1fr));

		@screen md {
			grid-template-columns: 5ch repeat(var(--cols), minmax(calc((90% - 5ch) / 3), 1fr));
		}

		@screen lg {
			grid-template-columns: 5ch repeat(var(--cols), minmax(calc((90% - 5ch) / 4), 1fr));
		}

		@screen xl {
			grid-template-columns: 5ch repeat(var(--cols), minmax(calc((90% - 5ch) / 7), 1fr));
		}

		.hour,
		.half,
		.quarter {
			@apply border-zinc-200 snap-center border-x border-t border-solid;

			&.grid {
				@apply border-none;
			}
		}

		.half {
			border-top-style: dotted;
		}
		.quarter {
			border-top-style: dashed;
		}
	}
</style>
