import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export const getWeather = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`,
    );
    return response.data;
  } catch (err) {
    throw new Error("Error fetching the weather");
  }
};
