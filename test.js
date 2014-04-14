var Leek = require('./lib/leek'),
    leek = new Leek({
      trackingCode: 'UA-49225444-1',
      name:         'ember-cli',
      version:      'test'
    });

try {
  throw new Error('ZOMG FIX ME')
} catch(e) {
  leek.track('ember build', e.stack, e.message);
}
