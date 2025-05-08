module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import'],
  rules: {
    'react/react-in-jsx-scope': 'off', // Next.js and Vite don't need React in scope
    'object-curly-newline': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/__tests__/**',
          '**/*.test.{js,ts,tsx}',
          '**/setup.{js,ts}',
        ],
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
