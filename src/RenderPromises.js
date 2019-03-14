function makeDefaultQueryInfo() {
  return {
    seen: false,
    observable: null,
  };
}

export default class RenderPromises {
  // Map from Query component instances to pending fetchData promises.
  queryPromises = new Map();

  // Two-layered map from (query document, stringified variables) to QueryInfo
  // objects. These QueryInfo objects are intended to survive through the whole
  // getMarkupFromTree process, whereas specific Query instances do not survive
  // beyond a single call to renderToStaticMarkup.
  queryInfoTrie = new Map();

  // Registers the server side rendered observable.
  registerSSRObservable(queryInstance, observable) {
    this.lookupQueryInfo(queryInstance).observable = observable;
  }

  // Get's the cached observable that matches the SSR Query instances query and variables.
  getSSRObservable(queryInstance) {
    return this.lookupQueryInfo(queryInstance).observable;
  }

  addQueryPromise(queryInstance, finish) {
    const info = this.lookupQueryInfo(queryInstance);
    if (!info.seen) {
      this.queryPromises.set(
        queryInstance,
        new Promise(resolve => {
          resolve(queryInstance.fetchData());
        }),
      );
      // Render null to abandon this subtree for this rendering, so that we
      // can wait for the data to arrive.
      return null;
    }
    return finish();
  }

  hasPromises() {
    return this.queryPromises.size > 0;
  }

  consumeAndAwaitPromises() {
    const promises = [];

    this.queryPromises.forEach((promise, queryInstance) => {
      // Make sure we never try to call fetchData for this query document and
      // these variables again. Since the queryInstance objects change with
      // every rendering, deduplicating them by query and variables is the
      // best we can do. If a different Query component happens to have the
      // same query document and variables, it will be immediately rendered
      // by calling finish() in addQueryPromise, which could result in the
      // rendering of an unwanted loading state, but that's not nearly as bad
      // as getting stuck in an infinite rendering loop because we kept calling
      // queryInstance.fetchData for the same Query component indefinitely.
      this.lookupQueryInfo(queryInstance).seen = true;
      promises.push(promise);
    });
    this.queryPromises.clear();

    return Promise.all(promises);
  }

  lookupQueryInfo(queryInstance) {
    const { queryInfoTrie } = this;
    const {
      contentType,
      id,
      include,
      locale,
      query,
    } = queryInstance.props;

    const queryObject = {
      contentType,
      id,
      include,
      locale,
      query,
    };

    const varMap = queryInfoTrie.get(JSON.stringify(queryObject)) || new Map();

    if (!queryInfoTrie.has(JSON.stringify(queryObject))) {
      queryInfoTrie.set(JSON.stringify(queryObject), varMap);
    }

    // @todo Can probably remove this check and simplify things. - Ryan
    const variablesString = JSON.stringify({
      contentType,
      id,
      include,
      locale,
      query,
    });
    const info = varMap.get(variablesString) || makeDefaultQueryInfo();

    if (!varMap.has(variablesString)) varMap.set(variablesString, info);

    return info;
  }
}
