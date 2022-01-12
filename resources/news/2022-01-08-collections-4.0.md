---
author: Marcus Pöhls
publishedAt: 2022-01-08
tags: [release, collections]
title: Collections 4.0
---

A new major release of our [@supercharge/collections](https://github.com/supercharge/collections) package has been published the in the NPM registry 🥳 Version `4.0` is now available to everyone.


### Breaking Changes (compared to version 3.x)
- use named exports
  ```js
  // now
  const { Collect } = require('@supercharge/collections')

  // before
  const Collect = require('@supercharge/collections')
  ```

- remove synchronous collection: **everything is async and must be awaited**
  ```js
  // now
  const { Collect } = require('@supercharge/collections')
  const numsGreater5 = await Collect([5, 6, 7]).filter(num => num > 5)

  // before
  const Collect = require('@supercharge/collections')
  const numsGreater5 = Collect([5, 6, 7]).filter(num => num > 5).all()
  ```

- removed iterator support: `@supercharge/collections` v4 is fully async and we’re going to add async iterators. In a later feature release. For now, we’re shipping v4 without async iterators. We appreciate [a pull request if you want to add iterator support](https://github.com/supercharge/collections).


### What is @supercharge/collections?
The [`@supercharge/collections`](https://github.com/supercharge/collections) package is an async array implementation. It provides a fluent interface to work with JavaScript arrays supporting async callbacks in methods like `map`, `find`, `filter`, `reduce`, and so on.

Here’s an example how to use `@supercharge/collections`:

```js
import { Collect } from '@supercharge/collections'

await Collect([ 1, 2, 3, 4, 5 ])
  .map(async id => {
    return await User.findById(id)
  })
  .filter(async user => {
    return await user.notSubscribedToNewsletter()
  })
  .forEach(user => {
    await user.subscribe()
  })
```


### Documentation
We added a dedicated and [extensive docs section for collections](https://superchargejs.com/docs/collections). Sweet!


Enjoy working with collections!
