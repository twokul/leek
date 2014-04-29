'use strict';

var assert = require('chai').assert,
    _      = require('lodash'),
    Leek   = require('../lib/leek'),
    leek   = new Leek({ trackingCode: 'xxxxx', name: 'ember-cli', clientId: 'things' });

describe('Track', function() {
  var called = false;

  beforeEach(function() {
    leek._save = function() {
      called = true;
    };
  });

  afterEach(function() {
    called = false;
  });

  it('saves item in the internal queue', function() {
    leek.track({
      name:    'hello',
      message: 'world'
    });

    assert(called, '_save is called');
    assert(!_.isEmpty(leek._queue), 'queue is not empty');
  });

  it('doesn\'t get called if `silent` is true', function() {
    leek.silent = true;

    leek.track({
      name:    'hello',
      message: 'world'
    });

    assert(!called, '_save is not called');
  });
});
