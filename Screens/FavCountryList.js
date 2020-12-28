import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavCountryList = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [fav, setFav] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadData();
    });
  }, [navigation]);

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

  const deleteData = async (dataItem) => {
    var value = await AsyncStorage.getItem("@dataList");
    if (value !== null) {
      var loadedData = JSON.parse(value);
      console.log("Saving Data");
      await AsyncStorage.setItem(
        "@dataList",
        JSON.stringify(loadedData.filter((item) => item != dataItem))
      );
      console.log("Saving Data Done!");
      setData(loadedData.filter((item) => item != dataItem));
    } else {
      console.log("Sorry, there is no Data");
    }
  };

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
              flexDirection: "row",
              alignItems: "center",
              width: 320,
              paddingLeft: 10,
              paddingRight: 10,
              marginBottom: -17,
              marginLeft: 5,
              backgroundColor: "grey",
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
              style={{ width: 250 }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  paddingLeft: 3,
                  fontSize: 21,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 100 }}>
              {fav ? (
                <Ionicons
                  name="star"
                  color="blue"
                  size={30}
                  onPress={() => deleteData(item)}
                />
              ) : (
                <Ionicons
                  name="star-outline"
                  color="blue"
                  size={30}
                  onPress={() => {}}
                />
              )}
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
