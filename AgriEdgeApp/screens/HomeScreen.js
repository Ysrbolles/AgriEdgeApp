import React from "react";
import MapView, {
  AnimatedRegion,
  Animated,
  Polyline,
  Marker,
} from "react-native-maps";
// import {Location} from 'expo'
import * as Location from "expo-location";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
  LayoutAnimation,
} from "react-native";
import * as firebase from "firebase";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;

    this.setState({ email, displayName });
    this._getuserLocation().then((poseition) => {
      console.log(poseition.coords);
      this.setState({
        userlocation: poseition,
        latitude: poseition.coords.latitude,
        longitude: poseition.coords.longitude,
      });
    });
    console.log(this.state.userlocation);
  }
  // componentWillMount(){
  //   this._getuserLocation()
  // }

  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      markers: [],
      mapType: null,
      errorMessage: "",
      userlocation: [{}],
      latitude: null,
      longitude: null,
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
    };
  }

  _getuserLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    // if (status !== 'granted') {
    //   setErrorMsg('Permission to access location was denied');
    // }

    // let location = await Location.getCurrentPositionAsync({});

    if (status !== "granted") {
      console.log("Permission not granted");

      this.setState({
        errorMessage: "Permission not granted",
      });
    }

    const location = await Location.getCurrentPositionAsync({});

    return location;
  };
  switchMapType() {
    console.log("Changing");
    this.state.mapType = "satellite";
  }
  signOutUser = () => {
    firebase.auth().signOut();
  };
  getInitialState() {
    return {
      region: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    };
  }

  onRegionChange(region) {
    this.state.region.setValue(region);
  }

  render() {
    const searchData = this.state.userlocation.coords;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#b3e6ff"
          barStyle="dark-content"
          hidden={true}
          translucent={true}
        />
        {/* <MapView
          style={styles.mapStyle}
          mapType="satellite"
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          showsUserLocation={true}
        ></MapView> */}
        <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
