import * as React from "react";
import { SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import * as firebase from "firebase";
import PhoneAuth from "./PhneAuth";
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
  Platform
} from "react-native";

Facebook.initializeAsync("526885078008360");

const isAndroid = () => Platform.OS === 'android';

export default class LoginScreen extends React.Component {
  static navigationOptions = { headerShown: false };
  state = {
    phone: "",
    user: null,
    confirmResult: null,
    code: "",
    loading: true,
    errorMessage: null,
  };
  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     this.setState({ user, loading: false });
  //   });
  // }

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
        .signInWithCredential(credential)
        .catch((error) => {
          console.log(error);
        });
    }
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  };
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        clientId: isAndroid() ? '962329281029-15vdipakauub9ssgpcqsh4nqhpn47tnu.apps.googleusercontent.com' : '962329281029-h157odq28jntnmvk4m2k5po6ev5ifdqp.apps.googleusercontent.com',
        // androidStandaloneAppClientId:
        //   "962329281029-15vdipakauub9ssgpcqsh4nqhpn47tnu.apps.googleusercontent.com",
        // iosClientId:
        //   "962329281029-h157odq28jntnmvk4m2k5po6ev5ifdqp.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
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
        <Image
          style={{
            marginTop: -30,
            alignSelf: "center",
            height: 200,
            width: 400,
          }}
          source={require("../assets/header_illus-min.png")}
        />
        <Image
          style={{ marginTop: -45, alignSelf: "center" }}
          source={require("../assets/logo.png")}
        />
        {/* <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text> */}

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
        <Text style={{ textAlign: "center", marginBottom: 30 }}>
          ______________________ OR ______________________
        </Text>
        {/* <PhoneAuth /> */}
        <SocialIcon
          title="Sign In With Facebook"
          button
          type="facebook"
          onPress={this.loginWithFacebook}
        />
        <SocialIcon
          style={styles.button}
          title="Sign In With Google"
          button
          type="google"
          onPress={this.signInWithGoogleAsync}
        />
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
