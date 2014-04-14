'use strict';

var Configstore = require('configstore'),
    provider    = require('./provider'),
    chalk       = require('chalk'),
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

Leek.prototype._save = debounce(function() {
  var cp = fork(path.join(__dirname, 'send.js'));

  cp.send(this._getConfigObject());
  cp.unref();
  cp.disconnect();

  this._queue = {};
}, 100);

Leek.prototype._getRequest = function() {
  return provider.apply(this, arguments);
}

Leek.prototype._getConfigObject = function() {
  return {
    queue:        this._queue,
    name:         this.name,
    version:      this.version,
    trackingCode: this.trackingCode
  };
};

Leek.prototype.track = function() {
  if (this.silent) {
    return;
  }

  var path = '/' + [].map.call(arguments, function (el) {
    return String(el).trim().replace(/ /, '-');
  }).join('/');

  this._queue[Date.now() + ' ' + path] = path;
  this._save();
};

Leek.prototype.trackError = function() {
};

Leek.prototype.trackRebuild = function() {
};

Leek.prototype.trackCommand = function() {
};

Leek.prototype.trackFlag = function() {
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
}

module.exports = Leek;
