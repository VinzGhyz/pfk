'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('spot service', function() {
  it('registered the spots service', () => {
    assert.ok(app.service('spots'));
  });
});
