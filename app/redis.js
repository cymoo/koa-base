const redis = require('redis')
const log = require('debug')('db')

const rd = {
  client: null,
  initRedis(...args) {
    const client = (this.client = redis.createClient(...args))
    client.on('error', (err) => {
      log(err)
    })
  },
  promisify(fn) {
    return (...args) => {
      return new Promise((resolve, reject) => {
        this.client[fn](...args, (err, reply) => {
          if (err) {
            reject(err)
            return
          }
          resolve(reply)
        })
      })
    }
  },
  get(...args) {
    return this.promisify('get')(...args)
  },
  set(...args) {
    return this.promisify('set')(...args)
  },
}

module.exports = rd
