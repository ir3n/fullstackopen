import { useState } from "react";
import { getWeather } from "../services/weather";
import { useEffect } from "react";

export const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setError(null);
    try {
      const response = await getWeather(city);

      const ICON_PATH = `https://openweathermap.org/payload/api/media/file/${response.weather[0].icon}@2x.png`;

      const weatherObj = {
        temp: response.main.temp,
        icon: {
          src: ICON_PATH,
          alt: response.weather[0].main,
        },
        wind: response.wind.speed,
      };
      setWeather(weatherObj);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return { weather, isLoading, error };
};
