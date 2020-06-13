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
      coordinates: [],
      polygons: [],
      editing: null,
      test: [],
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
  finish(){
    this.setState({
      polygons: [this.state.coordinates],
    });
    this.setState({
      coordinates: [],
    });
  }
  onPress(e) {
    // console.debug(e);
    this.setState({
        coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
    });
  }

  render() {
    const mapOptions = {
      scrollEnabled: true,
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
      mapOptions.onPanDrag = e => this.onPress(e);
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
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={e => this.onPress(e)}
          {...mapOptions}
          showsUserLocation={true}
        >
         {
            this.state.coordinates.map((marker, index) => (
              <Marker
                key={marker.name}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              >

              </Marker>
            ))
          }
         {
           this.state.polygons.map((polygon) => (
            <Polygon
            coordinates={polygon}
            strokeColor="#F00"
            fillColor={'rgba(240, 255, 0, 0.5)'}
            strokeWidth={1}
            />
          ))
         }
        </MapView>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.finish()}
              style={[styles.bubble, styles.button]}
            >
              <Text>Finish</Text>
            </TouchableOpacity>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  bubble: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    color: 'rgb(0, 0, 0)',
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  }
});
