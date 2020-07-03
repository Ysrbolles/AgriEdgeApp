import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
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
      latitude: 32.875739,
      longitude: -6.931648,
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      i: 0,
      sym: 0,
      sign: 0,
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
  undo(){
    console.debug(this.state.coordinates)
    this.state.coordinates.slice().splice(this.state.coordinates.length, 1)
    // .then(() => {
    //   console.debug('OK')
    // })
    // .catch((er) => console.debug(er))
   this.setState({
      coordinates: [this.state.coordinates]}, () => {
        this.setState({
          polygons: [this.state.coordinates],
        });
    });
    console.debug(this.state.coordinates)
  }
  clear() {
    this.setState({
      sym: 0,
      coordinates: [],
      polygons: []
    });
  }
  onPress(e) {
    // console.debug(e);
      this.setState({
        longitude: e.nativeEvent.coordinate.longitude,
        latitude: e.nativeEvent.coordinate.latitude,
        coordinates: [...this.state.coordinates, e.nativeEvent.coordinate]}, () => {
          if (this.state.coordinates.length >= 1)
          this.setState({
            polygons: [this.state.coordinates],
          });
        });
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
        <MapView
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
        <TouchableOpacity
            onPress={() => this.finish()}
            style={[styles.bubble, styles.button]}
          >
            <Text>tap to draw</Text>
          </TouchableOpacity>
        <View style={styles.buttonContainer}>
        <Icon.Button
           name="check"
           onPress={() => this.finish()}
         >
           Finish
         </Icon.Button>
        <Icon.Button
           iconStyle="{marginRight: 10}"
           name="eraser"
           onPress={() => this.clear()}
         >
           Clear
         </Icon.Button>

        </View>
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
    backgroundColor: "rgba(153,153,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    // width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
    
  },
});
