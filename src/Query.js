import React, { Component } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import withContentful from './withContentful';

class Query extends Component {
  constructor(props) {
    super(props);

    const data = this.checkCache(props);

    this.state = {
      fetched: data ? true : false,
      loading: false,
      error: null,
      data,
    };

    if (data) {
      props.onLoad(this.state);
    }
  }

  componentDidMount() {
    if (!this.state.data) {
      this.requestContentfulData();
    }
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.setState({
        fetched: false,
      }, () => {
        this.requestContentfulData();
      });
    }
  }
  
  //check empty obj
  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  } 
  
  async validateRequestRequirements() {
    return new Promise((resolve, reject) => {
      const {
        id,
        contentType,
        contentful,
        include,
        locale,
        parser,
        query,
      } = this.props;

      // Check for contentful context
      warning(contentful, 'No contentful context passed to <Query />');

      if (!contentful) {
        return reject('No contentful context passed to <Query />');
      }

      const {
        client,
        locale: contextLocale,
      } = contentful;

      // Check to make sure a client is available
      warning(client, 'ContentfulClient not available via context on <Query />');

      if (!client) {
        return reject('ContentfulClient not available via context on <Query />');
      }

      const hasQuery = !!(id || contentType || !this.isEmpty(query));

      // Check to make sure queryable props have been set
      warning(hasQuery, 'Query props not set on <Query />');

      if (!hasQuery) {
        return reject('Query props not set on <Query />');
      }

      return resolve(true);
    });
  }

  checkCache(props) {
    const {
      contentful,
      parser,
    } = props;

    if (!contentful) {
      return null;
    }

    const cacheKey = this.generateCacheKey(props);

    if (!contentful.client) {
      return null;
    }

    const cache = contentful.client.checkCache(cacheKey);

    return cache
      ? parser(cache, props)
      : null;
  }

  generateCacheKey(props) {
    const {
      contentful,
      contentType,
      id,
      include,
      locale,
      query,
    } = props;

    if (!contentful) {
      return null;
    }

    const {
      locale: contextLocale,
    } = contentful;

    const requestLocale = locale || contextLocale;

    if (id) {
      return JSON.stringify({id, options: {
        locale: requestLocale,
        include,
        ...query
      }});
    }

    return JSON.stringify({
      content_type: contentType,
      locale: requestLocale,
      include,
      ...query
    });
  }

  async fetchData() {
    if (this.props.skip) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      const {
        contentful,
        contentType,
        id,
        include,
        locale,
        query,
      } = this.props;

      this.validateRequestRequirements().then(() => {
        const {
          client,
          locale: contextLocale,
          renderPromises,
        } = contentful;

        const requestLocale = locale || contextLocale;

        const request = id
          ? client.getEntry(id, {
              locale: requestLocale,
              include,
              ...query
            })
          : client.getEntries({
              'content_type': contentType,
              locale: requestLocale,
              include,
              ...query
            });

        if (renderPromises) {
          renderPromises.registerSSRObservable(this, request);
        }

        return request;
      })
      .then(resolve)
      .catch(reject);
    });
  }

  requestContentfulData() {
    const {
      parser,
      onRequest,
      onLoad,
      onError,
    } = this.props;

    this.validateRequestRequirements().then(() => {
      this.setState({
        error: null,
        loading: true,
      }, async () => {
        onRequest(this.state);

        this.fetchData().then(response => {
          this.setState({
            data: parser(response, this.props),
            fetched: true,
            loading: false,
          }, () => {
            onLoad(this.state);
          });
        });
      });
    })
    .catch(error => {
      this.setState({
        error,
        fetched: true,
        loading: false,
      }, () => {
        onError(this.state);
      });
    });
  }

  getQueryResult() {
    return this.state;
  }

  render() {
    const {
      children,
      contentful,
    } = this.props;

    const finish = () => children(this.getQueryResult());

    if (contentful && contentful.renderPromises) {
      return contentful.renderPromises.addQueryPromise(this, finish);
    }

    return finish();
  }
}

Query.propTypes = {
  children: PropTypes.func,
  contentType: PropTypes.string,
  id: PropTypes.string,
  include: PropTypes.number,
  query: PropTypes.object,
  parser: PropTypes.func,
  skip: PropTypes.bool,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  onRequest: PropTypes.func,
};

Query.defaultProps = {
  children: ({data, error, fetched, loading}) => null,
  include: 10,
  query: {},
  skip: false,
  parser: (data, props) => data,
  onError: () => {},
  onLoad: () => {},
  onRequest: () => {},
};

export default withContentful(Query);
