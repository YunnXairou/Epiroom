module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-svelte-csf',
		'storybook-addon-paddings',
		'storybook-fixtures',
		'storybook-dark-mode',
		{
			name: '@storybook/addon-postcss',
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss')
				}
			}
		}
	],
	framework: '@storybook/svelte',
	svelteOptions: {
		preprocess: require('svelte-preprocess')({
			typescript: true,
			postcss: true
		})
	}
};
