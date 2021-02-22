module.exports = {
  extends: 'sweet',
  overrides: [{
    files: 'stylelint.config.js',
    rules: {
      'unicorn/no-null': 'off'
    }
  }]
};
