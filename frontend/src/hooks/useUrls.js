import { useState } from "react";
import { shortenUrl } from "../api/url.api";

// All logic lives here — component stays pure UI
const useUrls = () => {
  const [result, setResult]   = useState(null);   // { shortUrl, originalUrl }
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const shorten = async (originalUrl) => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const { data } = await shortenUrl(originalUrl);
      setResult(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, shorten };
};

export default useUrls;