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

import { Notifications } from "expo";
// import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { SocialIcon, Input, Overlay } from "react-native-elements";
import * as firebase from "firebase";
import Nodes from "../services/Nodes";
import registerForPushNotificationsAsync from "../services/Notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });
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
      origine: [],
      editing: null,
      test: [],
      draw: false,
      btn: true,
      addnode: true,
      visible: false,
      capteur: true,
      currentUser: [],
      Notification: {},
      color: "rgba(76, 166, 79, 0.5)",
    };
  }
  async componentDidMount() {
    this.state.currentUser = await firebase.auth().currentUser;
    registerForPushNotificationsAsync(this.state.currentUser);

    Notifications.addListener(this.handleNotification);

    this._getuserLocation().then((position) => {
      this.setState({
        userlocation: position,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    this.getUser();
  }
  handleNotification = (notification) => {
    if (notification && notification.origin !== "received") {
      const { data } = notification;
      console.debug('*****************')
      console.log(data)
      console.debug('*****************')
      if (data.check > 70) {
        for(let i = 0; i < this.state.polygons.length; i++){
          if(this.state.polygons[i].NodeID == data.Id){
          this.state.polygons[i].color= "rgba(209, 4, 0, 0.5)"
            this.setState({polygons: this.state.polygons});
          }
        }
      }
      console.log(data.check);
      // const meetingId = data.meetingId;
    }
    //     if (meetingId) {
    //         this.props.navigation.navigate('Details', { meetingId });
    //     }
    // }
  };

  _handleNotification = (notification) => {
    this.setState({ notification: notification });
    console.log('notification');
  };

  _handleNotificationResponse = (response) => {
    console.log(response);
  };
  // async componentDidMount() {
  //   this.state.currentUser = await firebase.auth().currentUser;

  //   await this.registerForPushNotificationsAsync();
  // }
  getUser = async () => {
    let i = [];
    let t = [];
    const user = await firebase.auth().currentUser;
    this.setState({
      uidAPP: user.uid,
    });
    Nodes.getNodes(this.state.uidAPP).then((res) => {
      if (res.length > 0) {
        console.log(res[0].poly)
        for (let x = 0; x < res.length; x++) {
          t.push({latitude : res[x].latitude, longitude : res[x].longitude });
          i.push(res[x].poly[0]);
        }
        this.setState(
          {
            markers: t,
            draw: true,
            btn: true,
            addnode: true,
            capteur: false,
          },
          () => {
            this.setState({
              polygons: i,
            });
          }
        );
      }
    });
  };

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
    if (this.state.coordinates.length > 2) {
      let i = this.state.polygons
      i.push({coord: [this.state.coordinates], NodeID: '', color: "rgba(76, 166, 79, 0.5)"});
      this.setState({
        polygons: i,//[...this.state.polygons, this.state.coordinates],
        // temp: [...this.state.origine, this.state.polygons[this.state.polygons.length - 1]]
        temp: [this.state.polygons[this.state.polygons.length - 1]],
      });
      this.setState({
        btn: true,
        addnode: false,
        coordinates: [],
        sym: 1,
        capteur: false,
      });
    }
    console.debug(this.state.polygons.length);
  }
  clear() {
    this.setState({
      sym: 0,
      coordinates: [],
      polygons: [],
    });
  }
 
  onPress(e) {
    if (this.state.sym == 1) {
      this.props.navigation.navigate("AddNode", {
        polygone: this.state.temp,
        clocal: e.nativeEvent.coordinate,
        g: this.khroj,
      });
    } else {
      this.setState({ draw: true });
      if (this.state.coordinates.length > 2) this.setState({ btn: false });
      this.setState(
        {
          longitude: e.nativeEvent.coordinate.longitude,
          latitude: e.nativeEvent.coordinate.latitude,
          coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
        },
        () => {
          if (this.state.coordinates.length >= 3){
            let i = this.state.polygons
            i.push({coord: [this.state.coordinates], NodeID: '', color: "rgba(76, 166, 79, 0.5)"});
            console.log(i)
            this.setState({
              polygons: i,//[...this.state.polygons, {coord: this.state.coordinates, NodeID: '', color: "rgba(76, 166, 79, 0.5)"}],
            });
          }
        }
      );
    }
  }
  khroj() {
    console.log("-----------------------------------------------");
    console.log("Ana dkhelt hna");
    console.log("-----------------------------------------------");
    // this.props.navigation.goBack();
  }
  closeScreen = () => {
    this.props.navigation.goBack();
  };
  render() {
    const addtodraw = (
      <View style={styles.buttonContainer}>
        <Icon.Button backgroundColor="rgba(49, 205, 38, 0.7)">Tap in the map to draw</Icon.Button>
      </View>
    );
    const addbtn = (
      <View style={styles.buttonContainer}>
        <Icon.Button backgroundColor="rgba(49, 205, 38, 0.7)" name="check" onPress={() => this.finish()}>
          Finish
        </Icon.Button>
        <Icon.Button
        backgroundColor="rgba(49, 205, 38, 0.7)"
          iconStyle="{marginRight: 10}"
          name="eraser"
          onPress={() => this.clear()}
        >
          Clear
        </Icon.Button>
      </View>
    );
    const ca = (
      this.state.markers.map((marker) => (
        <Marker
          key={marker.name}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
        >
         <Image style={styles.cc} source={require("../assets/Capteur.png")} />
      </Marker>
      ))
    );
    const addnode = (
      <View style={styles.buttonContainer}>
        <Icon.Button  backgroundColor="rgba(52, 218, 40, 0.5)" name="plus" onPress={() => alert("Click on the polygone")}>
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
              coordinates={polygon.coord[0]}
              strokeColor="#F00"
              fillColor={polygon.color}
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
    backgroundColor: "transparent"
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
