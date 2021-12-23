module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
    'stylelint-config-styled-components',
  ],
  customSyntax: '@stylelint/postcss-css-in-js',
};
