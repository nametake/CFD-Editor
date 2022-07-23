module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-idiomatic-order'],
  overrides: [
    {
      files: ['src/**/*.{jsx,tsx}'],
      customSyntax: '@stylelint/postcss-css-in-js',
      rules: {
        'function-no-unknown': null,
        'no-empty-first-line': null,
        'string-quotes': 'single',
      },
    },
  ],
};
