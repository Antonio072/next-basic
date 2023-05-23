module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:jsx-a11y/recommended', 'plugin:prettier/recommended', 'next', 'next/core-web-vitals'],
  rules: {
    semi: ['error', 'never'],
    'no-unused-vars': 0,
    'next/no-img-element': 0,
    'react-hooks/exhaustive-deps': 'off',
    '@next/next/no-html-link-for-pages': [2]
  },
};