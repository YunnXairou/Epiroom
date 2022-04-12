<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import GridFilling from './GridFilling.svelte';
</script>

<Meta
	title="Calendar/GridFilling"
	component={GridFilling}
	args={{
		flowRow: true
	}}
	argTypes={{
		rows: { control: 'number' },
		cols: { control: 'number' },
		flowRow: {
			control: {
				type: 'boolean',
				labels: {
					true: 'On',
					false: 'Off'
				}
			}
		},
		classMatrix: { control: 'array' },
		skipArea: { control: 'array' }
	}}
/>

<Template let:args>
	<div
		class="grid gap-2"
		class:grid-flow-row={args.flowRow}
		class:grid-flow-col={!args.flowRow}
		style="grid-template-rows: repeat({args.rows}, 2rem); grid-template-columns: repeat({args.cols}, 1fr);"
	>
		<GridFilling {...args} />

		{#if args.skipArea}
			{#each args.skipArea as area}
				<div class="bg-slate-200" style="grid-area: {area};" />
			{/each}
		{/if}
	</div>
</Template>

<Story
	name="Basic Grid"
	args={{
		rows: 1,
		cols: 5,
		classMatrix: ['bg-slate-300']
	}}
/>

<Story
	name="Row Classes"
	args={{
		rows: 4,
		cols: 2,
		classMatrix: ['bg-slate-300', 'bg-slate-400']
	}}
/>

<Story
	name="Column Classes"
	args={{
		rows: 2,
		cols: 4,
		classMatrix: [['bg-slate-300', 'bg-slate-400']]
	}}
/>

<Story
	name="Skiping Area"
	args={{
		rows: 9,
		cols: 2,
		classMatrix: [
			'border border-slate-500 border-solid',
			'border border-slate-500 border-dashed',
			'border border-slate-500 border-dotted',
			'border border-slate-500 border-dashed'
		],
		skipArea: ['6/1/span 3/span 2', '2/1/5/auto']
	}}
/>
