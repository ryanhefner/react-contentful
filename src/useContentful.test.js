import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ContentfulClient from './ContentfulClient';
import ContentfulProvider from './ContentfulProvider';
import useContentful from './useContentful';
import 'babel-polyfill';

Enzyme.configure({
  adapter: new Adapter(),
});

let contentfulClient;
let component;
let error;

const mockUseContentful = jest.fn(props => {
  return { loading: false, fetched: false, data: null };
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

const TestComponent = props => {
  const { loading, fetched, data, error } = useContentful(props);

  return <div></div>;
};

const MockComponent = props => {
  const { loading, fetched, data, error } = mockUseContentful(props);

  return <div></div>;
};

describe('useContentful', () => {
  test('renders', () => {
    component = mount(
      <ContentfulProvider client={contentfulClient}>
        <TestComponent />
      </ContentfulProvider>
    );
    expect(component).toBeTruthy();
    component.unmount();
  });

  test('error thrown when no context is provided', () => {
    error = jest.spyOn(global.console, 'error');
    component = mount(<TestComponent />);
    expect(error).toBeCalled();
    component.unmount();
  });

  test('no error thrown when client and id provided', () => {
    error = jest.spyOn(global.console, 'error');
    component = mount(
      <ContentfulProvider client={contentfulClient}>
        <TestComponent id="2pRBx2MrHYDQhq1ihCvb1V" />
      </ContentfulProvider>
    );
    expect(error).not.toHaveBeenCalled();
    component.unmount();
  });

  test('error throw when client not provided', () => {
    error = jest.spyOn(global.console, 'error');
    component = mount(
      <ContentfulProvider>
        <TestComponent />
      </ContentfulProvider>
    );
    expect(error).toBeCalled();
    component.unmount();
  });

  test('error thrown when no query props specified', () => {
    error = jest.spyOn(global.console, 'error');
    component = mount(
      <ContentfulProvider client={contentfulClient}>
        <TestComponent />
      </ContentfulProvider>
    );
    expect(error).toBeCalled();
    component.unmount();
  })

  test('confirm useContentful hook is called', () => {
    component = mount((
      <ContentfulProvider client={contentfulClient}>
        <MockComponent id="1" />
      </ContentfulProvider>
    ), {
      attachTo: document.getElementById('root'),
    });
    expect(mockUseContentful).toHaveBeenCalled();
    component.unmount();
  });
});
