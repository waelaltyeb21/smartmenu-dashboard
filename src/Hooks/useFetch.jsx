import axios from "axios";
import { useEffect, useState } from "react";
function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    // Api Setting
    const controller = new AbortController();
    const signal = controller.signal;
    const getOptions = {
      method: "GET",
      signal: signal,
    };

      axios
        .get(url, getOptions)
        .then((response) => {
          if (
            response.request.status != 200 &&
            response.request.readyState != 4
          ) {
            throw new Error("Could Not Fetch Data From Server !");
          }
          return response.data;
        })
        .then((responseData) => {
          setData(responseData);
          setIsLoading(false);
          setError(false);
        })
        .catch((err) => {
          if (err.name == "AbortError") {
            console.log("Fetch Aborted..!");
          } else {
            setIsLoading(false);
            setError(true);
          }
        });

    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
