module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  extends: ["airbnb-base", "prettier", "plugin:chai-friendly/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["prettier", "chai-friendly"],
  rules: {
    "import/named": 0,
    "prettier/prettier": "error",
    "no-unused-expressions": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
    "no-restricted-syntax": 0,
    "no-shadow": 0,
    "consistent-return": 0,
    "import/no-dynamic-require": 0,
    "global-require": 0,
    "valid-typeof": 0,
    "no-await-in-loop": 0,
    "func-names": 0,
    "no-prototype-builtins": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "chai-friendly/no-unused-expressions": 2
  }
};
