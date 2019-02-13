import React from 'react';
import { Query } from 'react-contentful';

const ItemGenerator = (props) => {
  const {
    contentType,
    page,
    ItemComponent,
  } = props;

  return (
    <Query
      contentType={contentType}
      query={}
      component={ModularPage}
    />
  );
}

export default ItemGenerator;
