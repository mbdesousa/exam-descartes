import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRecoilState } from 'recoil';
import RequestPermission from '../components/requestPermission';
import WeatherDisplay from '../components/weatherDisplay';
import Map from '../components/weatherMap';
import DismissKeyboard from '../components/weatherSearch/dismissKeyboard';
import { Coordinate, CrudeWeatherData } from '../interfaces/weather';
import { weatherDataState } from '../recoil/weather';
import { fetchWeatherByCoordinate } from '../service/weather';
import Utils from '../utils/helper';

export default function Index() {

  const [authorized, setAuthorized] = useState(false)
  const [weatherData, setWeatherData] = useRecoilState(weatherDataState)
  const [loading, setLoading] = useState(false)

  // todo >> function that checks localStorage
  function handleSetAuthorized() {
    setAuthorized(true);
  }

  async function fetchWeatherData(coordinate: Coordinate) {

    setLoading(true)

    try {
      const { data } = await fetchWeatherByCoordinate(coordinate)

      // garante que o data vai ser desse tipo -- ruim
      let crudeWeatherData: CrudeWeatherData = data;

      const cleanWeatherData = Utils.transformCrudeWeatherData(crudeWeatherData)
      setWeatherData(cleanWeatherData);

    } catch (error) {
      console.log('error: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>

        {authorized ? (
          <>
            <Map fetchWeatherData={fetchWeatherData} />
            <WeatherDisplay />
          </>
        ) : (
          <RequestPermission fetchWeatherData={fetchWeatherData} callback={handleSetAuthorized} />
        )}

      </View>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#111111',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
