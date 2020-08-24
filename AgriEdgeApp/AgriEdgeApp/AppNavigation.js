import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Icon from "react-native-vector-icons/Feather";
import styled from "styled-components/native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import WeatherScreen from "./screens/WeatherScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import AddNodes from "./screens/AddNodes";
import Chart from "./screens/charts";
import { Ionicons } from "@expo/vector-icons";
const Tabs = AnimatedTabBarNavigator();

const Screen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;
// const Logo = () => (
// 	<Image
// 		source={require('./logo.png')}
// 		resizeMode={'cover'}
// 		style={{ width: 150, height: 150 }}
// 	/>
// )

const TabBarIcon = (props) => {
  return (
    <Icon
      name={props.name}
      size={props.size ? props.size : 24}
      color={props.tintColor}
    />
  );
};

const Home = (props) => (
  <Screen>
    {/* <Logo /> */}

    <HomeScreen />
  </Screen>
);

const Discover = (props) => (
  <Screen>
    {/* <Logo /> */}
    <Text>Discover</Text>
    <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
      <Text>Go to Home</Text>
    </TouchableOpacity>
  </Screen>
);

const Images = () => (
  <Screen>
    {/* <Logo /> */}
    <Text>Images</Text>
  </Screen>
);

const Profile = () => (
  <Screen>
    {/* <Logo /> */}
    <Text>Profile</Text>
  </Screen>
);

export default () => (
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: "black",
      inactiveTintColor: "black",
      activeBackgroundColor: "#FFCF64",
      labelStyle: {
        fontWeight: "bold",
      },
    }}
    appearence={{
      //   floating: true,
      topPadding: 0,
      horizontalPadding: 5,
      dotSize: 10,
    }}
    initialRouteName="Home"
  >
    <Tabs.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon focused={focused} tintColor={color} name="home" />
        ),
      }}
    />
    <Tabs.Screen
      name="Weather"
      component={WeatherScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon focused={focused} tintColor={color} name="cloud" />
        ),
      }}
    />

    <Tabs.Screen
      name="Notification"
      component={NotificationsScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <Ionicons
            name="ios-notifications-outline"
            tintColor={color}
            focused={focused}
            size={24}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="Nodes"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon focused={focused} tintColor={color} name="list" />
        ),
      }}
    />
  </Tabs.Navigator>
);
