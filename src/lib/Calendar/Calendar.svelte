<script lang="ts">
	import { range, isEmpty } from 'lodash-es';
	import GridFilling from './GridFilling.svelte';

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
	const gridRow = (idx: number) => `${idx * steps + 2}/${idx * steps + 2 + steps}`;

	$: sections = range(from, to);
	$: classMatrix =
		steps == 1 ? ['hour'] : steps == 2 ? ['hour', 'half'] : ['hour', 'quarter', 'half', 'quarter'];
	$: data = Object.entries(events);
</script>

<div
	class="grid gap-x-px relative snap snap-mandatory snap-x scroll-pl-[5ch] overflow-x-auto h-screen"
	style="
		--cols: {data.length};
		grid-template-rows: 5ch repeat({sections.length * steps}, {(20 * 4) / steps}px);
	"
>
	<span class="bg-zinc-200 sticky top-0" />

	{#each data as [k, v]}
		<span class="bg-zinc-200 text-center text-zinc-800 sticky top-0 snap-center">{k}</span>
	{/each}

	{#each sections as h, i}
		<span
			class="bg-zinc-200 text-zinc-800 text-center sticky top-[5ch] left-0"
			style="grid-row: {gridRow(i)}"
		>
			{h}:00
		</span>
	{/each}

	<GridFilling rows={sections.length * steps} cols={data.length} {classMatrix} />
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
			@apply border-zinc-200 border-t border-x border-solid snap-center;

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
