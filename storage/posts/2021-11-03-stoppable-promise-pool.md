---
author: Marcus Pöhls
publishedAt: 2021-11-03
tags: [promise-pool, packages]
title: Stoppable Promise Pool
---

Text

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
