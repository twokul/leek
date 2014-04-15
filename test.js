var Leek = require('./lib/leek'),
    leek = new Leek({
      trackingCode: 'UA-49225444-1',
      name:         'ember-cli',
      version:      'test'
    });

leek.track('ember build', 'stuff');
