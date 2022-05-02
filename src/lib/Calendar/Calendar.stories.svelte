<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';

	import Calendar from './Calendar.svelte';
	import calendarData from './fixtures.json';
</script>

<Meta
	title="Calendar"
	parameters={{
		fixtures: { calendarData },
		paddings: { disable: true }
	}}
	argTypes={{
		steps: {
			options: [1, 2, 4],
			control: { type: 'inline-radio' }
		},
		from: {
			control: { type: 'range', min: 1, max: 23, step: 1, default: 8 }
		},
		to: {
			control: { type: 'range', min: 1, max: 23, step: 1 }
		}
	}}
/>

<Template let:args let:context>
	<Calendar {...args} events={context.fixture}>
		<span class="w-full h-full block bg-slate-400" />
	</Calendar>
</Template>

<Story
	name="Callendar"
	args={{
		steps: 4,
		from: 9,
		to: 19
	}}
/>
