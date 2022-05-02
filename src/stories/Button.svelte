<script>
	import { createEventDispatcher } from 'svelte';
	/**
	 * Is this the principal call to action on the page?
	 */
	export let primary = false;

	/**
	 * What background color to use
	 */
	export let backgroundColor;
	/**
	 * How large should the button be?
	 */
	export let size = 'medium';
	/**
	 * Button contents
	 */
	export let label = '';

	let mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

	let style = backgroundColor ? `background-color: ${backgroundColor}` : '';

	const dispatch = createEventDispatcher();

	/**
	 * Optional click handler
	 */
	function onClick(event) {
		dispatch('click', event);
	}
</script>

<button
	type="button"
	class="storybook-button storybook-button--{size} {mode}"
	{style}
	on:click={onClick}
>
	{label}
</button>

<style global lang="postcss">
	:local(.storybook-button) {
		@apply cursor-pointer rounded-3xl border-0 font-bold;
		font-family: Nunito Sans, Helvetica Neue, Helvetica, Arial, sans-serif;

		&--primary {
			@apply text-white bg-blue-500;
		}

		&--secondary {
			@apply text-slate-900 bg-transparent;

			box-shadow: rgba(theme(colors.black), 0.15) 0px 0px 0px 1px inset;

			:global(.dark) & {
				box-shadow: rgba(theme(colors.white), 0.15) 0px 0px 0px 1px inset;
			}
			:global(.dark) &.nightwind-prevent {
				box-shadow: rgba(theme(colors.black), 0.15) 0px 0px 0px 1px inset;
			}
			:global(.dark .nightwind-prevent-block) & {
				box-shadow: rgba(theme(colors.black), 0.15) 0px 0px 0px 1px inset;
			}
		}

		&--small {
			@apply py-2 px-4 text-xs;
		}
		&--medium {
			@apply py-2 px-5 text-sm;
		}
		&--large {
			@apply py-2 px-6 text-base;
		}
	}
</style>
