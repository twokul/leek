'use strict';
var debug = require('debug')('leek:provider');

var getAppViewObject = function() {
  var now = Date.now(),
  args = [].slice.call(arguments),
  type = args.slice(0, 1)[0],
  id   = args.slice(2, 3)[0],
  meta = args.slice(1, 2)[0];

  var payload = {
    v:   1,
    t:   type,
    aip: 1,
    tid: this.trackingCode,
    cid: this.clientId,
    an:  this.globalName,
    av:  this.version,
    cd:  meta.message + ' ' + meta.platform + ', node ' + meta.version,
    qt:  now - parseInt(id, 10),
    z:   now
  };

  debug('getAppViewObject %o', payload);

  return payload;
};

var getExceptionObject = function() {
  var now  = Date.now(),
      args = [].slice.call(arguments),
      type = args.slice(0, 1)[0],
      id   = args.slice(2, 3)[0],
      meta = args.slice(1, 2)[0];

  var payload = {
    v:   1,
    t:   type,
    aip: 1,
    tid: this.trackingCode,
    cid: this.clientId,
    an:  this.globalName,
    av:  this.version,
    exd: meta.description + ' ' + meta.platform + ', node ' + meta.version,
    exf: meta.fatal,
    qt:  now - parseInt(id, 10),
    z:   now
  };

  debug('getExceptionObject %o', payload);

  return payload;
};

var getTimingObject = function() {
  var now  = Date.now(),
      args = [].slice.call(arguments),
      type = args.slice(0, 1)[0],
      id   = args.slice(2, 3)[0],
      meta = args.slice(1, 2)[0];

  var payload = {
    v:   1,
    t:   type,
    aip: 1,
    tid: this.trackingCode,
    cid: this.clientId,
    an:  this.globalName,
    av:  this.version + ' ' + meta.platform + ', node ' + meta.version,
    utc: meta.category,
    utv: meta.variable,
    utt: meta.value,
    utl: meta.label,
    qt:  now - parseInt(id, 10),
    z:   now
  };


  debug('getTimingObject %o', payload);

  return payload;
};

var getEventObject = function() {
  var now  = Date.now(),
      args = [].slice.call(arguments),
      type = args.slice(0, 1)[0],
      id   = args.slice(2, 3)[0],
      meta = args.slice(1, 2)[0];

  var payload = {
    v:   1,
    t:   type,
    aip: 1,
    tid: this.trackingCode,
    cid: this.clientId,
    an:  this.globalName,
    av:  this.version,
    ec:  meta.category,
    ea:  meta.globalName,
    el:  meta.value + ' ' + meta.platform + ', node ' + meta.version,
    ev:  meta.label,
    qt:  now - parseInt(id, 10),
    z:   now
  };

  debug('getEventObject %o', payload);
  return payload;
};

var adapters = {
  appview: function() {
    return { url: 'https://ssl.google-analytics.com/collect', qs: getAppViewObject.apply(this, arguments) };
  },
  exception: function() {
    return { url: 'https://ssl.google-analytics.com/collect', qs: getExceptionObject.apply(this, arguments) };
  },
  timing: function() {
    return { url: 'https://ssl.google-analytics.com/collect', qs: getTimingObject.apply(this, arguments) };
  },
  event: function() {
    return { url: 'https://ssl.google-analytics.com/collect', qs: getEventObject.apply(this, arguments) };
  }
};

module.exports = function(eventType) {
  var adapter = adapters[eventType].apply(this, arguments);

  debug('eventType: %s url: %s', eventType, adapter.url);

  return adapter;
};
