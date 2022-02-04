import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CountryStats = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [country, setCountry] = useState(route.params.country);
  const [countryPopulation, setCountryPopulation] = useState(0);
  const [fav, setFav] = useState(false);

  navigation.setOptions({
    title: country,
    headerRight: () => (
      <TouchableOpacity>
        {fav ? (
          <Ionicons name="star" color="blue" size={30} onPress={deleteData} />
        ) : (
          <Ionicons
            name="star-outline"
            color="blue"
            size={30}
            onPress={saveData}
          />
        )}
      </TouchableOpacity>
    ),
  });

  useLayoutEffect(() => {
    getCountryPopulation();
    getCountryData();
    check();
  }, []);

  const getCountryData = () => {
    fetch('https://covid-19-data.p.rapidapi.com/country?name=' + country, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '1c425aab07msh0c25c59cce0a85bp1d200ejsncd90f8fc43bb',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => setData(responseJson))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const getCountryPopulation = () => {
    fetch(
      'https://world-population.p.rapidapi.com/population?country_name=' +
        country,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '1c425aab07msh0c25c59cce0a85bp1d200ejsncd90f8fc43bb',
          'x-rapidapi-host': 'world-population.p.rapidapi.com',
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) =>
        setCountryPopulation(responseJson.body.population)
      )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const check = async () => {
    var value = await AsyncStorage.getItem('@dataList');
    if (value !== null) {
      var loadedData = JSON.parse(value);
      if (loadedData.includes(country, 0)) {
        setFav(true);
      }
    }
  };

  const saveData = async () => {
    setFav(true);
    var value = await AsyncStorage.getItem('@dataList');
    if (value === null) {
      console.log('Saving First Value ');
      await AsyncStorage.setItem('@dataList', JSON.stringify([country]));
      console.log('Saving First Value Done!');
    } else {
      console.log('Loading Previous Value');
      var loadedData = JSON.parse(value);
      loadedData.push(country);
      console.log('Loading Previous Value Done ');
      console.log('Saving New Value');
      await AsyncStorage.setItem('@dataList', JSON.stringify(loadedData));
      console.log('Saving New Value Done!');
    }
  };

  const deleteData = async () => {
    var value = await AsyncStorage.getItem('@dataList');
    if (value !== null) {
      var loadedData = JSON.parse(value);
      console.log('Saving Data');
      await AsyncStorage.setItem(
        '@dataList',
        JSON.stringify(loadedData.filter((item) => item != country))
      );
      console.log('Saving Data Done!');
      setFav(false);
    } else {
      console.log('Sorry, there is no Data');
    }
  };

  const percentage = (current) => {
    return ((parseInt(current) * 100) / countryPopulation).toFixed(4);
  };

  return (
    <View style={{ paddingTop: 30 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <View style={styles.container}>
              <View style={styles.rowContainer1}>
                <Text style={{ width: 120, color: 'white' }}>
                  Confirmed Cases:
                </Text>
                <Text style={{ width: 70, color: 'white' }}>
                  {' '}
                  {item.confirmed}
                </Text>
                <Text style={{ width: 70, color: 'white' }}>
                  {' ' + percentage(item.confirmed) + '%'}
                </Text>
              </View>

              <View style={styles.rowContainer2}>
                <Text style={{ width: 120, color: 'white' }}>Recovered:</Text>
                <Text style={{ width: 70, color: 'white' }}>
                  {' '}
                  {item.recovered}
                </Text>
                <Text style={{ width: 70, color: 'white' }}>
                  {' ' + percentage(item.recovered) + '%'}
                </Text>
              </View>

              <View style={styles.rowContainer3}>
                <Text style={{ width: 120, color: 'white' }}>
                  Critical Cases:
                </Text>
                <Text style={{ width: 70, color: 'white' }}>
                  {' '}
                  {item.critical}
                </Text>
                <Text style={{ width: 70, color: 'white' }}>
                  {' ' + percentage(item.critical) + '%'}
                </Text>
              </View>

              <View style={styles.rowContainer4}>
                <Text style={{ width: 120, color: 'white' }}>Deaths:</Text>
                <Text style={{ width: 70, color: 'white' }}>
                  {' '}
                  {item.deaths}
                </Text>
                <Text style={{ width: 70, color: 'white' }}>
                  {' ' + percentage(item.deaths) + '%'}
                </Text>
              </View>

              <View style={styles.rowContainer5}>
                <Text style={{ width: 160, color: 'white' }}>Last Update:</Text>
                <Text style={{ width: 100, color: 'white' }}>
                  {' '}
                  {item.lastUpdate.slice(0, 10)}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    paddingTop: 50,
  },
  rowContainer1: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderWidth: 3,
    borderColor: 'green',
    height: 50,
    borderRadius: 20,
  },
  rowContainer2: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D02760',
    borderWidth: 3,
    borderColor: '#D02760',
    height: 50,
    borderRadius: 20,
  },
  rowContainer3: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderWidth: 3,
    borderColor: 'blue',
    height: 50,
    borderRadius: 20,
  },
  rowContainer4: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightsalmon',
    borderWidth: 3,
    borderColor: 'lightsalmon',
    height: 50,
    borderRadius: 20,
  },
  rowContainer5: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 10,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightseagreen',
    borderWidth: 3,
    borderColor: 'lightseagreen',
    height: 50,
    borderRadius: 20,
  },
});
export default CountryStats;
