export default {
  development: {
    apiHost: 'localhost',
    apiPort: 8000,
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[__ENV__];
