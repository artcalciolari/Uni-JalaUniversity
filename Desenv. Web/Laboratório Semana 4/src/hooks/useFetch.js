import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => 
{
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => 
  {
    if (!url) return;

    const fetchData = async() => 
    {
      setIsLoading(true);
      setError(null);

      try 
      {
        const response = await fetch(url, options);
        
        if (!response.ok) 
        {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      }
      catch (err) 
      {
        setError(err.message);
      }
      finally 
      {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]);

  return { data, isLoading, error };
};

export default useFetch;