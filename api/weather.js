import axios from "axios";
import Constants from 'expo-constants';

const WEATHER_API_KEY = Constants.expoConfig?.extra?.API_KEY;

const getLocationData = async (query) => {
  try {
    const response1 = await axios.get(
      `https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${query.city}`,
    );
    return response1.data;
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
};

const getForecastData = async (query) => {
  try {
    const response2 = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${query.city}&days=${query.day}&aqi=no&alerts=no`,
    );
    return response2.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
};

export { getForecastData, getLocationData };

