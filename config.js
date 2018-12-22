
const baseConfig = {
  SECRET_KEY: 'foo said i you do not know',
  HOST: '127.0.0.1',
  PORT: 7000
}

const devConfig = {
  ...baseConfig,
  debug: true
}

const prodConfig = {
  ...baseConfig,
  debug: false
}

const config = process.env.NODE_ENV === 'development' ? devConfig : prodConfig
module.exports = config

