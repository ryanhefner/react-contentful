// TypeScript Version: 3.0

import { Component } from 'react';
import ContentfulContext from './ContentfulContext';

export type ParserHandler = (data: any, props: any) => any;

export interface QueryProps extends Component {
  contentful: ContentfulContext;
  parser: ParserHandler;
  id?: string;
  contentType?: string;
  locale?: string;
  query?: object;
}

declare class Query extends Component<QueryProps> {}

export default Query;
