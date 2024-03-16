module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      '@vue/typescript/recommended',
      '@vue/eslint-config-prettier',
      '@vue/eslint-config-typescript/recommended',
    ],
    plugins: ['prettier'],
    parserOptions: {
      ecmaVersion: 2020,
      parser: '@typescript-eslint/parser',
      warnOnUnsupportedTypeScriptVersion: false,
    },
    rules: {
    },
};
