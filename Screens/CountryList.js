import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

const CountryList = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://world-population.p.rapidapi.com/allcountriesname", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "1c425aab07msh0c25c59cce0a85bp1d200ejsncd90f8fc43bb",
        "x-rapidapi-host": "world-population.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => setData(responseJson.body.countries))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ paddingTop: 30 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: "row",
                padding: 10,
              }}
            >
              <View
                style={{
                  width: 320,
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginBottom: -15,
                  marginLeft: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor:
                    "rgb(" +
                    Math.floor(Math.random() * 256) +
                    "," +
                    Math.floor(Math.random() * 256) +
                    "," +
                    Math.floor(Math.random() * 256) +
                    ")",
                  borderWidth: 3,
                  borderColor: "transparent",
                  height: 50,
                  borderRadius: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("CountryStats", { country: item })
                  }
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CountryList;
