import React from "react";
import MapView, {
  AnimatedRegion,
  Animated,
  Polyline,
  Marker,
  Polygon,
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
      sym: 0,
      coordinates: [],
      polygons: [],
      editing: null,
      test: [],
    };
  }

  componentDidMount() {
    this._getuserLocation().then((position) => {
      this.setState({
        userlocation: position,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
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
  finish() {
    if (this.state.coordinates.length > 2 && this.state.sym == 0) {
      this.setState({
        polygons: [this.state.coordinates],
      });
      this.setState({
        coordinates: [],
        sym: 1,
      });
    }
  }
  clear() {
    this.setState({
      sym: 0,
      coordinates: [],
    });
  }
  onPress(e) {
    // console.debug(e);
    if (this.state.sym == 0) {
      this.setState({
        coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
      });
      if (this.state.coordinates.length >= 1)
        this.setState({
          polygons: [this.state.coordinates],
        });
      console.debug(this.state.coordinates);
    } else {
      console.debug(e.nativeEvent.coordinate);
      alert(
        e.nativeEvent.coordinate.latitude +
          " , " +
          e.nativeEvent.coordinate.longitude
      );
    }
  }

  render() {
    const mapOptions = {
      scrollEnabled: true,
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
      mapOptions.onPanDrag = (e) => this.onPress(e);
    }
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        {/* <MapView
          mapType="satellite"
          style={styles.mapStyle}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          onPress={(e) => this.onPress(e)}
          {...mapOptions}
          showsUserLocation={true}
        >
          {this.state.coordinates.map((marker, index) => (
            <Marker
              key={marker.name}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            ></Marker>
          ))}
          {this.state.polygons.map((polygon) => (
            <Polygon
              onPress={(e) => this.onPress(e)}
              coordinates={polygon}
              strokeColor="#F00"
              fillColor={"rgba(240, 255, 0, 0.5)"}
              strokeWidth={1}
            />
          ))}
        </MapView>
        <View style={styles.buttonContainer}> */}
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.finish()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Finish</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.clear()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Clear</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height - 40,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
  bubble: {
    backgroundColor: "rgba(255,255,0,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
});
