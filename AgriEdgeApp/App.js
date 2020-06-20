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

import * as firebase from "firebase";

import config from "./config";

firebase.initializeApp(config);

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
      activeTintColor: "#161F3D",
      inactiveTintColor: "#B8BBC4",
      showLabel: false,
      headerTitle: false,
      tabBarVisible: true
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
  AddNode: AddNodes,
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
