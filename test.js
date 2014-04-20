var Leek = require('./lib/leek'),
    leek = new Leek({
      trackingCode: 'xx-xxxxxxxx-x',
      name:         'ember-cli',
      version:      'test-some-more'
    });

leek.trackEvent({
  name:     'a',
  category: 'b',
  label:    'c',
  value:    'd'
});

leek.track({
  name:    'ember 2build',
  message: 'stuff ' + Date.now()
});

leek.trackTiming({
  category: 'rebuild' + Date.now(),
  variable: 'brocolli',
  value:    '200ms'
});

try {
  throw new Error('ZOMG');
} catch(e) {
  leek.trackError({
    description: e.message + ' ' + e.stack,
    isFatal:     true
  });
}
