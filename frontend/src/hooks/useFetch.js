import { useState, useEffect } from "react";

export const useFetch = (fetchFn, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setLoading(true);
    try {
      const result = await fetchFn(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dependencies !== null) {
      execute();
    }
  }, dependencies);

  return { data, loading, error, execute };
};
