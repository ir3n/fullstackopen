import { useState, useEffect } from "react";
import { getCountries } from "../services/countries";

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    setError(null);
    try {
      const data = await getCountries();
      setCountries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return { countries, isLoading, error };
};
