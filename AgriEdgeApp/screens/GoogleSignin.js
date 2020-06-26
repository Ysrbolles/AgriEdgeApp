// import { AppAuth } from 'expo-app-auth';
import * as AppAuth from "expo-app-auth";
// import * as AppAuth from 'expo-google-app-auth';
import * as GoogleSignIn from "expo-google-sign-in";
import { SocialIcon } from "react-native-elements";
import * as Constants from "expo-constants";
import React from "react";
import { Image, StyleSheet, Text, View, Platform } from "react-native";
import * as firebase from "firebase";
import GoogleSignInButton from "./GoogleSignInButton";
import GoogleProfile from "./GoogleProfile";
const { OAuthRedirect, URLSchemes } = AppAuth;

const isInClient = Constants.appOwnership === "expo";
if (isInClient) {
  GoogleSignIn.allowInClient();
}

const clientIdForUseInTheExpoClient = "";

/*
 * Redefine this one with your client ID
 *
 * The iOS value is the one that really matters,
 * on Android this does nothing because the client ID
 * is read from the google-services.json.
 */
const yourClientIdForUseInStandalone = Platform.select({
  android: "",
  ios: "",
});
const webClientId = "";
const clientId = isInClient
  ? clientIdForUseInTheExpoClient
  : yourClientIdForUseInStandalone;

export default class App extends React.Component {
  state = { user: null };

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.user.id
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
    var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
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
              alert(email);
              alert(errorCode);
              alert(errorMessage);
              alert(credential);
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      });
  };
  async componentDidMount() {
    try {
      await GoogleSignIn.initAsync({
        isOfflineEnabled: true,
        isPromptEnabled: true,
        clientId,
        webClientId,
      });
      this._syncUserWithStateAsync();
    } catch ({ message }) {
      //   alert('[GoogleSignIn][initAsync] message:' + message);
    }
  }

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    console.log("[GoogleSignIn][_syncUserWithStateAsync] user:", { user });
    this.setState({ user });
  };

  signOutAsync = async () => {
    try {
      await GoogleSignIn.signOutAsync();
      this.setState({ user: null });
    } catch ({ message }) {
      alert("[GoogleSignIn][signOutAsync] message: " + message);
    }
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert("[GoogleSignIn][signInAsync] Error:" + message);
    }
  };

  _syncUserWithStateAsync = async () => {
    /*
      const user = await GoogleSignIn.signInSilentlyAsync();
      this.setState({ user });
    */

    const data = await GoogleSignIn.signInSilentlyAsync();
    console.log("[GoogleSignIn][_syncUserWithStateAsync] data:", { data });
    if (data) {
      const photoURL = await GoogleSignIn.getPhotoAsync(256);
      const user = await GoogleSignIn.getCurrentUserAsync();
      this.setState({
        user: {
          ...user.toJSON(),
          photoURL: photoURL || user.photoURL,
        },
      });
    } else {
      this.setState({ user: null });
    }
  };

  get buttonTitle() {
    return this.state.user ? "Sign-Out of Google" : "Sign-In with Google";
  }

  render() {
    const scheme = {
      OAuthRedirect,
      URLSchemes,
    };
    const { user } = this.state;
    return (
      <View>
        {/* {user && <GoogleProfile {...user} />} */}
        <SocialIcon
          style={styles.button}
          title="Sign In With Google"
          button
          type="google"
          onPress={this._toggleAuth}
        />
        {/* <GoogleSignInButton onPress={this._toggleAuth}>
          {this.buttonTitle}
        </GoogleSignInButton> */}
        <Text>AppAuth: {JSON.stringify(scheme, null, 2)}</Text>
      </View>
    );
  }

  _toggleAuth = () => {
    console.log("Toggle", !!this.state.user);
    if (this.state.user) {
      this._signOutAsync();
    } else {
      this._signInAsync();
    }
  };

  _signOutAsync = async () => {
    try {
      // await GoogleSignIn.disconnectAsync();
      await GoogleSignIn.signOutAsync();
      console.log("[GoogleSignIn][_signOutAsync] Log out successful");
    } catch ({ message }) {
      console.error(
        "[GoogleSignIn][_signOutAsync] Demo: Error: logout: " + message
      );
    } finally {
      this.setState({ user: null });
    }
  };

  _signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      console.log({ type, user });
      if (type === "success") {
        alert("dkheeeeeeeeeeeeeeeelt");
        this.onSignIn(user);
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      console.error("[GoogleSignIn][_signInAsync] login: Error:" + message);
    }
  };
}

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 24,
//   },
//   image: { width: 128, borderRadius: 64, aspectRatio: 1 },
//   text: { color: 'black', fontSize: 16, fontWeight: '600' },
// });

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
