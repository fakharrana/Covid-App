import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavCountryList = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const flatList = (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <View
          style={{
            padding: 10,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 320,
              paddingLeft: 10,
              paddingRight: 10,
              marginBottom: -17,
              marginLeft: 5,
              backgroundColor: "black",
              borderWidth: 3,
              borderColor: "transparent",
              height: 60,
              borderRadius: 20,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CountryStats", { country: item })
              }
            >
              <Text style={{ width: 280, color: "white", fontweight: "bold" }}>
                {item}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );

  const emptyList = (
    <View
      style={{
        marginTop: 150,
        marginLeft: 32,
      }}
    >
      <Text
        style={{
          color: "green",
          fontSize: 24,
        }}
      >
        There is no data to display!!!
      </Text>
    </View>
  );

  const loadData = async () => {
    var value = await AsyncStorage.getItem("@dataList");

    if (value === null) {
      setLoading(false);
    } else {
      console.log("Loading Data");
      var loadedData = JSON.parse(value);
      setData(loadedData);
      console.log("Loading Data Done ");
      setLoading(false);
    }
  };
  return (
    <View style={{ paddingTop: 30 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : data.length != 0 ? (
        flatList
      ) : (
        emptyList
      )}
    </View>
  );
};

export default FavCountryList;
