import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';

const WorldStatistics = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [worldPopulation, setWorldPopulation] = useState(7794798739);

  useEffect(() => {
    fetch('https://covid-19-data.p.rapidapi.com/totals', {
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
  }, []);

  const percentage = (current) => {
    return ((parseInt(current) * 100) / worldPopulation).toFixed(4);
  };
  return (
    <View style={styles.container}>
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
                <Text style={{ width: 80, color: 'white' }}>
                  {' '}
                  {item.confirmed}
                </Text>
                <Text style={{ width: 80, color: 'white' }}>
                  {' ' + percentage(item.confirmed) + '%'}
                </Text>
              </View>

              <View style={styles.rowContainer2}>
                <Text style={{ width: 120, color: 'white' }}>Recovered:</Text>
                <Text style={{ width: 80, color: 'white' }}>
                  {' '}
                  {item.recovered}
                </Text>
                <Text style={{ width: 80, color: 'white' }}>
                  {' ' + percentage(item.recovered) + '%'}
                </Text>
              </View>

              <View style={styles.rowContainer3}>
                <Text style={{ width: 120, color: 'white' }}>
                  Critical Cases:
                </Text>
                <Text style={{ width: 80, color: 'white' }}>
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
    paddingRight: 5,
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
export default WorldStatistics;
