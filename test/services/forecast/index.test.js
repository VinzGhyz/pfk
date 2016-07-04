'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('forecast service', function() {
  it('registered the forecasts service', () => {
    assert.ok(app.service('forecasts'));
  });
});
