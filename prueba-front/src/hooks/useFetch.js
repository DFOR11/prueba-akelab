import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export const useFetchData = (url) => {
  const [state, setState] = useState({ loading: true, data: null, error: null });
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true, error: null });
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:7700' + url);
        const { data } = res;

        if (isMounted.current) {
          setState({ error: null, data, loading: false });
        }
      } catch (error) {
        if (isMounted.current) {
          setState({ error, loading: false, data: null });
        }
      }
    };

    fetchData();
  }, [url]);

  return state;
};
