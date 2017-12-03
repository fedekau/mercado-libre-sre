const dotenv = require('dotenv');

dotenv.config();

const responseTime = require('response-time')
const application = require('./app/index');
const express = require('express');
const morgan = require('morgan');

const server = express();

const MetricsPublisher = require('./app/services/metrics-publisher');
const MetricNames = require('./lib/metrics/metric-names');

server.use(responseTime((req, res, time) => {
  MetricsPublisher.publish(MetricNames.response_time, time);
}));

server.use((req, res, next) => {
  MetricsPublisher.publish(MetricNames.total_requests, 1);

  next();
});

server.use(morgan('tiny'));
server.use(application);

server.listen(3000);

module.exports = server;
