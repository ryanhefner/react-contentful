import React from 'react';
import * as Components from './ContentfulComponents';

const ComponentRenderer = (props) => {
  const {
    data,
  } = props;

  return data.map((component, index) => {
    const Component = Components[component.sys.contentType.sys.id];

    if (!Component) {
      return null;
    }

    return (
      <Component
        key={`component-${component.sys.id}-${index}`}
        {...component.fields}
      />
    );
  })
  .filter(component => component !== null);
};

export default ComponentRenderer;
