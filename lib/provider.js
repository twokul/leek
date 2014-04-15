'use strict';

var getAppViewObject = function() {
  var now = Date.now(),
      args = [].slice.call(arguments),
      id   = args.slice(2, 3)[0],
      meta = args.slice(1, 2)[0];

  return {
    v:   1,
    t:   'appview',
    aip: 1,
    tid: this.trackingCode,
    cid: this.clientId,
    an:  this.name,
    av:  this.version,
    cd:  meta.name + ' ' + meta.message,
    qt:  now - parseInt(id, 10),
    z:   now
  };
};

var getExceptionObject = function() {
  var now = Date.now();

  return {
    v:   1,
    t:   'exception',
    aip: 1,
    tid: this.trackingCode,
    cid: this.clientId,
    an:  this.name,
    av:  this.version,
    exd: path,
    exf: true,
    qt:  now - parseInt(id, 10),
    z:   now
  };
};

var getTimingObject = function() {
  var now = Date.now();

  return {
    v:   1,
    t:   'timing',
    aip: 1,
    tid: this.trackingCode,
    cid: this.clientId,
    an:  this.name,
    av:  this.version,
    utc: 'rebuild time',
    utv: 'live reload',
    utt: 200,
    utl: 'broccoli',
    qt:  now - parseInt(id, 10),
    z:   now
  };
};

var getEventObject = function() {
  var now  = Date.now(),
      args = [].slice.call(arguments),
      id   = args.slice(2, 3)[0],
      meta = args.slice(1, 2)[0];

  return { v:   1,
    t:   'event',
    aip: 1,
    tid: this.trackingCode,
    cid: this.clientId,
    an:  this.name,
    av:  this.version,
    ec:  meta.category,
    ea:  meta.name,
    el:  meta.value,
    ev:  meta.label,
    qt:  now - parseInt(id, 10),
    z:   now
  };
};

var adapters = {
  appview: function() {
    return { url: 'http://www.google-analytics.com/collect', qs: getAppViewObject.apply(this, arguments) };
  },
  exception: function() {
    return { url: 'http://www.google-analytics.com/collect', qs: getExceptionObject.apply(this, arguments) };
  },
  timing: function() {
    return { url: 'http://www.google-analytics.com/collect', qs: getTimingObject.apply(this, arguments) };
  },
  event: function() {
    return { url: 'http://www.google-analytics.com/collect', qs: getEventObject.apply(this, arguments) };
  }
};

module.exports = function(eventType) {
  return adapters[eventType].apply(this, arguments);
};
