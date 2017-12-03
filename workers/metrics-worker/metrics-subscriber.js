const redis = require('redis');
const sub = redis.createClient();
const MetricsCruncher = require('../../lib/metrics/metrics-cruncher');

sub.on("message", function (metricName, rawMessage) {
  const message = JSON.parse(rawMessage);

  MetricsCruncher.crunch(metricName, message);
});
class MetricsSubscriber {
  static subscribe(metricName) {
    sub.subscribe(metricName);
  }
}

module.exports = MetricsSubscriber;
