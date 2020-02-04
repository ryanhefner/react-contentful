import React from 'react';
import { useContentful } from 'react-contentful';
import ComponentRenderer from '../components/ComponentRenderer';
import { pageParser } from '../parsers';

const HookPage = (props) => {
  const { loading, data, error } = useContentful({
    contentType: 'Page',
    parser: pageParser,
    query: {
      'fields.slug[in]': '/'
    }
  });

  if ((!data && !error) || loading) {
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    return <p>Page does not exist.</p>;
  }

  return (
    <article className="App-page">
      <ComponentRenderer {...props} data={data.components} />
    </article>
  );
};

export default HookPage;
