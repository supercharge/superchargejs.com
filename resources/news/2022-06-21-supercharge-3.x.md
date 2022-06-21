---
author: Marcus Pöhls
publishedAt: 2022-06-21
tags: [release, framework]
title: Supercharge 3.0 Released
---

This week we shipped Supercharge 3.0 🥳 it’s an exciting chapter bringing you the newest framework additions and a completely new session package.

Supercharge 3 new ships a new [session](/docs/session) package. HTTP sessions allow you to keep a state across requests and remember information for users.


### Sessions
The Supercharge 3.x release line ships with a new `@supercharge/session` package. We added sessions to the application boilerplate. You’ll have sessions configured when creating a new Supercharge application.

You can add HTTP sessions to your existing application. First, install the package as a project dependency:

```bash
npm i @supercharge/session
```

Then change the following files and add the given content:

`app/http/kernel.ts`

```ts
import { StartSessionMiddleware as StartSession } from '@supercharge/session'

export class HttpKernel extends Kernel {
  override middleware (): Array<MiddlewareCtor | Class> {
    return [
      StartSession,
    ]
  }
}
```

`bootstrap/providers.ts`

```ts
import { SessionServiceProvider } from '@supercharge/session'

export const providers: ServiceProviderCtor[] = [
  …
  SessionServiceProvider,
]
```

The last step is to add the `config/session.ts` file. Please create that file in your project and copy and paste [the content from the config file on GitHub](https://github.com/supercharge/supercharge/blob/develop/config/session.ts).


### Extended HTTP Request and Response
We extended the `Request` and `Response` classes within the `@supercharge/http` package. Both classes now extend the `InteractsWithState` mixin. Interacting with the state from requests and responses allows you to share information to a central store from both instances.

We also made the HTTP `Request` class macroable. This let’s you extend a `request` instance with your custom method. Here’s an example how the `@supercharge/session` package decorates the `request.session()` method:

```ts
import { ServiceProvider } from '@supercharge/support'
import { HttpRequest, Session } from '@supercharge/contracts'
import { StartSessionMiddleware } from './middleware/start-session'

export class SessionServiceProvider extends ServiceProvider {
  /**
   * Boot application services.
   */
  override async boot (): Promise<void> {
    this.registerRequestMacro()
  }

  /**
   * Register the `request.session()` macro function to the request constructor.
   */
  private registerRequestMacro (): void {
    const Request = this.app().make<HttpRequest>('request')
    const session = this.app().make<SessionManager>('session')

    Request.macro('session', function (this: HttpRequest) {
      return session.createFrom(this.ctx())
    })
  }
}
```


### New Config Methods
We extended the `@supercharge/config` package and added the following methods:

- `isEmpty(key)`: determine whether the config store contains an item for the given `key` with is empty
- `isNotEmpty(key)`: determine whether the config store contains an item for the given `key` with is not empty
- `ensureNotEmpty(key)`: throws an error if the config store contains an item for the given key which has an empty value


### Visibility Changes in the Manager
The `Manager` class from the `@supercharge/manager` package now uses `protected` method visibilities to allow access from parent classes. Previously, we used the `private` visibility but that constraint isn’t flexible when extending the `Manager` base class.


### Breaking Changes and Upgrade Guide v2 to v3
We needed to introduce some breaking changes for the v3 release. Here’s a comprehensive overview of breaking changes.


#### Node.js v16 Required
Supercharge v3 requires Node.js 16. You may check out the [docs on system requirements](https://superchargejs.com/docs/3.x/installation#system-requirements) to find more information on how to upgrade the installed Node.js version.


#### HTTP State Bag
Tba.
