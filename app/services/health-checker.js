const redis = require('redis');
const client = redis.createClient();
const MetricsCruncher = require('../../lib/metrics/metrics-cruncher');
const MetricNames = require('../../lib/metrics/metric-names');

const MINUTE = 1000 * 60 * 60;

class HealthChecker {
  static async status(n = 5) {
    const current_time = Date.now();
    const metric_names = Object.keys(MetricNames);

    const metric_values = await Promise.all(metric_names.map((metric_name) => {
      return new Promise((resolve, reject) => {
        const timeframeId = MetricsCruncher.timeframeId(current_time);
        const metricKey = MetricsCruncher.metricKey(metric_name, timeframeId);

        client.get(metricKey, (error, value) => {
          resolve(value);
        })
      });
    }));

    const result = {};

    metric_names.forEach((metric_name, index) => {
      result[metric_name] = JSON.parse(metric_values[index]);
    });

    return result;
  }
}

module.exports = HealthChecker;
