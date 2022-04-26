module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		nightwind: {
			typography: true
		}
	},
	plugins: [require('nightwind'), require('@tailwindcss/typography')]
};
