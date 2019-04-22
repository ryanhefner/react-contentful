// TypeScript Version: 3.0

import {
  ContentfulClientApi as ContentfulClientApiContentful,
  Entry,
  EntryCollection
} from 'contentful';
import ContentfulCache from './ContentfulCache';

export interface ContentfulClientParams {
  accessToken: string;
  space: string;
  cache?: ContentfulCache;
  ssrMode?: boolean;
}

export interface ContentfulClientApi {
  cache: ContentfulCache;
  ssrMode: boolean;
  checkCache(requestKey: string): any;
  getEntry(id: string, options?: any): Promise<Entry<{}>>;
  getEntries(options?: any): Promise<EntryCollection<{}>>;
}

export default function ContentfulClient(options: ContentfulClientParams): ContentfulClientApi;
