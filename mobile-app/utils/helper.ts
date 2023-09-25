import * as Location from 'expo-location';
import { Coordinate, CrudeWeatherData } from '../interfaces/weather';

async function requestPermission(): Promise<boolean> {

  const { status } = await Location.requestForegroundPermissionsAsync()

  if (status === 'granted') return true
  else return false
}

async function getCurrentCoordinate(): Promise<Coordinate> {
  const location = await Location.getCurrentPositionAsync();
  return { longitude: location.coords.longitude, latitude: location.coords.latitude, }
}

function transformCrudeWeatherData(crudeData: CrudeWeatherData) {
  return {
    coordinate: { latitude: crudeData.coord.lat, longitude: crudeData.coord.lon },
    description: crudeData.weather[0].description,
    temperature: crudeData.main.temp,
    feelsLike: crudeData.main.feels_like,
    humidity: crudeData.main.humidity,
    temperatureMin: crudeData.main.temp_min,
    temperatureMax: crudeData.main.temp_max,
    windSpeed: crudeData.wind.speed,
    timestamp: crudeData.dt,
    timezone: crudeData.timezone,
    near: crudeData.name
  }
}

const Utils = {
  requestPermission,
  getCurrentCoordinate,
  transformCrudeWeatherData,

}

export default Utils;
