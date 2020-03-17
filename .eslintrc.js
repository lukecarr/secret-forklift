module.exports = {
  "extends": [
    "airbnb-base",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "import/extensions": "off",
    "arrow-body-style": "off"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [ ".ts", ".tsx" ],
        "paths": [ "src" ]
      }
    }
  }
};
