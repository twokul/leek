'use strict';

var assert = require('chai').assert,
    ok     = assert.ok,
    include = assert.include,
    called = false,
    url    =  null,
    expected = null,
    rewire = require('rewire'),
    Leek   = rewire('../lib/leek'),
    md5    = require('../lib/md5'),
    leek   = null;

describe('trackTiming()', function() {
  before(function() {
    expected = {
      v:   1,
      t:   'timing',
      aip: 1,
      tid: 'xxxxx',
      cid: 'things',
      an: 'ember-cli',
      av: '0.0.1 OSX Mavericks, node v0.11.12-pre',
      utv: 'test',
      utt: '200ms',
      utl: 'broccoli'
    };

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
      clientId:     'ember-cli' + md5('things'),
      version:      '0.0.1'
    });
  });

  after(function() {
    leek = null;
  });

  it('options passed in are correct', function() {
    leek.trackTiming({
      category: 'rebuild' + Date.now(),
      variable: 'test',
      label:    'broccoli',
      value:    '200ms'
    });

    ok(called);

    include(url, 'cid=ember-cli0898b22730d57afcd394d8e4889ece4a');
    include(url, 'utt=200ms');
    include(url, 't=timing');
    include(url, 'utc=rebuild');
    include(url, 'utl=broccoli');
    include(url, 'utv=test');
  });
});
