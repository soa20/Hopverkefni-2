module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true
  },
  rules: {
    'no-console': ['error', {
      allow: ['info', 'warn', 'error']
    }],
    'class-methods-use-this': 0,
    'func-names': ["error", "never"],
    'no-console': "off",
    'comma-dangle': "off"
  },
  plugins: ['import'],
};
