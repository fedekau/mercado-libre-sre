const MetricsSubscriber = require('./metrics-subscriber');
const MetricNames = require('../../lib/metrics/metric-names');

class Metrics {
  static initialize() {
    Object.keys(MetricNames).forEach((name) => {
      MetricsSubscriber.subscribe(MetricNames[name].channel_name);
    })
  }
}

module.exports = Metrics;
