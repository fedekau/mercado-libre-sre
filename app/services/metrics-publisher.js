const redis = require('redis');
const pub = redis.createClient();
const MetricNames = require('../../lib/metrics/metric-names');

class MetricsPublisher {
  static publish({ channel_name }, value = null) {
    pub.publish(channel_name, JSON.stringify({ timestamp: Date.now(),  value }));
  }

  static publishExternalRequestResult(response) {
    this.publish(MetricNames.total_count_api_calls, 1);
    this.publish(MetricNames.response_time_api_calls, response.elapsedTime);
    this.publish(MetricNames.info_requests, {
      status_code: response.statusCode,
      count: 1
    });
  }

  static publishExternalRequestError(error) {
    this.publishExternalRequestResult(error.response);
  }
}

module.exports = MetricsPublisher;
