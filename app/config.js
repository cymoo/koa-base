
const baseConfig = {
  SECRET_KEY: 'take my hands that i might reach you',
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

