import warning from 'warning';

/**
 * Generate string to use as a cache key based on query props.
 * 
 * @param {*} props 
 * @return string
 */
export const generateCacheKey = (props = {}) => {
  const {
    contentful,
    contentType,
    id,
    include,
    locale,
    query,
  } = props;

  const contextLocale = contentful && contentful.locale;
  const requestLocale = locale || contextLocale;

  if (id) {
    return JSON.stringify({id, options: {
      locale: requestLocale,
      include,
      ...query
    }});
  }

  return JSON.stringify({
    content_type: contentType,
    locale: requestLocale,
    include,
    ...query
  });
};

/**
 * Check the Contentful Client cache to see if results exists for generated cache key.
 * 
 * @param {*} props 
 * @return Object
 */
export const checkCache = (props = {}) => {
  const {
    contentful,
    parser,
  } = props;

  if (!contentful) {
    return null;
  }

  if (!contentful.client) {
    return null;
  }

  const cacheKey = generateCacheKey(props);
  const cache = contentful.client.checkCache(cacheKey);

  return cache
    ? parser(cache, props)
    : null;
};

/**
 * Validate that the props passed contain all required props for request.
 * 
 * @param {*} props 
 * @return Promise<boolean>
 */
export const validateRequestRequirements = async (props = {}) => {
  return new Promise((resolve, reject) => {
    const {
      id,
      contentType,
      contentful,
      include,
      locale,
      parser,
      query,
    } = props;

    // Check for contentful context
    warning(contentful, 'No contentful context passed to <Query />');

    if (!contentful) {
      return reject('No contentful context passed to <Query />');
    }

    const {
      client,
      locale: contextLocale,
    } = contentful;

    // Check to make sure a client is available
    warning(client, 'ContentfulClient not available via context on <Query />');

    if (!client) {
      return reject('ContentfulClient not available via context on <Query />');
    }

    const hasQuery = !!(id || contentType || query === {});

    // Check to make sure queryable props have been set
    warning(hasQuery, 'Query props not set on <Query />');

    if (!hasQuery) {
      return reject('Query props not set on <Query />');
    }

    return resolve(true);
  });
}

/**
 * Fetch Contentful data.
 * 
 * @param {*} props 
 * @return Promise
 */
export const fetchData = async (props = {}) => {
  // @todo Only do this if renderPromises set? - RH
  if (props.skip) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const {
      contentful,
      contentType,
      id,
      include,
      locale,
      query,
    } = props;

    validateRequestRequirements(props)
      .then(() => {
        const {
          client,
          locale: contextLocale,
          renderPromises,
        } = contentful;

        const requestLocale = locale || contextLocale;

        const request = id
          ? client.getEntry(id, {
              locale: requestLocale,
              include,
              ...query
            })
          : client.getEntries({
              'content_type': contentType,
              locale: requestLocale,
              include,
              ...query
            });

        if (renderPromises) {
          renderPromises.registerSSRObservable({
            fetchData: () => fetchData(props),
            props,
          }, request);
        }

        return request;
      })
      .then(resolve)
      .catch(reject);
  });
}
