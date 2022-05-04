<script lang="ts">
	import { DateTime } from 'luxon';

	enum ActivityTypeCode {
		other = 'other',
		class = 'class',
		tp = 'tp',
		rdv = 'rdv',
		exam = 'exam',
		proj = 'proj'
	}
	type DatetimeLiteral = `${number}-${number}-${number} ${number}:${number}:${number}`;
	type ModulePrefix = 'B' | 'M' | 'C' | 'G' | 'W' | 'T';
	type ModuleCode = `${ModulePrefix}-${string}-${number}`;
	type InstanceCode = `${string}-${number}-${number}`;
	type ActivityCode = `acti-${number}`;

	interface RawRoom {
		code: `${string}/${string}/${string}` | null;
		type:
			| 'bureau'
			| 'exterieur'
			| 'salle-de-reunion'
			| 'salle_de_cours'
			| 'salle-de-cours-td'
			| 'hub';
		seats: number | null;
	}

	export let scolaryear: number;
	export let codemodule: ModuleCode;
	export let codeinstance: InstanceCode;
	export let codeacti: ActivityCode;
	export let titlemodule: string;
	export let acti_title: string;
	export let start: DatetimeLiteral;
	export let end: DatetimeLiteral;
	export let total_students_registered: number;
	export let type_code: ActivityTypeCode;
	export let room:
		| null
		| (RawRoom & {
				title: string;
		  });

	$: room = room || { code: null, type: null, seats: null, title: null };
	$: startHour = DateTime.fromFormat(start || '', 'yyyy-LL-dd TT').toFormat('HH:mm');
	$: endHour = DateTime.fromFormat(end || '', 'yyyy-LL-dd TT').toFormat('HH:mm');
	$: small =
		DateTime.fromFormat(end || '', 'yyyy-LL-dd TT').diff(
			DateTime.fromFormat(start || '', 'yyyy-LL-dd TT'),
			'hour'
		).hours < 1;
</script>

{#if type_code == ActivityTypeCode.exam}
	<span
		class="absolute -top-[40px] -left-px -right-px h-[40px] bg-gradient-to-t from-rose-500/70"
	/>
{/if}

<div
	title="{codemodule} » {acti_title} » {room.title}, from {startHour} to {endHour}"
	class="appoint {type_code} relative overflow-hidden cursor-pointer"
	class:small
	on:click={() =>
		window.open(
			`http://intra.epitech.eu/module/${scolaryear}/${codemodule}/${codeinstance}/${codeacti}/`,
			'_blank'
		)}
>
	<h4>
		{startHour} - {endHour}
	</h4>
	<div class="px-2 p-1 overflow-hidden">
		<a
			href="http://intra.epitech.eu/module/{scolaryear}/{codemodule}/{codeinstance}/{codeacti}/"
			target="_blank"
		>
			{titlemodule} » {acti_title}
		</a>
		<br />
		<span title={room.type}>
			<span>{room.title}</span>
			<span>
				{#if type_code == ActivityTypeCode.rdv}
					({room.seats})
				{:else}
					({total_students_registered}/{room.seats})
				{/if}
			</span>
		</span>
	</div>
</div>

<style lang="postcss" global>
	:local(.appoint) {
		@apply text-gray-600 -mx-px;
		@apply bg-blue-300/50;
		height: calc(100% + 1px);

		&.small {
			font-size: 75%;
		}

		h4 {
			@apply text-white block overflow-hidden whitespace-nowrap  px-2 font-semibold;
			@apply bg-blue-500/70;

			+ div {
				height: calc(100% - 1.5em);
			}
		}
		a {
			@apply no-underline text-current hover:underline;
		}
		&.tp {
			@apply bg-purple-300/50;
			h4 {
				@apply bg-purple-500/70;
			}
		}
		&.class {
			@apply bg-cyan-300/50;
			h4 {
				@apply bg-cyan-500/70;
			}
		}
		&.rdv {
			@apply bg-amber-300/50;
			h4 {
				@apply bg-amber-500/70;
			}
		}
		&.exam {
			@apply bg-rose-300/50;
			h4 {
				@apply bg-rose-500/70;
			}
		}
	}
</style>
