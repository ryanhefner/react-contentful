export interface defaultQueryInfo {
  seen: boolean;
  observerable: null;
}

export function makeDefaultQueryInfo(): defaultQueryInfo;

export default function getDataFromTree(tree: any, context: any): any;

export function getMarkupFromTree(tree: any, context: any, renderFunction: () => void): Promise<any>;
