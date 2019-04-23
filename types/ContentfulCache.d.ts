// TypeScript Version: 3.0

export interface CacheMapMapObject {
  [key: string]: any;
}

export default class ContentfulCache {
  constructor(cache: CacheMapMapObject);

  clear(): ContentfulCache;
  extract(): CacheMapMapObject;
  has(key: string): boolean;
  read(key: string): any;
  restore(cache: CacheMapMapObject | string | null): ContentfulCache;
  write(key: string, value: any): ContentfulCache;
}
