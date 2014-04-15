## Leek

[![Build Status](https://travis-ci.org/twokul/leek.svg)](https://travis-ci.org/twokul/leek)

Track Error via Events:

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
  leek.trackEvent('my-nifty-package show pony', 'Exception', e.message, e.stack);
}
```

Track command hits:

```javascript
var Leek = require('./lib/leek'),
    leek = new Leek({
      trackingCode: 'xx-xxxxxxxx-x',
      name:         'my-nifty-package',
      version:      '1.0.1'
    });

leek.track('my-nifty-package show pony', 'pony is here');
```
