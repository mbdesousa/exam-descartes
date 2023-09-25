import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Keyboard, Pressable, Button } from 'react-native';
import { debounce } from 'lodash'; // Import debounce from lodash
import axios from 'axios';
import { CityData } from '../../interfaces/city';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Coordinate } from '../../interfaces/weather';
import { useRecoilState } from 'recoil';
import { cityDataState } from '../../recoil/city';

interface RequestPermissionProps {
  // callback: () => void;
  fetchWeatherData: (coordinate: Coordinate) => Promise<void>;
}

export default function WeatherSearch({ fetchWeatherData }: RequestPermissionProps) {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<[] | null>([]);

  const [cityData, setCityData] = useRecoilState(cityDataState)

  const debouncedFetchSuggestions = async () => {
    try {
      // setLoading(true);
      const response = await fetchSuggestions(searchValue);

      console.log(response.data)

      if (response.data.data.length === 0) {
        console.log('aq')
        setSuggestions(null)
      } else {
        setSuggestions(response.data.data);
      }

    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }

  const handleInputChange = (text: string) => {
    setSearchValue(text);

    // Unfortunately, the debounce didnt work as expected, so I left the trigger only on the Submit
    setSuggestions([])
    // debouncedFetchSuggestions();
  };

  // TODO >> move to service
  const fetchSuggestions = async (input: string) => {
    const options = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      params: {
        namePrefix: input,
        languageCode: 'en',
        limit: 10
      },
      headers: {
        'X-RapidAPI-Key': '35a7d22213mshd8d676b3633a819p1b46b3jsn23e63f662c05',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
    };

    return await axios.request(options);
  };



  const handleItemPress = async (item: CityData) => {

    setSearchValue(item.city + ', ' + item.region + ' - ' + item.country)

    setCityData(item);

    try {
      await fetchWeatherData({ latitude: item.latitude, longitude: item.longitude })
    } catch (error) {
      console.error('Error fetching weather:', error)
    }

  };

  const handleRenderItem = (item: CityData) => {
    return (
      <TouchableOpacity
        style={styles.suggestionItem}
        onPress={() => handleItemPress(item)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text
            style={{
              fontSize: 18,
              color: '#777777'
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#444444'
            }}
          >
            , {item.region}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 12,
            color: '#555555'
          }}
        >
          {item.country}
        </Text>
      </TouchableOpacity>)
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Search'
        placeholderTextColor='#333333'
        value={searchValue}
        onBlur={() => setSuggestions([])}
        onChangeText={handleInputChange}
        onSubmitEditing={debouncedFetchSuggestions}
        blurOnSubmit={false}
        clearButtonMode='always'
        clearTextOnFocus
        returnKeyType='search'
        style={{
          borderWidth: 1,
          width: '100%',
          backgroundColor: '#111111',
          borderRadius: 32,
          borderColor: '#171717',
          color: '#555555',
          fontSize: 18,
          paddingVertical: 18,
          paddingHorizontal: 18,
        }}
      />

      {/* Suggestions List */}
      {Keyboard.isVisible() && suggestions && suggestions.length > 0 && (
        <View
          style={styles.suggestionItemContainer}
        >
          <FlatList
            onScroll={() => { }}
            data={suggestions}
            keyExtractor={(item: CityData) => item.id.toString()}
            renderItem={({ item }: { item: CityData }) => handleRenderItem(item)}
          />

        </View>
      )}

      {Keyboard.isVisible() && suggestions === null && (
        <View
          style={styles.suggestionItemContainer}
        >
          <Text
            style={{
              fontSize: 18,
              color: '#777777',
              alignSelf: 'center',
              paddingVertical: 12
            }}
          >
            Nothing was found :(
          </Text>

        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 12,
    display: 'flex',
    alignItems: 'center',
    top: 42,
    overflow: 'hidden',
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderColor: '#222222'
  },
  suggestionItemContainer: {
    width: '86%',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    borderColor: '#333333',
    backgroundColor: '#171717',
    paddingVertical: 10,
  }
});
