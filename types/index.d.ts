// TypeScript Version: 3.0

import { Component, Context } from 'react';
import {
  ContentfulClientApi as ContentfulClientApiContentful,
  Entry,
  EntryCollection,
} from 'contentful';

/**
 * ContentfulCache
 */

export interface ContentfulCacheProps {
  [key: string]: any;
}

export class ContentfulCache {
  constructor(cache: ContentfulCacheProps);

  clear(): ContentfulCache;
  extract(): ContentfulCache;
  has(key: string): boolean;
  read(key: string): any;
  restore(cache: ContentfulCache | string | null): ContentfulCache;
  write(key: string, value: any): ContentfulCache;
}

/**
 * ContentfulClient
 */

export interface ContentfulClientParams {
  accessToken: string;
  space: string;
  cache?: ContentfulCache;
  ssrMode?: boolean;
}

export interface ContentfulClient {
  cache: ContentfulCache;
  ssrMode: boolean;
  checkCache(requestKey: string): any;
  getEntry(id: string, options?: any): Promise<Entry<{}>>;
  getEntries(options?: any): Promise<EntryCollection<{}>>;
}

export function ContentfulClient(options: ContentfulClientParams): ContentfulClient;

/**
 * ContentfulContext
 */

export interface ContextProps<T = any> {
  client: T;
}

export interface AnyContextProps extends ContextProps {
  [extraProps: string]: any;
}

export interface ContentfulContext<A extends ContextProps = AnyContextProps> {
  client: ContentfulClient;
  locale?: string;
  renderPromises?: boolean;
}

export class ContentfulContext {}

/**
 * ContentfulProvider
 */

export interface ProviderProps {
  client: ContentfulClient;
  context: ContentfulContext;
  locale: string;
  renderPromises?: boolean;
}

export class ContentfulProvider extends Component<ProviderProps> {}

/**
 * getDataFromTree
 */

export interface defaultQueryInfo {
  seen: boolean;
  observerable: null;
}

export function makeDefaultQueryInfo(): defaultQueryInfo;

export function getDataFromTree(tree: any, context: any): any;

export function getMarkupFromTree(tree: any, context: any, renderFunction: () => void): Promise<any>;

/**
 * hoc-utils
 */

export function getDisplayName(WrappedComponent: Component): string;

/**
 * Query
 */

export type ParserHandler = (data: any, props: any) => any;

export interface QueryProps extends Component {
  contentful: ContentfulContext;
  parser: ParserHandler;
  id?: string;
  contentType?: string;
  locale?: string;
  query?: object;
}

export class Query extends Component<QueryProps> {}

/**
 * RenderPromises
 */

export interface QueryInfo {
  seen: boolean;
  observable: Promise<any> | null;
}

export interface QueryMap {
  [key: string]: any;
}

export class RenderPromises {
  queryPromises: QueryMap;
  queryInfoTrie: QueryMap;
  registerSSRObservable(queryInstance: Component, observable: Promise<any>): void;
  getSSRObservable(queryInstance: Component): Promise<any>;
  addQueryPromise(queryInstance: Component, finish: () => void): any;
  hasPromises(): boolean;
  consumeAndAwait(): Promise<any>;
  lookupQueryInfo(queryInstance: Component): QueryInfo;
}

/**
 * withContentful
 */

export function withContentful(component: Component): Component;
