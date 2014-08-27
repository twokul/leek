'use strict';

var RSVP        = require('rsvp'),
    Promise     = RSVP.Promise,
    provider    = require('./provider'),
    request     = RSVP.denodeify(require('request')),
    getVersions = require('./get-versions'),
    md5         = require('./md5'),
    extend      = require('lodash').extend;

function Leek(options) {
  if (!options) {
    throw new Error('You need to specify the options.');
  }

  if (!options.trackingCode) {
    throw new Error('You need to specify the tracking code.');
  }

  if (!options.globalName) {
    throw new Error('You need to specify the global name.');
  }

  this.trackingCode = options.trackingCode;
  this.name         = options.name || '';
  this.globalName   = options.globalName;
  this.clientId     = this.globalName + md5(this.name);
  this.version      = options.version || '';
  this.silent       = options.silent || process.env.DISABLE_LEEK;
}

Leek.prototype.setName = function(value) {
  this.name     = value;
  this.clientId = this.globalName + md5(this.name);
};

Leek.prototype._enqueue = function(eventType, meta) {
  if (this.silent) {
    return Promise.resolve();
  }

  var params = provider.call(
    this,
    eventType,
    extend(meta, getVersions()),
    Date.now()
  );

  return request(params);
};

Leek.prototype._getConfigObject = function() {
  return {
    name:         this.name,
    version:      this.version,
    trackingCode: this.trackingCode
  };
};

Leek.prototype.track = function(meta) {
  return this._enqueue('appview', {
    name:    meta.name,
    message: meta.message
  });
};

Leek.prototype.trackError = function(meta) {
  return this._enqueue('exception', {
    description: meta.description,
    fatal:       meta.isFatal
  });
};

Leek.prototype.trackTiming = function(meta) {
  return this._enqueue('timing', {
    category: meta.category,
    variable: meta.variable,
    value:    meta.value,
    label:    meta.label
  });
};

Leek.prototype.trackEvent = function(meta) {
  return this._enqueue('event', {
    name:     meta.name,
    category: meta.category,
    label:    meta.label,
    value:    meta.value
  });
};

module.exports = Leek;
