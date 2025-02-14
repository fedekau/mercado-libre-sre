const average = (value, oldValue) => {
  if (value && oldValue) {
    return Math.round((parseInt(value) + parseInt(oldValue)) / 2.0);
  } else {
    return parseInt(value);
  }
}

const identity = (value, oldValue) => {
  return value;
}

const append = (value, oldValue) => {
  const history = JSON.parse(oldValue) || [];

  const status = history.find((e) => {
    return e.status_code === value.status_code;
  });

  if (status) {
    status.count = status.count + value.count;
  } else {
    history.push(value);
  }

  return JSON.stringify(history);
}

module.exports = {
  response_time: {
    channel_name: 'response_time',
    type: 'average',
    processed_metric_name: 'avg_response_time',
    processor: average
  },
  total_requests: {
    channel_name: 'total_requests',
    type: 'counter',
    processed_metric_name: 'total_requests',
    processor: identity
  },
  response_time_api_calls: {
    channel_name: 'response_time_api_calls',
    type: 'average',
    processed_metric_name: 'avg_response_time_api_calls',
    processor: average
  },
  total_count_api_calls: {
    channel_name: 'total_count_api_calls',
    type: 'counter',
    processed_metric_name: 'total_count_api_calls',
    processor: identity
  },
  info_requests: {
    channel_name: 'info_requests',
    type: 'history',
    processed_metric_name: 'info_requests',
    processor: append
  }
}
