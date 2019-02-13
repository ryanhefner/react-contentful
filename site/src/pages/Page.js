import React from 'react';
import { Query } from 'react-contentful';
import ComponentRenderer from '../components/ComponentRenderer';
import { pageParser } from '../parsers';

const Page = (props) => (
  <Query
    contentType="Page"
    parser={pageParser}
    query={{'fields.slug[in]': `/${props.directory || ''}${props.match.slug || ''}`}}
   >
    {({data, error, loading}) => {
      console.debug(props);

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
    }}
  </Query>
);

export default Page;
