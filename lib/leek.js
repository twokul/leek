'use strict';

var Configstore = require('configstore'),
    path        = require('path'),
    provider    = require('./provider'),
    fork        = require('child_process').fork,
    chalk       = require('chalk'),
    inquirer    = require('inquirer'),
    debounce    = require('lodash').debounce;

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
  this.version      = options.version;
  this._queue       = {};
  this.config       = options.config || new Configstore('leek-' + this.name + this.version, {
    clientId: options.clientId || Math.floor(Date.now() * Math.random())
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

Leek.prototype._save = debounce(function(eventType, meta) {
  var cp = fork(path.join(__dirname, 'send.js'));

  cp.send({ leekConfig: this._getConfigObject(), eventType: eventType, meta: meta });
  cp.unref();
  cp.disconnect();

  this._queue = {};
}, 100);

Leek.prototype._getRequest = function() {
  return provider.apply(this, arguments);
};

Leek.prototype._getConfigObject = function() {
  return {
    queue:        this._queue,
    name:         this.name,
    version:      this.version,
    trackingCode: this.trackingCode
  };
};

Leek.prototype._track = function(eventType, meta) {
  if (this.silent) {
    return;
  }

  var path = [].map.call(arguments, function(arg) {
    return String(arg).trim();
  }).join(' ');

  this._queue[Date.now() + '|' + path] = path;
  this._save(eventType, meta);
};

Leek.prototype.track = function(name, message) {
  this._track('appview', {
    name:    name,
    message: message
  });
};

Leek.prototype.trackError = function(description, fatal) {
  this._track('exception', {
    description: description,
    fatal:       fatal
  });
};

Leek.prototype.trackTiming = function(category, variable, value) {
  this._track('timing', {
    category: category,
    variable: variable,
    value:    value
  });
};

Leek.prototype.trackEvent = function(name, category, label, value) {
  this._track('event', {
    name:     name,
    category: category,
    label:    label,
    value:    value
  });
};

Leek.prototype.askPermission = function(message, fn) {
  var defaultMessage = 'May ' + chalk.cyan(this.name) + ' anonymously report usage statistics to improve the tool over time?';

  fn = fn || function () {};

  if (!process.stdout.isTTY) {
    return setImmediate(fn.bind(null, null, false));
  }

  inquirer.prompt({
    type:    'confirm',
    name:    'optIn',
    message: message || defaultMessage,
    default: true
  }, function (result) {
    this.silent = !result.optIn;
    fn(null, this.silent);
  }.bind(this));
};

module.exports = Leek;
