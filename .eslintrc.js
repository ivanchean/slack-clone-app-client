module.exports = {
  extends: 'airbnb',
  plugins: [ 'react', 'jsx-a11y', 'import' ],
  rules: {
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'react/self-closing-comp': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-extra-boolean-cast': 0,
  },
  globals: {
    document: 1,
  },
  parser: "babel-eslint",
  env: {
    browser: 1,
  },
};