'use strict';

var assert      = require('chai').assert,
    rewire      = require('rewire'),
    getVersions = rewire('../lib/get-versions');

function stubOS(platform, version) {
  getVersions.__set__('os', {
    platform: function() {
      return platform;
    },
    release: function() {
      return version;
    }
  });
}

describe('GetVersions tests', function() {
  it('GetVersions exists', function() {
    assert.ok(getVersions);
  });

  it('returns proper version for Mavericks', function() {
    stubOS('darwin', '13.1.0');
    assert.equal(getVersions().platform, 'OSX Mavericks');
  });

  it('returns proper version for Mountain Lion', function() {
    stubOS('darwin', '12.5.0');
    assert.equal(getVersions().platform, 'OSX Mountain Lion');
    stubOS('darwin', '12.0.0');
    assert.equal(getVersions().platform, 'OSX Mountain Lion');
  });

  it('returns proper version for Lion', function() {
    stubOS('darwin', '11.4.2');
    assert.equal(getVersions().platform, 'Mac OSX Lion');
    stubOS('darwin', '11.0.0');
    assert.equal(getVersions().platform, 'Mac OSX Lion');
  });

  it('returns proper version for Snow Leopard', function() {
    stubOS('darwin', '10.8');
    assert.equal(getVersions().platform, 'Mac OSX Snow Leopard');
    stubOS('darwin', '10.0');
    assert.equal(getVersions().platform, 'Mac OSX Snow Leopard');
  });

  it('returns proper version for Windows 8.1', function() {
    stubOS('win32', '6.3.9600');
    assert.equal(getVersions().platform, 'Windows 8.1');
  });

  it('returns proper version for Windows 8', function() {
    stubOS('win32', '6.2.9200');
    assert.equal(getVersions().platform, 'Windows 8');
  });

  it('returns proper version for Windows 7 SP1', function() {
    stubOS('win32', '6.1.7601');
    assert.equal(getVersions().platform, 'Windows 7 SP1');
  });

  it('returns proper version for Windows Vista', function() {
    stubOS('win32', '6.0.6000');
    assert.equal(getVersions().platform, 'Windows Vista');
  });

  it('returns proper version for Windows Vista SP2', function() {
    stubOS('win32', '6.0.6002');
    assert.equal(getVersions().platform, 'Windows Vista SP2');
  });

  it('returns proper version for Windows 7', function() {
    stubOS('win32', '6.1.7600');
    assert.equal(getVersions().platform, 'Windows 7');
  });

  it('returns raw values if mapping is not found', function() {
    stubOS('raw', 'value');
    assert.equal(getVersions().platform, 'raw value');
  });
});
