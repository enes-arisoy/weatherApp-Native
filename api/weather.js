import axios from "axios";

const WEATHER_API_KEY = "b2b3eae247714919944190718262503";

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

