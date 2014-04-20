var Leek = require('./lib/leek'),
    leek = new Leek({
      trackingCode: 'UA-49225444-1',
      name:         'ember-cli',
      version:      'test-some-more'
    });

// leek.trackEvent('a', 'b', 'c', 'd');
// leek.track('ember build', 'stuff ' + Date.now());

leek.trackTiming('rebuild' + Date.now(), 'brocolli', '200ms');

// try {
  // throw new Error('ZOMG');
// } catch(e) {
  // leek.trackError(e.message, true);
// }
