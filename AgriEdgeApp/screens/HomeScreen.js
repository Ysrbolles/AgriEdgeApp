import React from "react";
import MapView, {
  AnimatedRegion,
  Animated,
  Polyline,
  Marker,
} from "react-native-maps";
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
    headerShown: false,
  };
  componentDidMount() {
    this._getuserLocation().then((position) => {
      console.log(position.coords);
      this.setState({
        userlocation: position,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }
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
  onRegionChange(region) {
    this.state.region.setValue(region);
  }

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#b3e6ff"
          barStyle="dark-content"
          hidden={true}
          translucent={true}
        />
        <MapView
          mapType="satellite"
          style={styles.mapStyle}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
        />
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
    height: Dimensions.get("window").height - 40,
  },
});
