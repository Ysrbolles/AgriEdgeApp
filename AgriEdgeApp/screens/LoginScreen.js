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
} from "react-native";

Facebook.initializeAsync("526885078008360");
// const recaptchaVerifier = React.useRef(null);
// const [phoneNumber, setPhoneNumber] = React.useState();
// const [verificationId, setVerificationId] = React.useState();
// const [verificationCode, setVerificationCode] = React.useState();
// const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
// const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
//   ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
//   : undefined);
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

  login = async () => {
    //alert(this.state.num)
    console.log(this.state.phone);

    let token = null;
    const listener = ({ url }) => {
      WebBrowser.dismissBrowser();
      const tokenEncoded = Linking.parse(url).queryParams["token"];
      if (tokenEncoded) token = decodeURIComponent(tokenEncoded);
    };
    Linking.addEventListener("url", listener);
    await WebBrowser.openBrowserAsync(captchaUrl);
    Linking.removeEventListener("url", listener);
    if (token) {
      const { phone } = this.state;
      //fake firebase.auth.ApplicationVerifier
      const captchaVerifier = {
        type: "recaptcha",
        verify: () => Promise.resolve(token),
      };
      try {
        const confirmResult = await firebase
          .auth()
          .signInWithPhoneNumber(phone, captchaVerifier);
        this.setState({ confirmResult });
      } catch (e) {
        console.warn(e);
      }
    }
  };
  verify = async () => {
    const { confirmResult, code } = this.state;
    try {
      await confirmResult.confirm(code);
    } catch (e) {
      console.warn(e);
    }
    this.reset();
  };

  logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.warn(e);
    }
  };

  reset = () => {
    this.setState({
      phone: "",
      confirmResult: null,
      code: "",
    });
  };
  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ errorMessage: error.message }));
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

  async signInWithGoogleAsync() {
    try {
      const { type, idToken, accessToken } = await Google.logInAsync({
        androidClientId:
          "962329281029-15vdipakauub9ssgpcqsh4nqhpn47tnu.apps.googleusercontent.com",
        iosClientId:
          "962329281029-h157odq28jntnmvk4m2k5po6ev5ifdqp.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        const crdnt = firebase.auth.GoogleAuthProvider.credential(
          idToken,
          accessToken
        );
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(crdnt)
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

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
