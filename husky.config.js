module.exports = {
  hooks: {
    'pre-commit': 'yarn lint-staged && yarn lint',
  },
};
