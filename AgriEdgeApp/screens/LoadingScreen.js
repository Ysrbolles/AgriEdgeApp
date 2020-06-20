import React from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  Image,
  Icon,
  ActivityIndicator,
} from "react-native";
import * as firebase from "firebase";

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      function (user) {
        console.log(user);
        if (user) {
          // User is signed in.  this.props.navigation.navigate(user ? "App" : "Auth");
          this.props.navigation.navigate("App");
        } else {
          // No user is signed in.
          this.props.navigation.navigate("Auth");
        }
      }.bind(this)
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
