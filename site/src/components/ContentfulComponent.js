import React from 'react';
import { Query } from 'react-contentful';

const ContentfulComponent = (props) => (
  <Query contentType="Page">
    {(data, error, loading) => {
      if (loading) {
        return <p>Loading</p>;
      }

      if (error) {
        return <p>{error}</p>;
      }

      return <p>{JSON.stringify(data)}</p>;
    }}
  </Query>
);

export default ContentfulComponent;
