import ContentfulCache from './ContentfulCache';
const { createClient } = require('contentful');
import invariant from 'invariant';
import omit from 'lomit';

export default (clientOptions) => {
  invariant(
    clientOptions.accessToken,
    'ContentfulClient not created because `accessToken` was not provided.'
  );

  invariant(
    clientOptions.space,
    'ContentfulClient not created because `space` was not provided.'
  );

  const client = (clientOptions.createClient || createClient)({
    ...omit(clientOptions, ['createClient']),
  });

  const cache = clientOptions.cache || new ContentfulCache();

  return {
    cache,
    ssrMode: clientOptions.ssrMode || false,
    ...client,
    checkCache: (requestKey) => {
      return cache.has(requestKey) && cache.read(requestKey);
    },
    getEntry: async (id, options) => {
      try {
        const requestKey = JSON.stringify({id, options});
        const cacheEntry = cache.has(requestKey) && cache.read(requestKey);

        if (cacheEntry) {
          return Promise.resolve(cacheEntry);
        }

        const request = client.getEntry(id, options);

        if (!clientOptions.ssrMode) {
          cache.write(requestKey, request);
        }

        const response = await request;
        cache.write(requestKey, response);

        return Promise.resolve(response);
      }
      catch (error) {
        return Promise.reject(error);
      }
    },
    getEntries: async (options) => {
      try {
        const requestKey = JSON.stringify(options);
        const cacheEntry = cache.has(requestKey) && cache.read(requestKey);

        if (cacheEntry) {
          return Promise.resolve(cacheEntry);
        }

        const request = client.getEntries(options);

        if (!clientOptions.ssrMode) {
          cache.write(requestKey, request);
        }

        const response = await request;
        cache.write(requestKey, response);

        return Promise.resolve(response);
      }
      catch (error) {
        return Promise.reject(error);
      }
    },
  };
};
