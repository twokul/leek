'use strict';

var getAppViewObject = function() {
  var now = Date.now(),
      args = [].slice.call(arguments),
      type = args.slice(0, 1)[0],
      id   = args.slice(2, 3)[0],
      meta = args.slice(1, 2)[0];

  return {
    v:   1,
    t:   type,
    aip: 1,
    tid: this.trackingCode,
    cid: this.clientId,
    an:  this.globalName,
    av:  this.version + ' ' + meta.platform + ', node ' + meta.version,
    cd:  meta.message,
    qt:  now - parseInt(id, 10),
    z:   now
  };
};

var getExceptionObject = function() {
  var now  = Date.now(),
      args = [].slice.call(arguments),
      type = args.slice(0, 1)[0],
      id   = args.slice(2, 3)[0],
      meta = args.slice(1, 2)[0];

  return {
    v:   1,
    t:   type,
    aip: 1,
    tid: this.trackingCode,
    cid: this.clientId,
    an:  this.globalName,
    av:  this.version + ' ' + meta.platform + ', node ' + meta.version,
    exd: meta.description,
    exf: meta.fatal,
    qt:  now - parseInt(id, 10),
    z:   now
  };
};

var getTimingObject = function() {
  var now  = Date.now(),
      args = [].slice.call(arguments),
      type = args.slice(0, 1)[0],
      id   = args.slice(2, 3)[0],
      meta = args.slice(1, 2)[0];

  return {
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
};

var getEventObject = function() {
  var now  = Date.now(),
      args = [].slice.call(arguments),
      type = args.slice(0, 1)[0],
      id   = args.slice(2, 3)[0],
      meta = args.slice(1, 2)[0];

  return {
    v:   1,
    t:   type,
    aip: 1,
    tid: this.trackingCode,
    cid: this.clientId,
    an:  this.globalName,
    av:  this.version + ' ' + meta.platform + ', node ' + meta.version,
    ec:  meta.category,
    ea:  meta.globalName,
    el:  meta.value,
    ev:  meta.label,
    qt:  now - parseInt(id, 10),
    z:   now
  };
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
  return adapters[eventType].apply(this, arguments);
};
