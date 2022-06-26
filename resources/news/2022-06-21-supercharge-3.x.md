---
author: Marcus Pöhls
publishedAt: 2022-06-21
tags: [release, framework]
title: Supercharge 3.0 Released
---

This week we shipped Supercharge 3.0 🥳 it’s an exciting chapter bringing you the newest framework additions and a completely new session package.

Supercharge 3 new ships a new [session package](/docs/session). HTTP sessions allow you to keep a state across requests and remember information for users.


### Sessions
The Supercharge 3.x release line ships with a new `@supercharge/session` package. You may check out the [session docs](/docs/session) for more details.

#### All New Supercharge Projects Ship With Session Support
We added sessions to the application boilerplate. You’ll have sessions configured when creating a new Supercharge application.


#### Adding Sessions to your Existing Supercharge Project
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


### HTTP State Bag
Supercharge v3 changed the way you’re sharing state across controller and middleware along the request lifecycle. The shared state in v2 could be anything, like an object, or a string, or an array.

This changed in v3 where the state is always an object. We also introduced a state bag to interact with the shared state. The state bag provides methods like `get`, `set`, `has`, `remove`, `all`, `clear`.

**Supercharge v2**

```ts
// setting values
request.state().userId = 'user-identifier'

// getting values
request.state().userId
// 'user-identifier'
```

**Supercharge v3**

```ts
// setting values
request.state().set('userId', 'user-identifier')

// getting values
request.state().get('userId')
// 'user-identifier'
```

Please find more details in the [HTTP docs on sharing state](/docs/requests).


### Extended HTTP Request and Response
We extended the `Request` and `Response` classes within the `@supercharge/http` package.


#### Sharing State
Both classes now extend the `InteractsWithState` mixin. Interacting with the state from requests and responses allows you to share information to a central store from both instances:

```ts
import { HttpContext } from '@supercharge/contracts'

class SignupController {
  /**
   * Handle the given request.
   */
  async handle({ request, response }: HttpContext): Promise<void> {
    // share information along the request lifecycle
    request.state().set('userId', 'user-identifier')

    // works as well and you‘re writing to the same session store as the request
    response.state().set('name', 'Supercharge')
  }
}
```


#### Macroable Requests
We also made the HTTP `Request` class macroable. This let’s you extend a `request` instance with your custom method. Here’s an example how the `@supercharge/session` package decorates the `request.session()` method:

```ts
import { ServiceProvider } from '@supercharge/support'
import { HttpRequest, Session } from '@supercharge/contracts'
import { StartSessionMiddleware } from './middleware/start-session'

export class SessionServiceProvider extends ServiceProvider {
  /**
   * Register the `request.session()` macro function to the request constructor.
   */
  override async boot (): Promise<void> {
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

Find more details in the [config docs](/docs/configuration).


### Visibility Changes in the Manager
The `Manager` class from the `@supercharge/manager` package now uses `protected` method visibilities to allow access from parent classes. Previously, we used the `private` visibility but that constraint isn’t flexible when extending the `Manager` base class.


### Breaking Changes and Upgrade Guide v2 to v3
We needed to introduce some breaking changes for the v3 release. Here’s a comprehensive overview of breaking changes.


#### Node.js v16 Required
Supercharge v3 requires Node.js 16. You may check out the [docs on system requirements](https://superchargejs.com/docs/3.x/installation#system-requirements) to find more information on how to upgrade the installed Node.js version.


#### Shutdown Method in Service Providers
Starting with the v3 release you can implement an `async shutdown()` method in your `ServiceProvider` instances. The `shutdown` method will be called by the application instance when receiving a `SIGINT` or `SIGTERM` signal. Both signals are usually emitted when using CTRL+C in your terminal to stop a process.

Here’s a sample service provider using the `shutdown` method to stop a database connection:

```ts
import { ServiceProvider } from '@supercharge/support'

export class MongodbServiceProvider extends ServiceProvider implements ServiceProviderContract {
  /**
   * Register MongoDB services into the container.
   */
  override register (): void {
    this.app().singleton('mongodb', () => {
      // …
    })
  }

  /**
   * Stop MongoDB connections.
   */
  override async shutdown (): Promise<void> {
    await this.app().make('mongodb').disconnect()
  }
}
```

Find more details in the [service provider docs](/docs/service-providers#the-shutdown-method).


#### Container Aliases
The Supercharge service container supports binding aliases starting in v3. Binding aliases describe alternative keys pointing to a binding.

Here’s an example used in the framework. The Supercharge HTTP server uses the `server` binding. To be more specific what server instance will be resolved, we added the `http.server` alias for the `server` binding. Here’s the code used in the HTTP service provider:

```ts
this.app()
  .singleton('server', () => new Server(this.app()))
  .alias('server', 'http.server')

const server = app.make('http.server')
// resolves the HTTP server instance
```

Find more details in the [service container docs](/docs/service-container).
