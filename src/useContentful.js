import { useContext, useEffect, useState } from 'react';
import ContentfulContext from './ContentfulContext';
import { checkCache, fetchData } from './helpers';

const defaultProps = {
  include: 10,
  query: {},
  parser: (data, props) => data,
};

const useContentful = props => {
  const contentful = useContext(ContentfulContext);
  const internalProps = { ...defaultProps, ...props, contentful };
  const { parser } = internalProps;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(checkCache(internalProps));
  const [fetched, setFetched] = useState(!!data);

  const requestContentfulData = () => {
    setLoading(true);

    fetchData(internalProps)
      .then(response => {
        setData(parser ? parser(response, internalProps) : response);
        setLoading(false);
        setFetched(true);
      })
      .catch(error => {
        setError(error);
      });
  };

  useEffect(() => {
    if (fetched) {
      setFetched(false);
    }

    requestContentfulData();
  }, [JSON.stringify(props)]);

  const finish = () => ({ data, error, fetched, loading });

  if (contentful && contentful.renderPromises) {
    return contentful.renderPromises.addQueryPromise({
      fetchData: () => fetchData(internalProps),
      props: internalProps
    }, finish);
  }

  return finish();
};

export default useContentful;
