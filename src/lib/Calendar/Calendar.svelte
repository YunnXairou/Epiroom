<script lang="ts">
	import { range, isEmpty } from 'lodash-es';
	import { DateTime } from 'luxon';
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
	const gridRow = (idx: number) => `${idx * steps + 2}/ ${steps} span`;

	$: sections = range(from, to);
	$: classMatrix =
		steps == 1 ? ['hour'] : steps == 2 ? ['hour', 'half'] : ['hour', 'quarter', 'half', 'quarter'];
	$: data = Object.entries(events).map(([k, v], idx) => [
		k,
		v
			.reduce(
				(prev, cur, idx) => {
					const node = {
						start: DateTime.fromFormat(cur.start, 'yyyy-L-d h:m:s'),
						end: DateTime.fromFormat(cur.end, 'yyyy-L-d h:m:s')
					};

					for (let jdx = 0; jdx < idx; jdx++) {
						if (
							(prev[jdx].start >= node.start && prev[jdx].end <= node.start) ||
							(prev[jdx].start < node.end && prev[jdx].end >= node.end)
						) {
							prev[jdx].events.push(cur);
							prev[jdx].end =
								prev[jdx].end.diff(node.end).milliseconds < 0 ? node.end : prev[jdx].end;
							return prev;
						}
					}

					return [...prev, { ...node, events: [cur] }];
				},
				[] as {
					start: DateTime;
					end: DateTime;
					events: any[];
				}[]
			)
			.map((g) => {
				const sdx = sections.indexOf(g.start.hour);
				const edx = sections.indexOf(g.end.hour);

				const smx = Math.floor(g.start.minute / (60 / steps));
				const rstart = sdx < 0 ? 0 : sdx * steps + smx;

				const emx = Math.floor(g.end.minute / (60 / steps));
				const rend = edx < 0 ? sections.length * steps : edx * steps + emx;

				return Object.assign(g, {
					area: {
						inset: `${rstart + 1}/${idx + 1}/span ${rend - rstart}/auto`,
						offset: `${rstart + 2}/${idx + 2}/span ${rend - rstart}/auto`
					}
				});
			})
	]);
	$: skipArea = Object.values(data.flatMap((_) => _[1]).map((_) => _.area.inset));
	$: console.log(skipArea);
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
		<span class="bg-zinc-200 text-center text-zinc-800 sticky top-0 snap-center">{k}</span>
		{#each v as g}
			<div style="grid-area: {g.area.offset}" />
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
