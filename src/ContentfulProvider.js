import React, { Component } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import ContentfulContext from './ContentfulContext';

class ContentfulProvider extends Component {
  constructor(props) {
    super(props);

    const {
      client,
      locale,
      renderPromises,
    } = props;

    this.state = {
      client,
      locale,
      renderPromises,
    };
  }

  render() {
    const { children, context } = this.props;

    const Context = context || ContentfulContext;

    warning(this.state.client, 'No `client` specified on <ContentfulProvider />');

    return (
      <Context.Provider value={this.state}>
        {children}
      </Context.Provider>
    );
  }
}

ContentfulProvider.propTypes = {
  children: PropTypes.any,
  client: PropTypes.object.isRequired,
  context: PropTypes.object,
  locale: PropTypes.string,
  renderPromises: PropTypes.object,
};

ContentfulProvider.defaultProps = {
  children: null,
  context: null,
  locale: 'en-US',
  renderPromises: null,
};

export default ContentfulProvider;
