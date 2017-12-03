const redis = require('redis');
const client = redis.createClient();
const dateFormat = require('dateformat');
const MetricNames = require('../../lib/metrics/metric-names');

class MetricsCruncher {
  static async crunch(metricName, { timestamp, value }) {
    const timeframeId = this._timeframeId(timestamp);
    const metricKey = this._metricKey(metricName, timeframeId);
    const newMetricValue = await this._calculateNewValue(metricName, timeframeId, value);

    console.log({
      timeframeId,
      metricKey,
      newMetricValue
    });

    this._updateMetric(metricKey, newMetricValue);
  }

  static _metricKey(metricName, timeframeId) {
    const { processed_metric_name } = MetricNames[metricName];

    return `${processed_metric_name}+${timeframeId}`;
  }

  static _timeframeId(timestamp) {
    return dateFormat(new Date(timestamp), "yyyy-mm-dd'T'HH:MM");
  }

  static async _calculateNewValue(metricName, timeframeId, value) {
    const metricKey = this._metricKey(metricName, timeframeId);
    const oldValue = await this._get(metricKey);

    return MetricNames[metricName].processor(value, oldValue);
  }

  static _updateMetric(metricKey, newMetricValue) {
    return new Promise((resolve, reject) => {
      client.set(metricKey, newMetricValue, (error, result) => {
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
