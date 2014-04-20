var Leek = require('./lib/leek'),
    leek = new Leek({
      trackingCode: 'UA-49225444-1',
      name:         'ember-cli',
      version:      'test'
    });

leek.trackEvent('ember build', 'stuff', 'moar stuff', 'stuff message');
leek.track('ember build', 'stuff');
