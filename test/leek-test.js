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
      clientId:     'things',
      version:      '0.0.1'
    });

    assert.equal(leek.trackingCode, 'xxxxx', 'tracking code is correct');
    assert.equal(leek.name, 'ember-cli', 'name is correct');
    assert.ok(leek.config);
    assert.equal(leek.version, '0.0.1', 'version is correct');
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

    assert.ok(leek._getConfigObject);
  });
});
