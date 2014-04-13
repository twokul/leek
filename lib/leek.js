'use strict';

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
}

Leek.prototype.track = function() {
};

Leek.prototype.trackError = function() {
};

Leek.prototype.trackRebuild = function() {
};

Leek.prototype.trackCommand = function() {
};

Leek.prototype.trackFlag = function() {
};

module.exports = Leek;
