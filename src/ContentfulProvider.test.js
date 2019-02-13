import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ContentfulClient from './ContentfulClient';
import ContentfulProvider from './ContentfulProvider';

Enzyme.configure({
  adapter: new Adapter(),
});

const contentfulClient = new ContentfulClient({
  accessToken: '23b20723ef0ffdc1f0e123e8fb76cffeacac8ec8b9199ed3e384cc37cf2256b7',
  space: 'nh6zyt31q7gz',
});

let component;

global.console = {error: jest.fn()};

describe('<ContentfulProvider />', () => {
  test('renders', () => {
    component = mount(<ContentfulProvider client={contentfulClient} />);
    expect(component).toBeTruthy();
  });

  test('warning displayed if no `client` provided', () => {
    const error = jest.spyOn(global.console, 'error');
    component = mount(<ContentfulProvider />);
    expect(error).toBeCalled();
  });
});
