import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";

export const getCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch countries.");
  }
};

export const getCountry = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}`);
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch country");
  }
};
