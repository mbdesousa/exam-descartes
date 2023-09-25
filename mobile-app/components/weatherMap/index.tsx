import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, } from 'react-native-maps';
import { useRecoilState } from 'recoil';
import { Coordinate } from '../../interfaces/weather';
import { weatherDataState } from '../../recoil/weather';
import { fetchCityInfo } from '../../service/weather';
import WeatherSearch from '../weatherSearch';

interface WeatherMapProps {
  fetchWeatherData: (coordinate: Coordinate) => Promise<void>;
}

export default function WeatherMap({ fetchWeatherData }: WeatherMapProps) {

  const [weatherData, setWeatherData] = useRecoilState(weatherDataState)

  const initialRegion = {
    latitude: weatherData.coordinate.latitude,
    longitude: weatherData.coordinate.longitude,
    latitudeDelta: 0.0,
    longitudeDelta: 0.0,
  }

  async function handleMapPress(event: any) {

    event.persist();

    const { latitude, longitude } = event.nativeEvent.coordinate

    let updatedWeatherData = { ...weatherData }

    updatedWeatherData.coordinate = { latitude, longitude }

    setWeatherData(updatedWeatherData);

    const formattedCoordinateIso6709 = `${latitude >= 0 ? '+' : '-'}${Math.abs(latitude).toFixed(4)}${longitude >= 0 ? '+' : '-'}${Math.abs(longitude).toFixed(4)}`;

    try {

      const xx = await fetchCityInfo(formattedCoordinateIso6709)
      console.log(xx)
    } catch (error) {
      console.log(error)
    }

    await fetchWeatherData({ latitude, longitude })
  }

  return (
    <View style={styles.mapContainer}>
      <MapView onPress={(e) => handleMapPress(e)} showsMyLocationButton={true} showsUserLocation={true} style={styles.map} initialRegion={initialRegion} >
        <Marker coordinate={weatherData.coordinate || initialRegion} />
      </MapView>
      <WeatherSearch fetchWeatherData={fetchWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: '70%',
    width: '100%'
  },
  map: {
    height: '100%',
    width: '100%'
  }
});
