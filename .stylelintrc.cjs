module.exports = {
	extends: 'stylelint-config-recommended',
	rules: {
		'color-named': 'never',
		'font-family-name-quotes': 'always-where-required',
		'font-weight-notation': 'named-where-possible',
		'function-url-no-scheme-relative': true,
		'function-url-quotes': 'always',
		'string-quotes': 'single',
		'value-keyword-case': 'lower',
		'unit-disallowed-list': [],
		'max-empty-lines': 2,
		'no-descending-specificity': true,
		'no-duplicate-selectors': true,
		'font-family-no-missing-generic-family-keyword': null,
		'property-no-unknown': [
			true,
			{
				ignoreProperties: ['/^lost-/']
			}
		],
		'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
		'function-no-unknown': [true, { ignoreFunctions: ['theme'] }],
		'at-rule-no-unknown': [
			true,
			{ ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'] }
		]
	},
	ignoreFiles: ['node_modules/*', 'build/**'],
	defaultSeverity: 'error',
	customSyntax: 'postcss-html'
};
