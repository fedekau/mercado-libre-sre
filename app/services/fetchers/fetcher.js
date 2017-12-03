const rp = require('request-promise-native');
const MetricsPublisher = require('../metrics-publisher');
const MetricNames = require('../../../lib/metrics/metric-names');

class ItemFetcher {
  static async fetch(uri) {
    const options = {
      time: true,
      resolveWithFullResponse: true,
      uri: uri
    };

    const response = await rp.get(options);

    MetricsPublisher.publish(MetricNames.response_time_api_calls, response.elapsedTime);

    return JSON.parse(response.body);
  }
}

module.exports = ItemFetcher;
