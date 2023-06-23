/**
 * Babel Plugin Include ESLint config
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  globals: {
    include: 'readonly',
  },
};

module.exports = config;
