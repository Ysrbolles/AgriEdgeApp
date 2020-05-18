import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  creatStackNavigator,
  createStackNavigator,
} from "react-navigation-stack";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";

import * as firebase from "firebase";

import config from "./config";

firebase.initializeApp(config);

const AppStack = createStackNavigator({
  Home: HomeScreen,
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// import * as firebase from 'firebase';
// import * as Facebook from 'expo-facebook';
// import * as Expo from 'expo'

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyCYLV9uc0WcVfxt4T-dsO6vJt9EG4Bp27A",
//   authDomain: "agriapp-f01a1.firebaseapp.com",
//   databaseURL: "https://agriapp-f01a1.firebaseio.com",
//   projectId: "agriapp-f01a1",
//   storageBucket: "agriapp-f01a1.appspot.com",
//   messagingSenderId: "187270884302",
//   appId: "1:187270884302:web:c2920a88fb0cba1a49999f",
//   measurementId: "G-C57Y0R9LTQ",
// };

// firebase.initializeApp(firebaseConfig);
// Facebook.initializeAsync('526885078008360')

// import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

// export default class App extends React.Component {

//   constructor(props) {
//     super(props)

//     this.state = ({
//       email: '',
//       password: ''
//     })
//   }

//   componentDidMount() {

//     firebase.auth().onAuthStateChanged((user) => {
//       if (user != null) {
//         console.log(user)
//       }
//     })
//   }

//   signUpUser = (email, password) => {

//     try {

//       if (this.state.password.length < 6) {
//         alert("Please enter atleast 6 characters")
//         return;
//       }

//       firebase.auth().createUserWithEmailAndPassword(email, password)
//     }
//     catch (error) {
//       console.log(error.toString())
//     }
//   }

//   loginUser = (email, password) => {

//     try {

//       firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
//         console.log(user)

//       })
//     }
//     catch (error) {
//       console.log(error.toString())
//     }
//   }

//   async loginWithFacebook() {

//     //ENTER YOUR APP ID
//  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
//       '526885078008360',
//       { permissions: ['email', 'public_profile'] }
//   );
//     if (type == 'success') {

//       const credential = firebase.auth.FacebookAuthProvider.credential(token)

//       firebase.auth().signInWithCredential(credential).catch((error) => {
//         console.log(error)
//       })
//     }
//   }

//   render() {
//     return (
//       <Container style={styles.container}>
//         <Form>
//           <Item floatingLabel>
//             <Label>Email</Label>
//             <Input
//               autoCorrect={false}
//               autoCapitalize="none"
//               onChangeText={(email) => this.setState({ email })}
//             />

//           </Item>

//           <Item floatingLabel>
//             <Label>Password</Label>
//             <Input
//               secureTextEntry={true}
//               autoCorrect={false}
//               autoCapitalize="none"
//               onChangeText={(password) => this.setState({ password })}
//             />
//           </Item>

//           <Button style={{ marginTop: 10 }}
//             full
//             rounded
//             success
//             onPress={() => this.loginUser(this.state.email, this.state.password)}
//           >
//             <Text style={{ color: 'white' }}> Login</Text>
//           </Button>

//           <Button style={{ marginTop: 10 }}
//             full
//             rounded
//             primary
//             onPress={() => this.signUpUser(this.state.email, this.state.password)}
//           >
//             <Text style={{ color: 'white' }}> Sign Up</Text>
//           </Button>

//           <Button style={{ marginTop: 10 }}
//             full
//             rounded
//             primary
//             onPress={() => this.loginWithFacebook()}
//           >
//             <Text style={{ color: 'white' }}> Login With Facebook</Text>
//           </Button>

//         </Form>
//       </Container>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     padding: 10
//   },
// });
