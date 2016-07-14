'use strict';

var assert = require('chai').assert,
    equal  = assert.equal,
    called = false,
    url    = null,
    rewire = require('rewire'),
    Leek   = rewire('../lib/leek'),
    leek   = null;

describe('trackEvent', function() {
  before(function() {
    Leek.__set__('https', {
      get: function(newUrl) {
        called = true;
        url = newUrl;

        return {
          on: function() { }
        };
      }
    });

    leek = new Leek({
      trackingCode: 'xxxxx',
      globalName:   'ember-cli',
      name:         'cli',
      clientId:     'things',
      version:      '0.0.1',
      adapterUrls: {
        appview: 'http://example.com/collect',
        exception: 'http://example.com/collect-exception',
        timing: 'http://example.com/collect-timing',
        event: 'http://example.com/collect-event'
      }
    });
  });

  after(function() {
    leek = null;
  });

  it('should use provided event url', function() {
    leek.trackEvent({
      name:     'test',
      category: 'test-test',
      label:    'test-label',
      value:    'test-value'
    });

    equal(url, 'http://example.com/collect-event');
  });

  it('should use provided timing url', function() {
    leek.trackTiming({
      name:     'test',
      category: 'test-test',
      label:    'test-label',
      value:    'test-value'
    });

    equal(url, 'http://example.com/collect-timing');
  });

  it('should use provided exception url', function() {
    leek.trackError({
      name:     'test',
      category: 'test-test',
      label:    'test-label',
      value:    'test-value'
    });

    equal(url, 'http://example.com/collect-exception');
  });

  it('should use provided general app tracking url', function() {
    leek.track({
      name:     'test',
      category: 'test-test',
      label:    'test-label',
      value:    'test-value'
    });

    equal(url, 'http://example.com/collect');
  });
});
