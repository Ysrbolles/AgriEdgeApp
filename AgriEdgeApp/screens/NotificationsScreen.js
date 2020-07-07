import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Vibration,
  Platform
} from "react-native";
import { navigation } from "@react-navigation/native";
import AddScreen from "./AddNodes";
import { SocialIcon, Input, Overlay } from "react-native-elements";
// const [loading, setLoading] = useState(false);
// const navigation = useNavigation();
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

export default class NotificationsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      expoPushToken: "",
      notification: {},
    };
  }
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
    };
  componentDidMount() {
    this.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = (notification) => {
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  sendPushNotification = async () => {
    const message = {
      to: this.state.expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { data: "goes here" },
      _displayInForeground: true,
    };
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  toggleOverlay = () => {
    this.setState({ visible: !this.state.visible });
  };
  AddNode = () => {
    return <AddScreen />;
  };
  render() {
    // LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <Text>Notifications Screen</Text>
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("AddNode")}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>
              Add Node
            </Text>
          </Text>
        </TouchableOpacity>
        <Overlay
          isVisible={this.state.visible}
          onBackdropPress={this.toggleOverlay}
        >
          <AddScreen />
        </Overlay>
        <Button
          title={"Press to Send Notification"}
          onPress={() => this.sendPushNotification()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

// import React from "react";
// import { Text, View, Button, Vibration, Platform } from "react-native";
// import { Notifications } from "expo";
// import * as Permissions from "expo-permissions";
// import Constants from "expo-constants";

// export default class AppContainer extends React.Component {
//   state = {
//     expoPushToken: "",
//     notification: {},
//   };

//   registerForPushNotificationsAsync = async () => {
//     if (Constants.isDevice) {
//       const { status: existingStatus } = await Permissions.getAsync(
//         Permissions.NOTIFICATIONS
//       );
//       let finalStatus = existingStatus;
//       if (existingStatus !== "granted") {
//         const { status } = await Permissions.askAsync(
//           Permissions.NOTIFICATIONS
//         );
//         finalStatus = status;
//       }
//       if (finalStatus !== "granted") {
//         alert("Failed to get push token for push notification!");
//         return;
//       }
//       token = await Notifications.getExpoPushTokenAsync();
//       console.log(token);
//       this.setState({ expoPushToken: token });
//     } else {
//       alert("Must use physical device for Push Notifications");
//     }

//     if (Platform.OS === "android") {
//       Notifications.createChannelAndroidAsync("default", {
//         name: "default",
//         sound: true,
//         priority: "max",
//         vibrate: [0, 250, 250, 250],
//       });
//     }
//   };

//   componentDidMount() {
//     this.registerForPushNotificationsAsync();

//     // Handle notifications that are received or selected while the app
//     // is open. If the app was closed and then opened by tapping the
//     // notification (rather than just tapping the app icon to open it),
//     // this function will fire on the next tick after the app starts
//     // with the notification data.
//     this._notificationSubscription = Notifications.addListener(
//       this._handleNotification
//     );
//   }

//   _handleNotification = (notification) => {
//     Vibration.vibrate();
//     console.log(notification);
//     this.setState({ notification: notification });
//   };

//   // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
//   sendPushNotification = async () => {
//     const message = {
//       to: this.state.expoPushToken,
//       sound: "default",
//       title: "Original Title",
//       body: "And here is the body!",
//       data: { data: "goes here" },
//       _displayInForeground: true,
//     };
//     const response = await fetch("https://exp.host/--/api/v2/push/send", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Accept-encoding": "gzip, deflate",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(message),
//     });
//   };

//   render() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           alignItems: "center",
//           justifyContent: "space-around",
//         }}
//       >
//         <View style={{ alignItems: "center", justifyContent: "center" }}>
//           <Text>Origin: {this.state.notification.origin}</Text>
//           <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
//         </View>
//         <Button
//           title={"Press to Send Notification"}
//           onPress={() => this.sendPushNotification()}
//         />
//       </View>
//     );
//   }
// }

// import React, { Component } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import firebase from 'firebase';
// import { Permissions, Notifications } from 'expo';
// class DashboardScreen extends Component {
//   registerForPushNotificationsAsync = async () => {
//     const { status: existingStatus } = await Permissions.getAsync(
//       Permissions.NOTIFICATIONS
//     );
//     let finalStatus = existingStatus;

//     // only ask if permissions have not already been determined, because
//     // iOS won't necessarily prompt the user a second time.
//     if (existingStatus !== 'granted') {
//       // Android remote notification permissions are granted during the app
//       // install, so this will only ask on iOS
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }

//     // Stop here if the user did not grant permissions
//     if (finalStatus !== 'granted') {
//       return;
//     }

//     try {
//       // Get the token that uniquely identifies this device
//       let token = await Notifications.getExpoPushTokenAsync();

//       // POST the token to your backend server from where you can retrieve it to send push notifications.
//       firebase
//         .database()
//         .ref('users/' + this.currentUser.uid + '/push_token')
//         .set(token);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   async componentDidMount() {
//     this.currentUser = await firebase.auth().currentUser;
//     await this.registerForPushNotificationsAsync();
//   }

//   sendPushNotification = () => {
//     let response = fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         to: '',
//         sound: 'default',
//         title: 'Demo',
//         body: 'Demo notificaiton'
//       })
//     });
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>DashboardScreen</Text>
//         <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
//         <Button
//           title="Send Push Notification"
//           onPress={() => this.sendPushNotification()}
//         />
//       </View>
//     );
//   }
// }
// export default DashboardScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
