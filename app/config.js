const baseConfig = {
  SECRET_KEY: 'foo said i you do not know',
  HOST: '127.0.0.1',
  PORT: 7000,
  BASE_DIR: __dirname,
}

const devConfig = {
  ...baseConfig,
  ENV: 'development',
  DEBUG: true,

  // CORS
  ACCESS_CONTROL_ALLOW_ORIGIN: '*',
  ACCESS_CONTROL_ALLOW_METHODS: '*',
  ACCESS_CONTROL_ALLOW_HEADERS: '*',
}

const prodConfig = {
  ...baseConfig,
  ENV: 'production',
  DEBUG: false,

  // CORS
  ACCESS_CONTROL_ALLOW_ORIGIN: '*',
  ACCESS_CONTROL_ALLOW_METHODS: '*',
  ACCESS_CONTROL_ALLOW_HEADERS: '*',
}

const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig
module.exports = config
