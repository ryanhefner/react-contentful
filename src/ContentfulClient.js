const contentful = require('contentful');
import invariant from 'invariant';

export default (options) => {
  invariant(
    options.accessToken,
    'ContentfulClient not created because `accessToken` was not provided.'
  );

  invariant(
    options.space,
    'ContentfulClient not created because `space` was not provided.'
  );

  return contentful.createClient({
    ...options,
  });
};
