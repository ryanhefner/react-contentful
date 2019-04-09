const Flatted = require('flatted/cjs');

export default class ContentfulCache {
  constructor(cache) {
    this.cache = new Map(cache);
  }

  clear() {
    this.cache.clear();

    return this;
  }

  extract() {
    return Array.from(this.cache.entries());
  }

  has(key) {
    return this.cache.has(key);
  }

  read(key) {
    return this.cache.get(key);
  }

  restore(cache) {
    if (!cache) {
      return this;
    }

    if (typeof cache === 'string') {
      const data = Flatted.parse(cache);

      if (Symbol.iterator in Object(data)) {
        this.cache = new Map(data);
      }
    }
    else if (Array.isArray(cache)) {
      this.cache = new Map(cache);
    }

    return this;
  }

  write(key, value) {
    this.cache.set(key, value);

    return this;
  }
}
