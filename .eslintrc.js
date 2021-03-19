module.exports = {
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  rules: {
    "prettier/prettier": "error"
  },
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true
  },
  parserOptions: {
    ecmaVersion: 12
  }
};
