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
	}
};

import darkMode from './darkMode.svelte';
import { addDecorator } from '@storybook/svelte';
addDecorator(() => darkMode);
