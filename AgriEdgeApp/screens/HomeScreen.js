import React from "react";
import MapView, {
  AnimatedRegion,
  Animated,
  Polyline,
  Marker,
  Polygon
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
    headerShown: false,
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
            latitudeDelta: 0.010,
            longitudeDelta: 0.010,
          }}
          showsUserLocation={true}
         
        >
        <Marker coordinate={{latitude: 32.8025259, longitude:-7.4351431}}/>
        <Polygon coordinates={[
         { name: '1', latitude: 32.8025259, longitude: -7.4351431},
         { name: '2', latitude: 32.7946386, longitude: -7.421646},
         { name: '3', latitude: 32.7665248, longitude: -7.4165628},
         { name: '4', latitude: 32.7834153, longitude: -7.4527787},
         { name: '5', latitude: 32.7948105, longitude: -7.4596065},
        ]}
        fillColor={'rgba(240, 255, 0, 0.5)'}
        />
        </MapView>
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
