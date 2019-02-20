import React, { Component } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import withContentful from './withContentful';

class Query extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: null,
      data: null,
    };
  }

  componentDidMount() {
    this.requestContentfulData();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.requestContentfulData();
    }
  }

  requestContentfulData() {
    const {
      id,
      contentType,
      contentful,
      include,
      locale,
      parser,
      query,
      onRequest,
      onLoad,
      onError,
    } = this.props;

    // Check for contentful context
    warning(contentful, 'No contentful context passed to <Query />');

    if (!contentful) {
      return;
    }

    const {
      client,
      locale: contextLocale,
    } = contentful;

    // Check to make sure a client is available
    warning(client, 'ContentfulClient not available via context on <Query />');

    if (!client) {
      return;
    }

    const hasQuery = !!(id || contentType || query === {});

    // Check to make sure queryable props have been set
    warning(hasQuery, 'Query props not set on <Query />');

    if (!hasQuery) {
      return;
    }

    this.setState({
      loading: true,
    }, async () => {
      onRequest(this.state);

      const requestLocale = locale || contextLocale;

      try {
        const data = await id
          ? client.getEntry(id, {
              local: requestLocale,
              include,
              ...query
            })
          : client.getEnties({
              'content_type': contentType,
              locale: requestLocale,
              include,
              ...query
            });

        this.setState({
          data: parser(data),
          loading: false,
        }, () => {
          onLoad(this.state);
        });
      }
      catch (error) {
        this.setState({
          error,
          loading: false,
        }, () => {
          onError(this.state);
        });
      }
    });
  }

  render() {
    if (!this.props.children) {
      return null;
    }

    return (this.props.children(this.state));
  }
}

Query.propTypes = {
  children: PropTypes.func,
  entryId: PropTypes.string,
  contentType: PropTypes.string,
  include: PropTypes.number,
  query: PropTypes.object,
  parser: PropTypes.func,
  onRequest: PropTypes.func,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};

Query.defaultProps = {
  include: 10,
  query: {},
  parser: (data) => data,
  onRequest: () => {},
  onLoad: () => {},
  onError: () => {},
};

export default withContentful(Query);
