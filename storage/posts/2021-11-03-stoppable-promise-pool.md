---
author: Marcus Pöhls
publishedAt: 2021-11-03
tags: [release, promise-pool]
title: "Promise Pool 1.9.0: Stoppable Pool"
---

Starting from version `1.9.0` of [`@supercharge/promise-pool`](https://github.com/supercharge/promise-pool) you can manually stop a running promise pool instance. You can stop a promise pool from the `.process()` or `.handleError()` methods. Both methods provide a stoppable `pool` instance as the third parameter.

Here’s an example how to stop the processing of a running promise pool:

```js
await PromisePool
  .for(users)
  .process(async (user, index, pool) => {
    if (condition) {
      return pool.stop()
    }

    // processes the `user` data
  })
```

You may also stop the pool from within the `.handleError()` method in case you need to:

```js
await PromisePool
  .for(users)
  .handleError(async (error, user, pool) => {
    if (error instanceof SomethingBadHappenedError) {
      return pool.stop()
    }

    // handle the given `error`
  })
  .process(async (user, index, pool) => {
    // processes the `user` data
  })
```

Enjoy!
