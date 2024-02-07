module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-console': ['warn'],
    'no-empty': ['error'],
    'no-empty-function': ['error'],
    'eqeqeq': ['error'],
    'array-bracket-spacing': ['error', 'never'],
    'camelcase': ['error'],
    'jsx-quotes': ['error', 'prefer-single'],
    'semi': ['error', 'never'],
    'indent': ['error', 2],
    'quotes': ['error', 'single']
  },
}
