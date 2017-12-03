const average = (value, oldValue) => {
  if (value && oldValue) {
    return Math.round((parseInt(value) + parseInt(oldValue)) / 2.0);
  } else {
    return parseInt(value);
  }
}

module.exports = {
  response_time: {
    channel_name: 'response_time',
    type: 'average',
    processed_metric_name: 'avg_response_time',
    processor: average
  }
}
