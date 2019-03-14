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
    const Context = this.props.context || ContentfulContext;

    warning(this.state.client, 'No `client` specified on <ContentfulProvider />');

    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

ContentfulProvider.propTypes = {
  children: PropTypes.any,
  client: PropTypes.object,
  context: PropTypes.object,
  locale: PropTypes.string,
};

ContentfulProvider.defaultProps = {
  locale: 'en-US',
};

export default ContentfulProvider;
