import fieldsParser from './fieldsParser';

let component;
let data;

describe('fieldsParser', () => {
  test('parse data with normal values', () => {
    data = fieldsParser({
      sys: {
        id: 'testId',
        contentType: {
          sys: {
            id: 'testType'
          },
        },
      },
      fields: {
        test: 'test',
      },
    });

    expect(data).toEqual({
      id: 'testId',
      __typename: 'testType',
      test: 'test',
    });
  });

  test('parse data with empty sys entries', () => {
    data = fieldsParser({
      sys: {
        id: 'testId',
        contentType: {
          sys: {
            id: 'testType'
          },
        },
      },
      fields: {
        test: 'test',
        items: [
          {
            sys: 'something',
          },
          {
            sys: {
              id: 'somethingId',
              contentType: {
                sys: {
                  id: 'somethingContentTypeId',
                },
              },
            },
            fields: {
              test: 'test',
            },
          },
        ],
      },
    });

    expect(data).toEqual({
      id: 'testId',
      __typename: 'testType',
      test: 'test',
      items: [
        {
          id: 'somethingId',
          __typename: 'somethingContentTypeId',
          test: 'test',
        },
      ],
    });
  });
});
