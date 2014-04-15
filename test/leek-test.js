'use strict';

var assert = require('chai').assert,
    Leek   = require('../lib/leek'),
    leek;

describe('Leek tests', function() {
  it('Leek exists', function() {
    assert.ok(Leek);
  });

  it('asserts if options are not specified', function() {
    assert.throws(function() {
      leek = new Leek();
    }, 'You need to specify the options.');
  });

  it('asserts if tracking code is not specified', function() {
    assert.throws(function() {
      leek = new Leek({
        name:         'ember-cli',
        version:      '0.0.23'
      });
    }, 'You need to specify the tracking code.');
  });

  it('asserts if name is not specified', function() {
    assert.throws(function() {
      leek = new Leek({
        trackingCode: 'xxxxx',
        version:      '0.0.23'
      });
    }, 'You need to specify the name.');
  });

  it('should set options', function() {
    leek = new Leek({
      trackingCode: 'xxxxx',
      name:         'ember-cli',
      clientId:     'things'
    });

    assert.equal(leek.trackingCode, 'xxxxx', 'tracking code is not correct');
    assert.equal(leek.name, 'ember-cli', 'name is not correct');
    assert.ok(leek._queue);
    assert.ok(leek.config);
    assert.notOk(leek.version);
  });

  it('should have public API methods', function() {
    leek = new Leek({
      trackingCode: 'xxxxx',
      name:         'ember-cli'
    });

    assert.ok(leek.track);
    assert.ok(leek.trackError);
    assert.ok(leek.trackTiming);
    assert.ok(leek.trackEvent);
  });

  it('should have private API methods', function() {
    leek = new Leek({
      trackingCode: 'xxxxx',
      name:         'ember-cli'
    });

    assert.ok(leek._save);
    assert.ok(leek._getConfigObject);
    assert.ok(leek._track);
    assert.ok(leek._getRequest);
  });
});
