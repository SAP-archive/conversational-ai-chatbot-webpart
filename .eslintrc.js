module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  settings: {
    "react": {
      "createClass": "createReactClass",
      "pragma": "React",
      "fragment": "Fragment",
      "version": "16.9.0",
    },
  },
  env: {
    "amd": true,
    "es6": true,
    "browser": true,
    "node": true,
    "jasmine": true
  },
};
