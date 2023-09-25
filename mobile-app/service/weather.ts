import * as API from "../config/api";
import axios from 'axios';
import { Coordinate } from "../interfaces/weather";

export async function fetchWeatherByCoordinate(coordinate: Coordinate) {
  try {
    console.log('fetch')
    const response = await axios.get(`${API.OPENWEATHER_BASE_URL}/weather?lat=${coordinate.latitude}&lon=${coordinate.longitude}&appid=${API.OPENWEATHER_API_KEY}`);
    return response;

  } catch (error: any) {
    throw new Error(error); // TODO
  }
}

export async function fetchCityInfo(formattedCoordinate: string) {

  const options = {
    method: 'GET',
    url: `${API.GEODB_BASE_URL}/cities`,
    params: {
      location: formattedCoordinate,
      languageCode: 'en',
    },
    headers: {
      'X-RapidAPI-Key': API.GEODB_API_KEY,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
    throw error;
  }
}
