const redis = require('redis');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

module.exports = {
  client: () => {
    return redis.createClient(config.redis);
  }
}
