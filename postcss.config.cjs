module.exports = {
	plugins: {
		'postcss-import': {},
		'tailwindcss/nesting': {},
		tailwindcss: {},
		'postcss-hexrgba': {},
		'postcss-preset-env': {
			features: { 'nesting-rules': false }
		},
		...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
	}
};
