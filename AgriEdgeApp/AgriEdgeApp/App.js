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
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from "firebase";

import config from "./config";
import AppNavigation from './Root'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
firebase.initializeApp(config);
const Tab = createMaterialBottomTabNavigator();


const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: false,
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={24} color="tintColor" />
        ),
      },
    },
    Weather: {
      screen: WeatherScreen,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-cloud" size={24} color="tintColor" />
        ),
      },
    },

    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-notifications" size={24} color="tintColor" />
        ),
      },
    },
    Nodes: {
      screen: ProfileScreen,
      navigationOptions: {
        headerShown: false,
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-list-box" size={24} color="tintColor" />
        ),
      },
    },
  },
  {
    tabBarComponent: AppNavigation,
    tabBarOptions: {
      activeTintColor: "#eeeeee",
      inactiveTintColor: "#222222",
      showLabel: true,
      headerTitle: false,
      tabBarVisible: false,
      // activeBackgroundColor: "#5ABD8C",
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
  Node: Chart,
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
