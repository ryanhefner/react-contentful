import { Component } from 'react';
import PropTypes from 'prop-types';
import withContentful from './withContentful';
import { checkCache, fetchData, validateRequestRequirements } from './helpers';

class Query extends Component {
  constructor(props) {
    super(props);

    const data = checkCache(props);

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

  requestContentfulData() {
    const {
      parser,
      onRequest,
      onLoad,
      onError,
    } = this.props;

    validateRequestRequirements(this.props)
      .then(() => {
        this.setState({
          error: null,
          loading: true,
        }, async () => {
          onRequest(this.state);

          fetchData(this.props)
            .then(response => {
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
