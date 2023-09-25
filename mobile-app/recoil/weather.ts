import { atom } from 'recoil'
import { WeatherData } from '../interfaces/weather'

export const initialWeatherData: WeatherData = {
  near: '',
  description: '',
  timezone: undefined,
  humidity: undefined,
  feelsLike: undefined,
  windSpeed: undefined,
  timestamp: undefined,
  temperature: undefined,
  temperatureMax: undefined,
  temperatureMin: undefined,
  city: undefined,
  coordinate: {
    latitude: 0.1,
    longitude: 0.1,
  },
}

export const weatherDataState = atom<WeatherData>({
  key: 'weatherData',
  default: initialWeatherData
})
