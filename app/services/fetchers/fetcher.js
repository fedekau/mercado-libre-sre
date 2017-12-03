const rp = require('request-promise-native');
const errors = require('request-promise-native/errors');
const MetricsPublisher = require('../metrics-publisher');

class ItemFetcher {
  static async fetch(uri) {
    const options = {
      time: true,
      resolveWithFullResponse: true,
      uri: uri
    };

    try {
      const response = await rp.get(options);

      MetricsPublisher.publishExternalRequestResult(response);

      return JSON.parse(response.body);
    } catch(e) {
      if (e instanceof errors.StatusCodeError) {
        MetricsPublisher.publishExternalRequestError(e);
      }

      throw e;
    }
  }
}

module.exports = ItemFetcher;
