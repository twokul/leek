'use strict';

var request = require('request'),
    async   = require('async'),
    assign  = require('object-assign'),
    Leek    = require('./leek');

process.on('message', function(configObject) {
  var leek = new Leek(configObject.leekConfig),
      config  = leek.config,
      q       = config.get('queue') || {};

  assign(q, configObject.leekConfig.queue);
  config.del('queue');

  async.forEachSeries(Object.keys(q), function(el, cb) {
    var parts = el.split('|'),
        id    = parts[0],
        path  = parts[1];

    request(leek._getRequest(configObject.eventType, configObject.meta, id, path), function(error) {
      if (error) {
        return cb(error);
      }
      cb();
    });
  }, function(error) {
    if (error) {
      var q2 = config.get('queue') || {};
      assign(q2, q);
      config.set('queue', q2);
    }

    process.exit(0);
  });
});
