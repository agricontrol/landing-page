module.exports = {
  extends: 'sweet/web',
  overrides: [{
    files: 'stylelint.config.js',
    rules: {
      'unicorn/no-null': 'off'
    }
  }]
};
