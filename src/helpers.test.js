import { checkCache, generateCacheKey, validateRequestRequirements } from "./helpers";

describe('helpers', () => {
  test('generateCacheKey', () => {
    const key = generateCacheKey({ id: '1', locale: 'en-us', include: 10 });
    expect(key).toBe("{\"id\":\"1\",\"options\":{\"locale\":\"en-us\",\"include\":10}}");
  });

  test('checkCache - empty', () => {
    const cache = checkCache({ id: '1', locale: 'en-us', include: 10 });
    expect(cache).toBe(null);
  });

  test('checkCache - no client', () => {
    const cache = checkCache();
    expect(cache).toBe(null);
  });

  test('checkCache - no context', () => {
    const cache = checkCache();
    expect(cache).toBe(null);
  });

  test('validateRequestRequirements', () => {

  });

  test('fetchData', () => {

  });
});
