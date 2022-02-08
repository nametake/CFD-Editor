module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
    'stylelint-config-styled-components',
  ],
  customSyntax: 'postcss-scss',
  overrides: [
    {
      files: ['**/*.{jsx,tsx}'],
      processors: ['stylelint-processor-styled-components'],
    },
  ],
};
