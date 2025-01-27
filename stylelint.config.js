const lowerCamelCaseRegex = /^[_-]{0,1}[a-z]+([A-Z]{1}[a-z0-9]+|\d+)*$/;

/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-css-modules",
    "stylelint-config-clean-order",
  ],
  rules: {
    "selector-class-pattern": [
      lowerCamelCaseRegex,
      {
        message: (className) =>
          `Expected class selector "${className}" to be lowerCamelCase`,
      },
    ],
  },
  overrides: [
    {
      files: ["*.css", "**/*.css"],
      rules: {
        "at-rule-disallowed-list": ["import"],
      },
    },
  ],
};
