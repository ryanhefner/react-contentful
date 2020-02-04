// TypeScript Version: 3.0

import { Component, Context, ReactNode } from 'react';
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

export interface ContentfulClientInterface extends ContentfulClientApi {
  cache: ContentfulCache;
  ssrMode: boolean;
  checkCache(requestKey: string): any;
}

export function ContentfulClient(options: ContentfulClientParams): ContentfulClientInterface;

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
  client: ContentfulClientInterface;
  locale?: string;
  renderPromises?: boolean;
}

export class ContentfulContext {}

/**
 * ContentfulProvider
 */

export interface ProviderProps {
  client: ContentfulClientInterface;
  children?: ReactNode;
  context?: ContentfulContext;
  locale?: string;
  renderPromises?: RenderPromises;
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
 * Query
 */

export type ParserHandler = (data: any, props: any) => any;

export interface QueryState {
  fetched: boolean;
  loading: boolean;
  data?: any;
  error?: any;
}

export interface QueryProps {
  contentType?: string;
  id?: string;
  include?: number;
  locale?: string;
  parser?: ParserHandler;
  query?: object;
  skip?: boolean;
  onError?: (state: QueryState) => void;
  onLoad?: (state: QueryState) => void;
  onRequest?: (state: QueryState) => void;
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
 * useContentful
 */

export interface HookQueryProps {
  contentType?: string;
  id?: string;
  include?: number;
  locale?: string;
  parser?: ParserHandler;
  query?: object;
  skip?: boolean;
}

export interface HookResponse {
  data?: object;
  error?: object;
  fetched: boolean;
  loading: boolean;
}

export function useContentful(props: HookQueryProps): HookResponse;

/**
 * withContentful
 */

export function withContentful(component: Component): Component;
