process.env.NODE_ENV = 'test';

var supertest = require('supertest');
const nock = require('nock');
var chai = require('chai');
var app = require('../app.js');


function mockRequest({ path = '/', status = 200, response = {} } = {}) {
  nock('https://api.mercadolibre.com')
    .get(path)
    .reply(status, response);
}

global.app = app;
global.expect = chai.expect;
global.request = supertest(app);
global.mockRequest = mockRequest;
