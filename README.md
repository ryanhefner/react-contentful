# 📰 react-contentful

[![npm version](https://badge.fury.io/js/react-contentful.svg)](https://badge.fury.io/js/react-contentful)
[![npm](https://img.shields.io/npm/l/express.svg)](LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/ryanhefner/react-contentful/badge.svg?branch=master)](https://coveralls.io/github/ryanhefner/react-contentful?branch=master)
[![CircleCI](https://circleci.com/gh/ryanhefner/react-contentful.svg?style=shield)](https://circleci.com/gh/ryanhefner/react-contentful)
[![Greenkeeper badge](https://badges.greenkeeper.io/ryanhefner/react-contentful.svg)](https://greenkeeper.io/)

A React component library that makes it super simple to compose Contentful
content into your sites and applications.

## Install

Via [npm](https://npmjs.com/package/react-contentful)

```sh
npm install react-contentful
```

Via [Yarn](http://yarn.fyi/react-contentful)

```sh
yarn add react-contentful
```

## How to use

The `ContentfulProvider` provides the global context to your site or applications
connection to Contentful. By using either the `Query` component, or writing
your own Contentful client consumer component that provides access to the
`ContentfulClient` directly by using `withContentful`, all queries can be performed
in Contentful that are available through their existing Javascript SDK.

### `ContentfulProvider`

```js
import React from 'react';
import { ContentfulClient, ContentfulProvider } from 'react-contentful';
import Page from './Page';  // @see Page component defined in `Query` example below

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

### `Query`

In this example, the `Query` component that creates a `query` parameter that
filters `Page` content types from Contentful based on the `slug` field set on
published `Page` content models.

```js
import React from 'react';
import { Query } from 'react-contentful';

const Page = (props) => (
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

### Examples

_Coming soon_

### Components

_Coming soon_

## License

[MIT](LICENSE) © [Ryan Hefner](https://www.ryanhefner.com)
