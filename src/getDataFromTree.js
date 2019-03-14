import * as React from 'react';
import * as PropTypes from 'prop-types';
import RenderPromises from './RenderPromises';

function makeDefaultQueryInfo() {
  return {
    seen: false,
    observable: null,
  };
}

export default function getDataFromTree(tree, context = {}) {
  return getMarkupFromTree({
    tree,
    context,
    // If you need to configure this renderFunction, call getMarkupFromTree
    // directly instead of getDataFromTree.
    renderFunction: require("react-dom/server").renderToStaticMarkup,
  });
}

export function getMarkupFromTree({
  tree,
  context = {},
  // The rendering function is configurable! We use renderToStaticMarkup as
  // the default, because it's a little less expensive than renderToString,
  // and legacy usage of getDataFromTree ignores the return value anyway.
  renderFunction = require("react-dom/server").renderToStaticMarkup,
}) {
  const renderPromises = new RenderPromises();

  function process() {
    const html = renderFunction(React.cloneElement(tree, {
      renderPromises,
    }));

    return renderPromises.hasPromises()
      ? renderPromises.consumeAndAwaitPromises().then(process)
      : html;
  }

  return Promise.resolve().then(process);
}
