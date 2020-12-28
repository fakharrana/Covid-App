import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, Fontisto, FontAwesome } from "@expo/vector-icons";

import WorldStatistics from "./Screens/WorldStatistics.js";
import CountryList from "./Screens/CountryList.js";
import CountryStats from "./Screens/CountryStats.js";
import FavCountryList from "./Screens/FavCountryList.js";

const Stack = createStackNavigator();

const WorldStatsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="World Statistics"
        component={WorldStatistics}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#D02760",
          },
          headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
              <Ionicons
                name="md-menu"
                color="white"
                size={32}
                onPress={() => navigation.toggleDrawer()}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const CountryListNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"CountryList"}
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#D02760",
        },
      }}
    >
      <Stack.Screen
        name="CountryList"
        component={CountryList}
        options={({ navigation }) => ({
          title: "Countries List",
          headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
              <Ionicons
                name="md-menu"
                color="white"
                size={32}
                onPress={() => navigation.toggleDrawer()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen name="CountryStats" component={CountryStats} />
    </Stack.Navigator>
  );
};

const FavCountryListNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"FavCountryList"}
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#D02760",
        },
      }}
    >
      <Stack.Screen
        name="FavCountryList"
        component={FavCountryList}
        options={({ navigation }) => ({
          title: " Fav Countries",
          headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
              <Ionicons
                name="md-menu"
                color="white"
                size={32}
                onPress={() => navigation.toggleDrawer()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen name="CountryStats" component={CountryStats} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerStyle={{
        width: 300,
      }}
      drawerContentOptions={{
        activeTintColor: "#D02760",
      }}
    >
      <Drawer.Screen
        name="World Statistics"
        component={WorldStatsNavigator}
        options={{
          drawerIcon: () => (
            <Fontisto name="world-o" size={24} color="#D02760" />
          ),
        }}
      />
      <Drawer.Screen
        name="Countries"
        component={CountryListNavigator}
        options={{
          drawerIcon: () => (
            <FontAwesome name="list-ul" size={24} color="#D02760" />
          ),
        }}
      />
      <Drawer.Screen
        name="Fav Countries"
        component={FavCountryListNavigator}
        options={{
          drawerIcon: () => <Ionicons name="star" size={26} color="#D02760" />,
        }}
      />
    </Drawer.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default App;
