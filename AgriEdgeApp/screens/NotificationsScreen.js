import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Vibration,
  Platform,
  ScrollView,
  SafeAreaView,
  LayoutAnimation,
} from "react-native";
import { navigation } from "@react-navigation/native";
import AddScreen from "./AddNodes";
import * as firebase from "firebase";
import { SocialIcon, Input, Overlay } from "react-native-elements";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export default class NotificationsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      expoPushToken: "",
      notification: {},
      currentUser: [],
    };
  }
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    try {
      let token = await Notifications.getExpoPushTokenAsync();
      firebase
        .database()
        .ref("users/" + this.state.currentUser.uid + "/push_token")
        .set(token);
    } catch (error) {
      console.log(error);
    }
  };
  async componentDidMount() {
    this.state.currentUser = await firebase.auth().currentUser;

    await this.registerForPushNotificationsAsync();
  }

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.main}>
            <Text>No Notifications</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    marginTop: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});
