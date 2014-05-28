'use strict';

var assert = require('chai').assert,
    Leek   = require('../lib/leek'),
    ok     = assert.ok,
    equal  = assert.equal,
    throws = assert.throws,
    leek;

describe('constructor', function() {
  it('exists', function() {
    ok(Leek);
  });

  it('asserts if options are not specified', function() {
    throws(function() {
      leek = new Leek();
    }, 'You need to specify the options.');
  });

  it('asserts if tracking code is not specified', function() {
    throws(function() {
      leek = new Leek({
        name:    'ember-cli',
        version: '0.0.23'
      });
    }, 'You need to specify the tracking code.');
  });

  it('asserts if name is not specified', function() {
    throws(function() {
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

    equal(leek.trackingCode, 'xxxxx', 'tracking code is correct');
    equal(leek.name, 'ember-cli', 'name is correct');
    ok(leek.config);
    equal(leek.version, '0.0.1', 'version is correct');
  });

  it('default version is set if it\'s not specified', function() {
    leek = new Leek({
      trackingCode: 'xxxxx',
      name:         'ember-cli',
      clientId:     'things'
    });

    equal(leek.version, '', 'version is an empty string');
  });

  it('should have public API methods', function() {
    leek = new Leek({
      trackingCode: 'xxxxx',
      name:         'ember-cli'
    });

    ok(leek.track);
    ok(leek.trackError);
    ok(leek.trackTiming);
    ok(leek.trackEvent);
  });

  it('should have private API methods', function() {
    leek = new Leek({
      trackingCode: 'xxxxx',
      name:         'ember-cli'
    });

    ok(leek._getConfigObject);
  });
});
