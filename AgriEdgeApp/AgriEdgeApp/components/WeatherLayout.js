import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";
import * as Location from "expo-location";

import DegreeComponent from "../components/DegreeComponent";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import getForecastEmoji from "../services/getForecastEmoji";
import dayjs from "dayjs";
import WeatherLayout from "../components/WeatherLayout";
import HorizontalFlatlist from "./HorizontalFlatliste";
export default class WeatherScreen extends React.Component {
  componentDidMount() {
    this._getuserLocation().then((position) => {
      console.log(position.coords.latitude);
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      this.getWeatherData();
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      days: [],
      currently: [],
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

  getWeatherData = async () => {
    axios
      .get(
        `https://api.darksky.net/forecast/7efd1aae347e80f7b870e069d3d60233/${this.state.latitude},${this.state.longitude}?units=ca&&lang=ar`
        // `https://api.darksky.net/forecast/7efd1aae347e80f7b870e069d3d60233/${this.state.latitude},${this.state.longitude}?lang=ar`
      )
      .then((WeatherData) => {
        // console.log(WeatherData.data.daily.data[0]);
        this.setState({ currently: WeatherData.data.currently });
        let WeatherDays = WeatherData.data.daily.data;

        // console.log(WeatherDays);
        var daily = [];
        WeatherDays.forEach((element, index) => {
          daily = daily.concat([
            {
              time: element.time,
              summary: element.summary,
              icon: element.icon,
              humidity: element.humidity,
              pressure: element.pressure,
            },
          ]);
        });

        this.setState({ days: daily });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  Item = ({ title }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.upperregion}
          source={require("../assets/mybg.png")}
        >
          <View style={styles.innerupperregion}>
            <Text style={styles.today}> TODAY </Text>
            <Text style={styles.degrees}>
              {" "}
              {this.state.currently.temperature}°C
            </Text>

            <Image
              style={styles.weathericon}
              source={require("../assets/weathericon.png")}
            />
            <Text style={styles.weathercondition}>Partly Sunny</Text>
          </View>

          <View style={styles.lowerinnerregion}>
            <Text style={[styles.addwhite, { fontSize: 18 }]}>
              MALMO, SWEDEN{" "}
            </Text>
            <Text style={[styles.addwhite, { fontSize: 14 }]}>8:40 pm</Text>
          </View>
        </ImageBackground>

        <View style={styles.lowerregion}>
          <View style={styles.fivecolumns}>
            <Text style={styles.columntitle}>MON</Text>
            {/* <Image style={styles.iconsmall} source={require('./assets/smallicon.png')} /> */}
            <Text style={styles.temp}>6/1</Text>
          </View>

          <View style={styles.fivecolumns}>
            <Text style={styles.columntitle}>TUE</Text>
            {/* <Image style={styles.iconsmall} source={require('./assets/smallicon.png')} /> */}
            <Text style={styles.temp}>6/4</Text>
          </View>

          <View style={styles.fivecolumns}>
            <Text style={styles.columntitle}>WED</Text>
            {/* <Image style={styles.iconsmall} source={require('./assets/smallicon.png')} /> */}
            <Text style={styles.temp}>6/20</Text>
          </View>

          <View style={styles.fivecolumns}>
            <Text style={styles.columntitle}>THU</Text>
            {/* <Image style={styles.iconsmall} source={require('./assets/smallicon.png')} /> */}
            <Text style={styles.temp}>5/15</Text>
          </View>

          <View style={styles.fivecolumns}>
            <Text style={styles.columntitle}>FRI</Text>
            {/* <Image style={styles.iconsmall} source={require('./assets/smallicon.png')} /> */}
            <Text style={styles.temp}>7/18</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperregion: {
    flex: 2,
    alignItems: "center",
  },

  lowerregion: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
  },

  innerupperregion: {
    marginTop: 120,
    backgroundColor: "transparent",
    alignItems: "center",
    flex: 2,
  },

  lowerinnerregion: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    alignItems: "center",
    paddingBottom: 20,
  },

  today: {
    fontSize: 21,
    color: "white",
  },

  degrees: {
    fontSize: 72,
    color: "white",
  },

  weathericon: {
    width: 120,
    height: 60,
    marginTop: 40,
  },

  weathercondition: {
    fontSize: 18,
    color: "white",
    marginTop: 20,
  },

  addwhite: {
    color: "white",
  },

  fivecolumns: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },

  columntitle: {
    fontSize: 13,
    color: "#2188db",
    fontWeight: "bold",
  },

  iconsmall: {
    width: 56,
    height: 32,
    marginTop: 30,
  },

  temp: {
    fontSize: 16,
    color: "#666666",
    marginTop: 20,
  },
});
