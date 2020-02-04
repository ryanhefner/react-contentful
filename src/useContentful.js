import { useContext, useEffect, useState } from 'react';
import ContentfulContext from './ContentfulContext';
import { checkCache, fetchData } from './helpers';

const useContentful = props => {
  const contentful = useContext(ContentfulContext);
  const { parser } = props;

  const internalProps = { ...props, contentful };

  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(checkCache(internalProps));
  const [fetched, setFetched] = useState(!!data);

  const requestContentfulData = () => {
    setLoading(true);

    fetchData(internalProps)
      .then(response => {
        setData(parser ? parser(response) : response);
        setLoading(false);
        setFetched(true);
      })
      .catch(error => {
        setError(error);
      });
  };

  useEffect(() => {
    if (!mounted && !fetched) {
      setMounted(true);
      requestContentfulData();
    } else if (mounted && fetched) {
      setFetched(false);
      requestContentfulData();
    }
  }, [mounted, internalProps]);

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
