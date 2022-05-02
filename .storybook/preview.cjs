import { themes } from '@storybook/theming';
import '../src/app.css';

export const parameters = {
	theme: themes.dark,
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	},
	paddings: {
		values: [
			{ name: 'Small', value: '16px' },
			{ name: 'Medium', value: '32px' },
			{ name: 'Large', value: '64px' }
		],
		default: 'Medium'
	}
};

import darkMode from './darkMode.svelte';
import { addDecorator } from '@storybook/svelte';
addDecorator(() => darkMode);
