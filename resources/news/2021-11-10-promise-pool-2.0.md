---
author: Marcus Pöhls
publishedAt: 2021-11-10
tags: [release, promise-pool]
title: Promise Pool 2.0
---

We published a new major version of the [@supercharge/promise-pool](https://github.com/supercharge/promise-pool) package: version `2.0` is now available in the NPM registry!


### Changes
There’s no new feature for the promise pool in version `2.0`.

A change that may be helpful for you is the extended package exports. We’re now exporting internal classes and types besides the `PromisePool` class:

- `PromisePool`
- `PromisePoolError`
- `StopThePromisePoolError`
- `Stoppable` (interface)
- `ReturnValue` (interface)

These classes and types may help you to type your code properly when passing promise pool values instance between methods.


### Breaking Changes and Migration
Starting from `@supercharge/promise-pool@2.x` the package uses named exports. When migrating from `1.x` to `2.x` you must adjust your imports and destructure the `PromisePool` class out of the package:

```js
// Now: 2.x
import { PromisePool } from '@supercharge/promise-pool'
// or
const { PromisePool } = require('@supercharge/promise-pool')

// Before: 1.x
import PromisePool from '@supercharge/promise-pool' // required the `esModuleInterop` flag in tsconfig.json
// or
const PromisePool = require('@supercharge/promise-pool')
```

Previously, in `@supercharge/promise-pool@1.x` we used a default export matching the `module.exports = XYZ` syntax from CommonJS. This style of export [required TypeScript users to enable the `esModuleInterop` flag](https://github.com/supercharge/promise-pool/issues/38) in their `tsconfig.json`. To avoid this `esModuleInterop` flag requirement we changed the exports to use named exports.

Thank you [Amit (amitlevy21)](https://github.com/supercharge/promise-pool/issues/39) for sharing this issue and also providing a pull request to fix it ❤️




