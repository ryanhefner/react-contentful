import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ContentfulClient from './ContentfulClient';
import ContentfulProvider from './ContentfulProvider';
import Query from './Query';
import 'babel-polyfill';

Enzyme.configure({
  adapter: new Adapter(),
});

let contentfulClient;
let component;
let error;

const mockQueryRender = jest.fn(({data, error, loading}) => {
  if (!data) {
    return null;
  }

  return <p>{data.method}</p>;
});

global.console = {error: jest.fn()};

beforeAll(() => {
  jest.mock('./ContentfulClient');

  contentfulClient = new ContentfulClient({
    accessToken: '23b20723ef0ffdc1f0e123e8fb76cffeacac8ec8b9199ed3e384cc37cf2256b7',
    space: 'nh6zyt31q7gz',
  });
});

beforeEach(() => {
  if (error && jest.isMockFunction(error)) {
    error.mockClear();
  }
});

afterAll(() => {
  jest.unmock('./ContentfulClient');
});

describe('<Query />', () => {
  test('renders', () => {
    component = mount(
      <ContentfulProvider client={contentfulClient}>
        <Query />
      </ContentfulProvider>
    );
    expect(component).toBeTruthy();
    component.unmount();
  });

  test('error thrown when no context is provided', () => {
    error = jest.spyOn(global.console, 'error');
    component = mount(<Query />);
    expect(error).toBeCalled();
    component.unmount();
  });

  test('no error thrown when client and id provided', () => {
    error = jest.spyOn(global.console, 'error');
    component = mount(
      <ContentfulProvider client={contentfulClient}>
        <Query id="2pRBx2MrHYDQhq1ihCvb1V" />
      </ContentfulProvider>
    );
    expect(error).not.toHaveBeenCalled();
    component.unmount();
  });

  test('error thrown when client not provided', () => {
    error = jest.spyOn(global.console, 'error');
    component = mount(
      <ContentfulProvider>
        <Query />
      </ContentfulProvider>
    );
    expect(error).toBeCalled();
    component.unmount();
  });

  test('error thrown when no query props specified', () => {
    error = jest.spyOn(global.console, 'error');
    component = mount(
      <ContentfulProvider client={contentfulClient}>
        <Query />
      </ContentfulProvider>
    );
    expect(error).toBeCalled();
    component.unmount();
  });

  test('confirm children function is called', () => {
    component = mount((
      <ContentfulProvider client={contentfulClient}>
        <Query id="1">
          {mockQueryRender}
        </Query>
      </ContentfulProvider>
    ), {
      attachTo: document.getElementById('root'),
    });
    expect(mockQueryRender).toHaveBeenCalled();
    component.unmount();
  });

  // test('confirm getEntry is called when supplied an id', () => {

  // });

  // test('confirm getEntries is called when supplied a contentType and params', () => {

  // });

  // test('onRequest called when valid props supplied', () => {
  //   const onRequest = jest.fn();
  //   error = jest.spyOn(global.console, 'error');
  //   component = mount((
  //     <ContentfulProvider client={contentfulClient}>
  //       <Query
  //         id="1"
  //         onRequest={onRequest}
  //       />
  //     </ContentfulProvider>
  //   ), {
  //     attachTo: document.getElementById('root'),
  //   });
  //   expect(error).not.toHaveBeenCalled();
  //   expect(onRequest).toHaveBeenCalled();
  //   component.unmount();
  // });

  // test('onLoad called when valid props supplied', (done) => {
  //   const onLoad = jest.fn();
  //   component = mount((
  //     <ContentfulProvider client={contentfulClient}>
  //       <Query
  //         id="1"
  //         onLoad={onLoad}
  //       />
  //     </ContentfulProvider>
  //   ), {
  //     attachTo: document.getElementById('root'),
  //   });

  //   setTimeout(() => {
  //     expect(error).not.toHaveBeenCalled();
  //     expect(onLoad).toHaveBeenCalled();
  //     component.unmount();

  //     done();
  //   });
  // });

  // test('onError called when request error', (done) => {
  //   const onError = jest.fn();
  //   component = mount((
  //     <ContentfulProvider client={contentfulClient}>
  //       <Query
  //         id="2"
  //         onError={onError}
  //       />
  //     </ContentfulProvider>
  //   ), {
  //     attachTo: document.getElementById('root'),
  //   });

  //   setTimeout(() => {
  //     expect(error).not.toHaveBeenCalled();
  //     expect(onError).toHaveBeenCalled();
  //     component.unmount();

  //     done();
  //   });
  // });
});
