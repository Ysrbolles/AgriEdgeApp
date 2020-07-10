import { createAppContainer, createSwitchNavigator } from "react-navigation";
import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import WeatherScreen from "./screens/WeatherScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import AddNodes from "./screens/AddNodes";
import Chart from "./screens/charts";
// import MainScreen from "./screens/MainTabs"

import * as firebase from "firebase";

import config from "./config";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
firebase.initializeApp(config);
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      style={{ backgroundColor: "tomato" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Weather"
        component={WeatherScreen}
        options={{
          tabBarLabel: "Updates",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: "Updates",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: false,
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={24} color="#5ABD8C" />
        ),
      },
    },
    Weather: {
      screen: WeatherScreen,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-cloud" size={24} color="#5ABD8C" />
        ),
      },
    },

    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-notifications" size={24} color="#5ABD8C" />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" size={24} color="#5ABD8C" />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#5ABD8C",
      inactiveTintColor: "#ffff",
      showLabel: true,
      headerTitle: false,
      tabBarVisible: false,
      // style: {
      //   backgroundColor: '#5ABD8C',
      // },
    },
  }
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});
const App = createStackNavigator({
  App: {
    screen: AppTabNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
  // App: AppTabNavigator,
  AddNode: AddNodes,
  Charts: Chart,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: App,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
