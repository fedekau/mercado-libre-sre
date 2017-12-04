const client = require('../../lib/redis').client();
const MetricsCruncher = require('../../lib/metrics/metrics-cruncher');
const MetricNames = require('../../lib/metrics/metric-names');

const MINUTE = 1000 * 60;

class HealthChecker {
  static status(amount_of_historic_data = 5) {
    const metric_names = Object.keys(MetricNames);
    const metric_times = this._metric_times(amount_of_historic_data);

    const status = Promise.all(metric_times.map((mt) => {
      const metric_values = this._metric_values(metric_names, mt);

      return this._build_status(metric_names, metric_values, mt);
    }));

    return status;
  }

  static _metric_values(metric_names, metric_time) {
    return Promise.all(metric_names.map((mn) => {
      return new Promise((resolve, reject) => {
        const timeframeId = MetricsCruncher.timeframeId(metric_time);
        const metricKey = MetricsCruncher.metricKey(mn, timeframeId);

        client.get(metricKey, (error, value) => {
          resolve(JSON.parse(value));
        })
      });
    }));
  }
  static _build_status(metric_names, metric_values, metric_time) {
    const date = new Date(metric_time);

    date.setSeconds(0);
    date.setMilliseconds(0);

    const status_on_minute = {
      date: date.toISOString()
    };

    return metric_values.then((mv) => {
      metric_names.forEach((metric_name, index) => {
        status_on_minute[metric_name] = mv[index];
      });

      return status_on_minute;
    });
  }

  static _metric_times(n) {
    const current_time = Date.now();

    return [...Array(n).keys()].map((m) => {
      return current_time - MINUTE * m;
    });
  }
}

module.exports = HealthChecker;
