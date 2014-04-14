'use strict';

module.exports = function(id, path, eventType, message) {
  var now    = Date.now(),
      params = {
        v:   1,                // GA API version
        t:   eventType,         // event type
        aip: 1,                // anonymize IP
        tid: this.trackingCode,
        cid: this.clientId,
        an:  this.name,
        av:  this.version,
        cd:  path,
        qt:  now - parseInt(id, 10), // queue time - delta (ms) between now and track time
        z:   now                     // cache busting
      };

  return { url: 'http://www.google-analytics.com/collect', qs: params };
};
