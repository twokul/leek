'use strict';

var os = require('os');

var map = {
  darwin: {
    '13.1.0': 'OSX Mavericks',
    '12.5.0': 'OSX Mountain Lion',
    '12.0.0': 'OSX Mountain Lion',
    '11.4.2': 'Mac OSX Lion',
    '11.0.0': 'Mac OSX Lion',
    '10.8':   'Mac OSX Snow Leopard',
    '10.0':   'Mac OSX Snow Leopard',
    '9.8':    'Leopard',
    '9.0':    'Leopard'
  },
  win32: {
  },
  linux: {
  }
};

module.exports = function getVersions() {
  return {
    platform: map[os.platform()][os.release()],
    version:  process.version
  };
};
