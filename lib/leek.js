'use strict';

var Configstore = require('configstore'),
    Promise     = require('rsvp').Promise,
    provider    = require('./provider'),
    uuid        = require('node-uuid'),
    request     = require('request'),
    getVersions = require('./get-versions'),
    extend      = require('lodash').extend;

function Leek(options) {
  if (!options) {
    throw new Error('You need to specify the options.');
  }

  if (!options.trackingCode) {
    throw new Error('You need to specify the tracking code.');
  }

  if (!options.name) {
    throw new Error('You need to specify the name.');
  }

  this.trackingCode = options.trackingCode;
  this.name         = options.name;
  this.version      = options.version || '';
  this.silent       = options.silent || false;
  this.config       = options.config || new Configstore('leek-' + this.name, {
    clientId: options.clientId || uuid.v1()
  });
}

Object.defineProperty(Leek.prototype, 'clientId', {
  get: function() {
    return this.config.get('clientId');
  },
  set: function(value) {
    this.config.set('clientId', value);
  }
});

Leek.prototype._enqueue = function(eventType, meta) {
  return new Promise(function(resolve, reject) {
    var params = provider.call(
      this,
      eventType,
      extend(meta, getVersions()),
      Date.now()
    );
    return request(
      params,
      reject
    );
  }.bind(this));
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
