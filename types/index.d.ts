// TypeScript Version: 3.0

import { Component, Context } from 'react';
import {
  Asset,
  AssetCollection,
  ContentType,
  ContentTypeCollection,
  CreateClientParams,
  ContentfulClientApi,
  Entry,
  EntryCollection,
  LocaleCollection,
  Space,
  SyncCollection,
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

export interface ContentfulClientParams extends CreateClientParams {
  cache?: ContentfulCache;
  ssrMode?: boolean;
}

export class ContentfulClient implements ContentfulClientApi {
  cache: ContentfulCache;
  ssrMode: boolean;
  checkCache(requestKey: string): any;
  getAsset(id: string, query?: any): Promise<Asset>;
  getAssets(query?: any): Promise<AssetCollection>;
  getContentType(id: string): Promise<ContentType>;
  getContentTypes(query?: any): Promise<ContentTypeCollection>;
  getEntry(id: string, query?: any): Promise<Entry<any>>;
  getEntries(query?: any): Promise<EntryCollection<any>>;
  getLocales(): Promise<LocaleCollection>;
  getSpace(): Promise<Space>;
  sync(query: any): Promise<SyncCollection>;
}

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
  context?: ContentfulContext;
  locale?: string;
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

export interface QueryProps {
  parser?: ParserHandler;
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
