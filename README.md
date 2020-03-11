# 📰 react-contentful

[![npm](https://img.shields.io/npm/v/react-contentful?style=flat-square)](https://github.com/ryanhefner/react-contentful)
[![NPM](https://img.shields.io/npm/l/react-contentful?style=flat-square)](LICENSE)
[![npm](https://img.shields.io/npm/dt/react-contentful?style=flat-square)](https://www.npmjs.com/package/react-contentful)
![Coveralls github](https://img.shields.io/coveralls/github/ryanhefner/react-contentful?style=flat-square)
![CircleCI](https://img.shields.io/circleci/build/github/ryanhefner/react-contentful?style=flat-square)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/ryanhefner/react-contentful?style=flat-square)


A React component library that makes it super simple to compose Contentful
content into your sites and applications.


## Install

Via [npm](https://npmjs.com/package/react-contentful)

```sh
npm install react-contentful
```

Via [Yarn](https://yarn.pm/react-contentful)

```sh
yarn add react-contentful
```


## How to use

The `ContentfulProvider` can provide a global context to your site or applications
allowing you to connect to your Contentful content. By using either the `Query`
component, or writing your own Contentful client consumer component which offers
access to the `ContentfulClient` directly by using `withContentful`, all queries
can be performed against Contentful that are available through their existing
Javascript SDK.


### `ContentfulProvider`

```js
import React from 'react';
import { ContentfulClient, ContentfulProvider } from 'react-contentful';
import Page from './Page';  // @see Page component defined in `useContentful` or `Query` examples below

const contentfulClient = new ContentfulClient({
  accessToken: '[Your Contentful Content Delivery API - access token]',
  space: '[Your Contentful Space ID]',
});

const App = () => (
  <ContentfulProvider client={contentfulClient}>
    <Router>
      <Switch>
        <Route path="/:slug*" component={Page} />
      </Switch>
    </Router>
  </ContentfulProvider>
);

export default App;
```


### `useContentful` - React Hook

In this example, we are using the `useContentful` hook that accepts query params
that can be used to directly query Contentul and supply the results in the `data`
object returned.

```js
import React from 'react';
import { useContentful } from 'react-contentful';

const Page = props => {
  const { data, error, fetched, loading } = useContentful({
    contentType: 'Page',
    query: {
      'fields.slug[in]': `/${props.match.slug || ''}`,
    }
  });

  if (loading || !fetched) {
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    return <p>Page does not exist.</p>;
  }

  // See the Contentful query response
  console.debug(data);

  // Process and pass in the loaded `data` necessary for your page or child components.
  return (
    ...
  );
}
```

### `Query`

In this example, the `Query` component accepts a `query` parameter that
filters `Page` content types from Contentful based on the `slug` field set on
published `Page` content models.


```js
import React from 'react';
import { Query } from 'react-contentful';

const Page = props => (
  <Query
    contentType="Page"
    query={{
      'fields.slug[in]': `/${props.match.slug || ''}`,
    }}
  >
    {({data, error, fetched, loading}) => {
      if (loading || !fetched) {
        return null;
      }

      if (error) {
        console.error(error);
        return null;
      }

      if (!data) {
        return <p>Page does not exist.</p>;
      }

      // See the Contentful query response
      console.debug(data);

      // Process and pass in the loaded `data` necessary for your page or child components.
      return (
        ...
      );
    }}
  </Query>
);

export default Page;
```


## Components Reference

Below are the following components and classes that are availabe in this package
that makes it easy to integrate Contentful into your site or application.


### `ContentfulProvider`

Provider that offers accesss to a centralized `ContentfulClient` that not only
can make all your Contentful requests, but also handles caching those requests
during your session to keep things optimized and fast.


| Prop             | Default | Description                                                                                                                                                            |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client`         | `null`  | Required for children that utilize `withContentful` to make requests to Contentful.                                                                                    |
| `locale`         | `en-US` | Default `locale` to use for requests against the Contentful API.                                                                                                       |
| `renderPromises` | `null`  | Not used during normal use, but utilized by other libraries like [`next-contentful`](https://github.com/ryanhefner/next-contentful) for use during server-side rendering. |


### `ContentfulClient`

Instance of Contentful client that is for making requests and caching responses.


| Options       | Default                 | Description                                                                                                                      |
| ------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `space`       | `null`                  | ID of the Contentful space that queries will be submitted to.                                                                    |
| `accessToken` | `null`                  | Access token used for client initialization.                                                                                     |
| `environment` | `master`                | Contentful environment to make requests to.                                                                                      |                                                                          |
| `host`        | `cdn.contentful.com`    | Host to use for requests. Accepts either, `cdn.contentful.com` or `preview.contentful.com`.                                      |
| `cache`       | `new ContentfulCache()` | Cache used for caching responses during a session, as well as rehydrating the client/app when used during server-side rendering. |
| `ssrMode`     | `false`                 | Flag to specify when client is being used during server-side rendering.                                                          |


> The `ContentfulClient` is an extension of the Contentful Delivery API SDK. For more information about what options are available when creating a client, along with other useful insights, check out the [Official Contentful documentation](https://contentful.github.io/contentful.js/contentful/7.8.2/contentful.html#.createClient).


### `ContentfulCache`

Cache instance used for caching responses in memory during a session, along with
building up a cache of responses for responses used to render/rehydrate the app
when used during server-side rendering. You would typically not have to work with
this class directly, unless you are rolling your own server-side rendering solution
or have some ideas around warming the cache. Otherwise, you should check out
[`next-contentful`](https://github.com/ryanhefner/next-contentful) if you’re working
on a React/Node/Express app.


| Arguments | Default | Description                                        |
| --------- | ------- | -------------------------------------------------- |
| `cache`   | `null`  | Initializes a new `Map` instance to use for cache. |


### `useContentful`

Based on the previous `Query` component, `useContentful` accepts the following options to generate your Contentful queries.

| Props         | Default                                     | Description |
| ------------- | ------------------------------------------- | ----------- |
| `contentType` | `null`                                      | Content type associated with the content model that you are querying for within Contentful. Required for non-`id` queries. Results in an array of results returned. |
| `id`          | `null`                                      | Entry id associated with the content model in Contentful. Returns a single data model from Contentful if it exists. |
| `include`     | `10`                                        | Depth of referenced content to include in the query. Defaults to `10`. |
| `query`       | `null`                                      | Query object used for defining the search parameters to use for the request. You can reference all available options via [Contentful official documentation](https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters) |
| `parser`      | `(data, props) => data`                     | Parser to use for manipulating the response data before being pass to the children/returned via callbacks. |
| `skip`        | `false`                                     | Flag used to skip the `Query` instance when being referenced during server-side rendering. |


### `Query`

This is where the magic happens. You can compose `Query` wherever you need to
reference or conditionally render content based on Contentful data. `Query`s can
be used standalone, or to wrap content that is reliant on the data.


| Props         | Default                                     | Description |
| ------------- | ------------------------------------------- | ----------- |
| `contentType` | `null`                                      | Content type associated with the content model that you are querying for within Contentful. Required for non-`id` queries. Results in an array of results returned. |
| `id`          | `null`                                      | Entry id associated with the content model in Contentful. Returns a single data model from Contentful if it exists. |
| `include`     | `10`                                        | Depth of referenced content to include in the query. Defaults to `10`. |
| `query`       | `null`                                      | Query object used for defining the search parameters to use for the request. You can reference all available options via [Contentful official documentation](https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters) |
| `parser`      | `(data, props) => data`                     | Parser to use for manipulating the response data before being pass to the children/returned via callbacks. |
| `skip`        | `false`                                     | Flag used to skip the `Query` instance when being referenced during server-side rendering. |
| `onError`     | `({ data, error, fetched, loading }) => {}` | Callback for when an error is encountered during the request. `fetched` will be set to `true` and `error` will be set. |
| `onLoad`      | `({ data, error, fetched, loading }) => {}` | Callback for when the response has completed. `fetched` will be set to `true` and `data` will be set. |
| `onRequest`   | `({ data, error, fetched, loading }) => {}` | Callback for when the request has been initiated. `loading` will be set to `true` and all other values will be `null` or `false`. |


### `withContentful`

Higher-order component that is available in case you want to build your own Contentful
ready components. Used by the `Query` component for providing access to the `ContentfulContext`.


```js
import { withContentful } from 'react-contentful';

const YourComponent = ({ contentful }) => {
  const { client, locale, renderPromises } = contentful;

  return (
    ...
  );
};

export default withContentful(YourComponent);
````


## Using Next.js?

If you like what you see above, you might like [next-contentful](https://github.com/ryanhefner/next-contentful),
which lets you easily add `react-contentful` to your Next.js app, making it easy
to ensure that all your `Query` instances render awesomely server-side.


## License

[MIT](LICENSE) © [Ryan Hefner](https://www.ryanhefner.com)
