import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRecoilState } from "recoil";
import { cityDataState } from "../../recoil/city";
import { weatherDataState } from "../../recoil/weather";

export default function WeatherDisplay() {

  const [weatherData, setWeatherData] = useRecoilState(weatherDataState);
  const [cityData, setCityData] = useRecoilState(cityDataState);

  if (weatherData) {
    return (
      <View style={styles.weatherContainer}>
        <View style={styles.weatherInfo}>
          <Text
            style={{
              fontSize: 48,
              color: 'grey',
            }}
          >{weatherData.temperature + ' K'}</Text>

          <Text
            style={{
              fontSize: 24,
              color: 'grey',
            }}
          >
            {weatherData.near}</Text>

          <Text
            style={{
              color: 'grey',
            }}
          >
            {cityData?.name}</Text>


          <Text
            style={{
              fontSize: 16,
              color: 'grey',
            }}
          >
            Air humidity: {weatherData.humidity} %</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '80%',
            paddingHorizontal: 12,
            paddingVertical: 12,
            backgroundColor: '#0c0c0c',
            borderRadius: 32,
          }}
        >

          <TouchableOpacity
            style={{
              backgroundColor: '#090909',
              padding: 8,
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                color: '#333333'
              }}
            >{'<<'}</Text>
          </TouchableOpacity>

          <Text style={{
            fontSize: 18,
            color: '#444444'

          }}>{moment().format('MMMM Do, YYYY')}</Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#090909',
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                color: '#333333',
              }}
            >{'>>'}</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }

  return (
    <View style={styles.weatherContainer}>
      <View style={styles.weatherInfo}>
        <Text>...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '30%',
    paddingVertical: 36
  },
  weatherInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  textPrimary: {
    fontSize: 24,
    color: 'grey',
  },
  h1: {
    fontSize: 64,
    color: 'grey',
  },
  humidityText: {
    color: 'white',
    fontSize: 24,
  },
});
