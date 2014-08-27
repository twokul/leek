## Leek

[![Build Status](https://travis-ci.org/twokul/leek.svg)](https://travis-ci.org/twokul/leek)

Initial implementation was based on [Insight](https://github.com/yeoman/insight).

### Track Events:

```javascript
var Leek = require('./lib/leek'),
    leek = new Leek({
      trackingCode: 'xx-xxxxxxxx-x',
      globalName:   'my-nifty-package',
      version:      '1.0.1'
    });

leek.trackEvent({
  name:     'my-nifty-package',
  category: 'pony show',
  label:    'white',
  value:    'jumps'
});
```

### Track Errors:

```javascript
var Leek = require('./lib/leek'),
    leek = new Leek({
      trackingCode: 'xx-xxxxxxxx-x',
      name:         'my-nifty-package',
      version:      '1.0.1'
    });

try {
  throw new Error('ZOMG FIX ME')
} catch(e) {
  leek.trackError({
    description: e.message + ' ' + e.stack,
    isFatal: true
  });
}
```

### Track command hits:

```javascript
var Leek = require('./lib/leek'),
    leek = new Leek({
      trackingCode: 'xx-xxxxxxxx-x',
      name:         'my-nifty-package',
      version:      '1.0.1'
    });

leek.track({
  name:    'my-nifty-package show pony',
  message: 'pony is here'
});
```

### Disable Tracking:

#### Environment Variable

Setting the `DISABLE_LEEK` environment variable will disable tracking.

#### Constructor Options

```javascript
var Leek = require('./lib/leek');
var leek = new Leek({
  trackingCode: 'xx-xxxxxxxx-x',
  name:         'my-nifty-package',
  version:      '1.0.1',
  silent:       true
});
```
