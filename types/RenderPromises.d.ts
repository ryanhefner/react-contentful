// TypeScript Version: 3.0

import { Component } from 'react';

interface QueryInfo {
  seen: boolean;
  observable: Promise<any> | null;
}

interface QueryMap {
  [key: string]: any;
}

declare class RenderPromises {
  queryPromises: QueryMap;
  queryInfoTrie: QueryMap;
  registerSSRObservable(queryInstance: Component, observable: Promise<any>): void;
  getSSRObservable(queryInstance: Component): Promise<any>;
  addQueryPromise(queryInstance: Component, finish: () => void): any;
  hasPromises(): boolean;
  consumeAndAwait(): Promise<any>;
  lookupQueryInfo(queryInstance: Component): QueryInfo;
}

export default RenderPromises;
