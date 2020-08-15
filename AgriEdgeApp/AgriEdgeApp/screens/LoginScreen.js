import * as React from "react";
import { SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import * as firebase from "firebase";
import * as AppAuth from "expo-app-auth";
import PhoneAuth from "./PhneAuth";
import GoogleSign from "./GoogleSignin";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
// import firebase from 'firebase/app'
import "firebase/auth";

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
  Image,
  Button,
  Platform,
} from "react-native";

Facebook.initializeAsync("526885078008360");

const isAndroid = () => Platform.OS === "android";

export default class LoginScreen extends React.Component {
  static navigationOptions = { headerShown: false };
  state = {
    phone: "",
    useProxy: null,
    confirmResult: null,
    code: "",
    loading: true,
    errorMessage: null,
    user: null,
    nonce: null,
  };
  //------------------------------------------------------------
  reset = () => {
    this.setState({
      phone: "",
      confirmResult: null,
      code: "",
    });
  };

  async loginWithFacebook() {
    //ENTER YOUR APP ID
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "526885078008360",
      {
        permissions: ["email", "public_profile"],
      }
    );
    if (type == "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then((result) => {
          if (result.additionalUserInfo.isNewUser) {
            firebase
              .database()
              .ref("/users/" + result.user.uid)
              .set({
                email: result.additionalUserInfo.profile.email,
                // profile_picture: result.additionalUserInfo.profile.picture.data.uri,
                first_name: result.additionalUserInfo.profile.first_name,
                last_name: result.additionalUserInfo.profile.last_name,
                created_at: Date.now(),
              })
              .then((snapshot) => {
                console.log("Snapshot", snapshot);
              });
          } else {
            firebase
              .database()
              .ref("/users/" + result.user.uid)
              .update({
                last_logged_in: Date.now(),
              });
          }
        });
    }
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidStandaloneAppClientId:
          "962329281029-rjlaje3f9t5qpomqv5i64gg6l3qcr8f5.apps.googleusercontent.com",
        androidClientId:
          "962329281029-rth19l58b3rc65o8j9a2nhnd4ujd2enj.apps.googleusercontent.com",
        iosClientId:
          "962329281029-h157odq28jntnmvk4m2k5po6ev5ifdqp.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        alert("done");
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        {/* <Image
          style={{
            marginTop: -30,
            alignSelf: "center",
            height: 200,
            width: 400,
          }}
          source={require("../assets/header_illus-min.png")}
        /> */}
        <Image
          style={{
            marginTop: 150,
            alignSelf: "center",
            height: 110,
            width: 150,
          }}
          source={require("../assets/logo.png")}
        />
        {/* <Text style={styles.greeting}>{this.state.user}</Text> */}

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>
        <View style={styles.form}>
          <View>
            <PhoneAuth />
          </View>
        </View>
        {/* <Text style={{ textAlign: "center", marginBottom: 30 }}>
          ______________________ OR ______________________
          {this.state.user}
        </Text> */}
        {/* <PhoneAuth /> */}
        {/* <SocialIcon
          title="Sign In With Facebook"
          button
          type="facebook"
          onPress={this.loginWithFacebook}
        />
        <GoogleSign /> */}
        {/* <SocialIcon
          style={styles.button}
          title="Sign In With Google"
          button
          type="google"
          onPress={this.signInWithGoogleAsync}
        /> */}
        {/* * <Text style={styles.greeting}>{this.state.user}</Text>  */}
        {/* <Text onPress={this.onPress}>Toggle Auth</Text>;   */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 25,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: "#5ABD8C",
    borderRadius: 25,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  stretch: {},
});
