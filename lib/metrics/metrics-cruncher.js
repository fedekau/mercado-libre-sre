const client = require('../../lib/redis').client();
const dateFormat = require('dateformat');
const MetricNames = require('../../lib/metrics/metric-names');

class MetricsCruncher {
  static async crunch(metricName, { timestamp, value }) {
    const timeframeId = this.timeframeId(timestamp);
    const metricKey = this.metricKey(metricName, timeframeId);
    const newMetricValue = await this._calculateNewValue(metricName, timeframeId, value);

    this._updateMetric(metricName, metricKey, newMetricValue);
  }

  static metricKey(metricName, timeframeId) {
    const { processed_metric_name } = MetricNames[metricName];

    return `${processed_metric_name}+${timeframeId}`;
  }

  static timeframeId(timestamp) {
    return dateFormat(new Date(timestamp), "yyyy-mm-dd'T'HH:MM");
  }

  static async _calculateNewValue(metricName, timeframeId, value) {
    const metricKey = this.metricKey(metricName, timeframeId);
    const oldValue = await this._get(metricKey);

    return MetricNames[metricName].processor(value, oldValue);
  }

  static _updateMetric(metricName, metricKey, newMetricValue) {
    if (MetricNames[metricName].type === 'counter') {
      return this._incr(metricKey);
    } else {
      return this._set(metricKey, newMetricValue);
    }
  }

  static _incr(key) {
    return new Promise((resolve, reject) => {
      client.incr(key, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result)
        }
      });
    });
  }

  static _set(key, value) {
    return new Promise((resolve, reject) => {
      client.set(key, value, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result)
        }
      });
    });
  }

  static _get(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (error, value) => {
        resolve(value);
      });
    });
  }
}

module.exports = MetricsCruncher;
