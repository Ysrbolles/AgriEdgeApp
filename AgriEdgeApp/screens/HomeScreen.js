import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView, {
  AnimatedRegion,
  Animated,
  Polyline,
  Marker,
  Polygon,
} from "react-native-maps";
import AddScreen from "./AddNodes";
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
import { SocialIcon, Input, Overlay } from "react-native-elements";
import * as firebase from "firebase";
import Nodes from "../services/Nodes";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    // this.getUser();
    this.state = {
      uidAPP: null,
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
      coordinates: [],
      polygons: [],
      editing: null,
      test: [],
      draw: false,
      btn: true,
      addnode: true,
      visible: false,
      capteur: true,
    };
  }
  getUser = async () => {
    const user = await firebase.auth().currentUser;
    this.setState({
      uidAPP: user.uid,
    }); /*
    Nodes.getNodes(this.state.uidAPP)
        .then((res) => {
          if (res.length > 0){
          console.debug("Name is :"+res.NodeId)
          //   this.setState({ //
          //   // polygons: res.poly,
          //   // markers: res.poly[0],
          //   sym: 1,
          //   draw: true,
          //   btn: true,
          //   addnode: true,
          //   // capteur: false 
          // })
          }
        })
        .finally(() => this.setState({ refreshing: false }));*/
  };

  componentDidMount() {
    this._getuserLocation().then((position) => {
      this.setState({
        userlocation: position,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      // this.getUser()
      Nodes.getNodes("lrt070MC8hVzdJlxpL6QvyfKzS83").then((res) => {
        if (res.length > 0) {
          console.log("mlawiiiiiiiiiiio");
          // console.debug(res[0].poly[0][0])
          // for (let i = 0; i < res[0].poly[0].length; i++) {
          //   console.log(
          //     "||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
          //   );

          //   console.log(res[0].poly[0][i]);
          //   console.log(
          //     "||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||"
          //   );
          //   this.state.polygons.push(res[0].poly[0][i]);
          // }
          this.setState({
            //
            // polygons: res[0].poly[0][0],
            //   markers: res[0].poly[0][0],
            //   sym: 1,
            //   draw: true,
            //   btn: true,
            //   addnode: true,
            //   // capteur: false
          });
        }
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
      let i = this.state.coordinates[0];
      console.debug(i);
      this.setState({
        polygons: [this.state.coordinates],
      });
      this.setState({
        btn: true,
        addnode: false,
        markers: i,
        coordinates: [],
        sym: 1,
        capteur: false,
      });
    }
  }
  undo() {
    console.debug(this.state.coordinates);
    this.state.coordinates.slice().splice(this.state.coordinates.length, 1);
    this.setState(
      {
        coordinates: [this.state.coordinates],
      },
      () => {
        this.setState({
          polygons: [this.state.coordinates],
        });
      }
    );
    console.debug(this.state.coordinates);
  }
  clear() {
    this.setState({
      sym: 0,
      coordinates: [],
      polygons: [],
    });
  }
  onPress(e) {
    if (this.state.sym == 0) {
      this.setState({ draw: true });
      if (this.state.coordinates.length > 2) this.setState({ btn: false });
      this.setState(
        {
          longitude: e.nativeEvent.coordinate.longitude,
          latitude: e.nativeEvent.coordinate.latitude,
          coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
        },
        () => {
          if (this.state.coordinates.length >= 1)
            this.setState({
              polygons: [this.state.coordinates],
            });
        }
      );
    }
  }
  render() {
    const addtodraw = (
      <TouchableOpacity
        onPress={() => this.finish()}
        style={[styles.bubble, styles.button]}
      >
        <Text>tap to draw</Text>
      </TouchableOpacity>
    );
    const addbtn = (
      <View style={styles.buttonContainer}>
        <Icon.Button name="check" onPress={() => this.finish()}>
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
    );
    const ca = (
      <Marker
        key="cc"
        coordinate={{
          latitude: this.state.markers.latitude,
          longitude: this.state.markers.longitude,
        }}
      >
        <Image style={styles.cc} source={require("../assets/Capteur.png")} />
      </Marker>
    );
    const addnode = (
      <View style={styles.buttonContainer}>
        <Icon.Button
          name="plus"
          onPress={() =>
            this.props.navigation.navigate("AddNode", {
              polygone: this.state.polygons,
            })
          }
        >
          Add Node
        </Icon.Button>
      </View>
    );
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
          {this.state.polygons.map((polygon) => (
            <Polygon
              onPress={(e) => this.onPress(e)}
              coordinates={polygon}
              strokeColor="#F00"
              fillColor={"rgba(76, 166, 79, 0.5)"}
              strokeWidth={1}
            />
          ))}
          {this.state.coordinates.map((marker) => (
            <Marker
              key={marker.name}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            >
              {/* <Image source={require("../assets/Capteur.png")} /> */}
            </Marker>
          ))}
          {this.state.capteur ? null : ca}
        </MapView>
        {this.state.draw ? null : addtodraw}
        {this.state.btn ? null : addbtn}
        {this.state.addnode ? null : addnode}
        <Overlay
          isVisible={this.state.visible}
          onBackdropPress={this.toggleOverlay}
        >
          <AddScreen />
        </Overlay>
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
  cc: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: "contain",
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
