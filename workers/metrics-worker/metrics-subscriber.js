const redis = require('redis');
const sub = redis.createClient();
const MetricsCruncher = require('./metrics-cruncher');

class MetricsSubscriber {
  static subscribe(metricName) {
    sub.on("message", function (metricName, rawMessage) {
      const message = JSON.parse(rawMessage);

      MetricsCruncher.crunch(metricName, message);
    });

    sub.subscribe(metricName);
  }
}

module.exports = MetricsSubscriber;
