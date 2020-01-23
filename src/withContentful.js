import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { getDisplayName } from 'react-hoc-helpers';
import ContentfulContext from './ContentfulContext';

/**
 * A public higher-order component to access the imperative API
 */
function withContentful(Component) {
  const C = props => {
    const { wrappedComponentRef, ...remainingProps } = props;

    return (
      <ContentfulContext.Consumer>
        {context => {
          return (
            <Component
              {...remainingProps}
              contentful={context}
              ref={wrappedComponentRef}
            />
          );
        }}
      </ContentfulContext.Consumer>
    );
  };

  C.context = ContentfulContext;
  C.displayName = `withContentful(${getDisplayName(Component)})`;
  C.WrappedComponent = Component;

  return hoistStatics(C, Component);
}

export default withContentful;
