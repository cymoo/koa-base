module.exports = {
  env: {
    commonjs: true,
    es2020: true,
  },
  extends: ['standard', 'prettier'],
  plugins: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'prettier/prettier': 'error',
  },
}
