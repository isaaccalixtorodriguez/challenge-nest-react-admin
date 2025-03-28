module.exports = {
    extends: [
      'react-app',
      'react-app/jest',
      'plugin:prettier/recommended',
      'prettier'
    ],
    plugins: ['simple-import-sort'],
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    },
  };