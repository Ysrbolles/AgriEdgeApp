import * as React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Button,
  Image,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import { SocialIcon, Input, Overlay } from "react-native-elements";

export default function App() {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === "web"
      ? {
          text:
            "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
        }
      : undefined
  );

  const SendCode = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      showMessage({
        text: "Verification code has been sent to your phone.",
      });
    } catch (err) {
      showMessage({ text: `Error: ${err.message}`, color: "red" });
    }
  };
  const [visible, setVisible] = React.useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text>Enter phone number</Text>
      <Input
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="Phone Number"
        leftIcon={{ type: "font-awesome", name: "phone" }}
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(phoneNumber) => setPhoneNumber("+212"+phoneNumber)}
      />
      <TouchableOpacity
        rounded
        style={styles.button}
        onPress={async () => {
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
              text: "Verification code has been sent to your phone.",
            });
            toggleOverlay();
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      >
        <Text style={{ fontSize: 24, alignSelf: "center", color: "#FFF" }}>
          Send Code
        </Text>
      </TouchableOpacity>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View>
          <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
          <TextInput
            style={{ marginVertical: 10, fontSize: 17 }}
            editable={!!verificationId}
            placeholder="123456"
            onChangeText={setVerificationCode}
          />
          <TouchableOpacity
            rounded
            style={styles.button}
            disabled={!verificationId}
            onPress={async () => {
              try {
                const credential = firebase.auth.PhoneAuthProvider.credential(
                  verificationId,
                  verificationCode
                );
                await firebase.auth().signInWithCredential(credential);
                showMessage({ text: "Phone authentication successful 👍" });
              } catch (err) {
                showMessage({ text: `Error: ${err.message}`, color: "red" });
              }
            }}
          >
            <Text style={{ fontSize: 24, alignSelf: "center", color: "#FFF" }}>
              Confirm Code
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: "15px",
    color: "blue",
  },
  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#00BCD4",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  myButton: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#23b11b",
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: "#5ABD8C",
    borderRadius: 20,
    height: 46,
    width: 340,
    alignItems: "center",
    justifyContent: "center",
  },
});
