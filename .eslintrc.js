module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jest', 'prettier'],
  rules: {
    // Don't need these rules since we don't use prop types
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['node_modules', 'src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
