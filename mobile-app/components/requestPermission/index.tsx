import { useState } from 'react';
import { ActivityIndicator, Button, Image, Text, View } from 'react-native';
import { Coordinate } from '../../interfaces/weather';
import Utils from '../../utils/helper';

interface RequestPermissionProps {
  callback: () => void;
  fetchWeatherData: (coordinate: Coordinate) => Promise<void>;
}

const img = require('../../assets/smoke-png-535.png')

// TODO >> 
//      >> Check LocalStorage for coordinate -> if exists, skip this step and go straight to fetchWeatherData

export default function RequestPermission({ callback, fetchWeatherData }: RequestPermissionProps) {

  const [verifying, setVerifying] = useState(false)
  const [verifyingStatus, setVerifyingStatus] = useState('validating permission')

  async function handleOnPress() {

    setVerifying(true)

    const allowed = await Utils.requestPermission()

    if (allowed) {

      const coordinate = await Utils.getCurrentCoordinate()

      try {
        await fetchWeatherData(coordinate)

        callback()

      } catch (error) {
        console.error('Error fetching weather:', error)
      }
    } else {
      // TODO >> Allow for user selected location
    }
  }

  return (
    <View style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flex: 1
    }}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text
          style={{
            fontSize: 56,
            color: 'white',
            fontWeight: '100',
            position: 'absolute',
          }}
        >DWeather</Text>

        <Image
          source={img}
          style={{
            left: 24,
          }}
        />
      </View>
      <View>

        <Text
          style={{
            color: 'grey',
            marginBottom: 24
          }}
        >We kindly ask for your authorization to access your location.</Text>
        {verifying ? (
          <ActivityIndicator style={{ marginTop: 6, marginBottom: 6 }} size="small" color="#0976ad" />
        ) : (
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Button title='Authorize' color={'#0976ad'}
              onPress={async () => await handleOnPress()}
            />
          </View>
        )}


      </View>
    </View>
  )
}
