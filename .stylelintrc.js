module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
    'stylelint-config-styled-components',
  ],
  overrides: [
    {
      files: ['**/*.tsx'],
      processors: ['stylelint-processor-styled-components'],
      customSyntax: 'postcss-scss',
    },
  ],
};
