const redis = require('redis');
const pub = redis.createClient();

class MetricsPublisher {
  static publish({ channel_name }, value = null) {
    pub.publish(channel_name, JSON.stringify({ timestamp: Date.now(),  value }));
  }
}

module.exports = MetricsPublisher;
