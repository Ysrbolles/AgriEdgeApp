import React, { useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
function PhoneNumberScreen({ navigation }) {
  const [phone, setPhone] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const recaptchaVerifier = useRef(null);
  sendCode = () => {
    if (phone.length >= 9) {
      setLoading(true);
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber(phone, recaptchaVerifier.current)
        .then((id) => {
          setLoading(false);
          navigation.navigate("verify", { verificationId: id });
        })
        .catch((e) => console.log(e));
    } else {
      alert("Numéro invalide");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require("../assets/images/image.png")} /> */}
      <Text style={styles.title}>
        Connectez vous avec votre numéro de téléphone
      </Text>
    <TextInput
              style={styles.input}
              placeholder="+1 999 999 9999"
             placeholderTextColor="red"
              autoFocus
              autoCompleteType="tel"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              onChangeText={setPhone}
            ></TextInput> 
      <TouchableOpacity onPress={sendCode} style={styles.button}>
        {loading ? (
          <ActivityIndicator color="red" />
        ) : (
          <Text style={styles.textButton}>Envoyer</Text>
        )}
      </TouchableOpacity>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87c965",
  },
  title: {
    textAlign: "center",
    marginTop: 20,
    width: "60%",
    fontSize: 17,
    marginBottom: 20,
    color: "red",
    // fontFamily: "muli",
  },
  input: {
    width: "60%",
    color: "red",

    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "red",
    // fontFamily: "muli",
    marginBottom: 20,
  },
  button: {
    width: "50%",
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  textButton: {
    // fontFamily: "muli",
    color: "#87c965",
  },
});
export default PhoneNumberScreen;
