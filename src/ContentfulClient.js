const contentful = require('contentful');
import invariant from 'invariant';
import lomit from 'lomit';

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
    ...lomit(options, ['preview']),
    host: options.preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  });
};
