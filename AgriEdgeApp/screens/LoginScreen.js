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
          .then(() => {
            console.log("aha ana");
          })
          .catch((err) => {
            console.log("mabghitch wae    " + err);
          });
        console.log("done");
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    // let {loading, confirmResult, user} = this.state

    // if (loading) return (
    //   <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    //     <ActivityIndicator size='large' color='#0000ff' /> 
    //   </View>
    // )
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View>
          {/* <Text style={{fontSize: 24}}>You're in</Text>
          
          <TouchableOpacity style={styles.btn}
            onPress = {this.logout}>
            <Text style={{fontSize: 24, alignSelf: 'center', color: '#FFF'}}>Logout</Text>
          </TouchableOpacity> */}
            {/* <PhoneAuth /> */}
            {/* <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput */}
            {/* style={{ marginVertical: 10, fontSize: 17 }}
              placeholder="+1 999 999 9999"
              autoFocus
              autoCompleteType="tel"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            ></TextInput> */}
          </View>
        </View>
        {/* 
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Send Code</Text>
        </TouchableOpacity> */}

        <SocialIcon
          title="Sign In With Facebook"
          button
          type="facebook"
          onPress={this.loginWithFacebook}
        />
        <SocialIcon
          title="Sign In With Facebook"
          button
          type="google"
          onPress={this.signInWithGoogleAsync}
        />
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            New to SocialApp?{" "}
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
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
    marginHorizontal: 30,
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
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
