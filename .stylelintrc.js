module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
    'stylelint-config-standard-scss',
  ],
  overrides: [
    {
      files: ['src/**/*.{jsx,tsx}'],
      customSyntax: '@stylelint/postcss-css-in-js',
      rules: {
        'function-no-unknown': null,
        'no-empty-first-line': null,
        'string-quotes': 'single',
        'scss/operator-no-unspaced': null,
      },
    },
  ],
};
