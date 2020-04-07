import ContentfulClient from './ContentfulClient';

describe('<ContentfulClient />', () => {
  test('returns client', () => {
    const client = new ContentfulClient({
      accessToken: '23b20723ef0ffdc1f0e123e8fb76cffeacac8ec8b9199ed3e384cc37cf2256b7',
      space: 'nh6zyt31q7gz',
    });

    expect(client).toBeTruthy();
  });

  test('throws error when `space` not specified', () => {
    const t = () => {
      try {
        const client = new ContentfulClient({
          accessToken: '23b20723ef0ffdc1f0e123e8fb76cffeacac8ec8b9199ed3e384cc37cf2256b7',
        });
      }
      catch (error) {
        throw new TypeError();
      }
    };

    expect(t).toThrow(TypeError);
  });

  test('throws error when `accessToken` not specified', () => {
    const t = () => {
      try {
        const client = new ContentfulClient({
          space: 'nh6zyt31q7gz',
        });
      }
      catch (error) {
        throw new TypeError();
      }
    };

    expect(t).toThrow(TypeError);
  });
});
