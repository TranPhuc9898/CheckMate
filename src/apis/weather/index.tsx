import Config from "react-native-config";
import axios from "axios";

const weatherApiKey = Config.WEATHER_API_KEY;

interface IParams {
  cityName?: string;
  days?: number;
}

const forecastEndpoint = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${params.cityName}&days=${params.days}&hours=24`;

const apiCall = async (endpoint) => {
  const options = {
    method: "GET",
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return {};
  }
};

export const fetchWeatherForecast = (params: IParams) => {
  const forecastUrl = forecastEndpoint(params);
  return apiCall(forecastUrl);
};
