import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import getForecastEmoji from "../services/getForecastEmoji";
import dayjs from "dayjs";
import HorizontalFlatliste from "./HorizontalFlatliste";
import { TrackingConfiguration } from "expo/build/AR";
import IconFA from "react-native-vector-icons/FontAwesome";
import Icon from "./helpers/weatherIcons/weatherIcons";
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
      hourly: [],
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
        let hours = WeatherData.data.hourly.data;
        // console.log(WeatherDays);
        let hourly = [];
        hours.forEach((element, index) => {
          hourly = hourly.concat([
            {
              time: element.time,
              summary: element.summary,
              icon: element.icon,
              humidity: element.humidity,
              pressure: element.pressure,
              temperature: element.temperature,
            },
          ]);
        });
        var daily = [];
        WeatherDays.forEach((element, index) => {
          daily = daily.concat([
            {
              time: element.time,
              summary: element.summary,
              icon: element.icon,
              humidity: element.humidity,
              pressure: element.pressure,
              temperatureMin: element.temperatureMin,
              temperatureMax: element.temperatureMax,
            },
          ]);
        });

        this.setState({ days: daily, hourly: hourly });
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

  listDays() {
    return this.state.days.map((element) => {
      console.log("**************************************");
      console.log(element);
      return (
        <View style={styles.fivecolumns}>
          <Text style={styles.columntitle}>
            {""}
            {dayjs(new Date(element.time * 1000)).format("ddd")}
          </Text>
          <Text>{getForecastEmoji(element.icon)}</Text>
          {/* <Image style={styles.iconsmall} source={require('./assets/smallicon.png')} /> */}
          <Text style={styles.temp}>
            {Math.round(element.temperatureMax)}°C
          </Text>
        </View>
      );
    });
  }
  renderElement = ({ item }) => {
    console.log(item);
    return (
      <View style={styles.containerForecast}>
        <View style={styles.iconForecast}>
          <Text>{getForecastEmoji(item.icon)}</Text>
        </View>
        <View style={styles.tempreatureForecast}>
          <Text>
            {Math.round(item.temperature)}
          </Text>
        </View>
        <View style={styles.dayForecast}>
          <Text> {dayjs(new Date(item.time * 1000)).format("hh:mm a")}</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.upperregion}
          source={require("../assets/test.jpg")}
        >
          <View style={styles.innerupperregion}>
          <Text style={[styles.addwhite, { fontSize: 20 }]}>
              {dayjs(new Date(this.state.currently.time * 1000)).format(
                "hh:mm a"
              )}
            </Text>
            <Text style={styles.today}>
              {" "}
              {dayjs(Date.now()).format("ddd MMMM D, YYYY")}{" "}
            </Text>
            <Text style={styles.degrees}>
              {Math.round(this.state.currently.temperature)}°C
            </Text>

            <Text>{getForecastEmoji(this.state.currently.icon)}</Text>
            <Text style={styles.weathercondition}>
              {this.state.currently.summary}
            </Text>
          </View>

          <View style={styles.lowerinnerregion}>
            {/* <Text style={[styles.addwhite, { fontSize: 18 }]}>
              MALMO, SWEDEN{" "}
            </Text> */}
            {/* <Text style={[styles.addwhite, { fontSize: 14 }]}>
              {dayjs(new Date(this.state.currently.time * 1000)).format(
                "hh:mm a"
              )}
            </Text> */}
            <View style={[styles.addwhite, {marginTop: 20}]}>
            <FlatList
              style={styles.listForecast}
              horizontal
              data={this.state.hourly}
              renderItem={this.renderElement}
              ItemSeparatorComponent={() => (
                <View style={styles.separator}></View>
              )}
            />
          </View>
          </View>
         
        </ImageBackground>
        {/* <View style={styles.lowerregion}>
          <View style={{ flexDirection: "column" }}>
            <FlatList
              style={styles.listForecast}
              horizontal
              data={this.state.days}
              renderItem={this.renderElement}
              ItemSeparatorComponent={() => (
                <View style={styles.separator}></View>
              )}
            />
          </View> */}
        {/* <View>{this.listDays()}</View> */}
        {/* </View> */}
        {/* <ScrollView horizontal={true}>" "{this.listDays()}</ScrollView> */}
        
        <View style={styles.lowerregion}>
         
           {this.listDays()}
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
    height: 5,
  },

  innerupperregion: {
    marginTop: 90,
    backgroundColor: "transparent",
    alignItems: "center",
    flex: 2,
  },

  lowerinnerregion: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    alignItems: "center",
    paddingBottom: 40,
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
    width: 100,
    height: 100,
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
    flex: 2,
    paddingTop: 20,
    alignItems: "center",
  },

  columntitle: {
    fontSize: 13,
    color: "#2188db",
    fontWeight: "bold",
  },

  iconsmall: {
    width: 100,
    height: 400,
    marginTop: 3,
  },

  temp: {
    fontSize: 16,
    color: "#666666",
    marginTop: 20,
  },
  content: {
    flex: 2,
  },
  placeName: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  placeText: {
    marginLeft: 5,
    fontSize: 14,
    color: "white",
  },
  temperatureNumber: {
    fontSize: 100,
    color: "white",
    fontWeight: "400",
  },
  currentContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  conditionCurrentTemperature: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  conditionCurrentText: {
    color: "white",
    fontSize: 15,
  },
  listForecast: {
    height: 5,
    // paddingLeft: 10,
  },
  containerForecast: {
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: "rgba(208, 212, 222, 0.5)",
  },
  iconForecast: {
    justifyContent: "center",
    alignItems: "center",
  },
  tempreatureForecast: {
    justifyContent: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  dayForecast: {
    paddingTop: 10,
    alignItems: "center",
  },
  separator: {
    marginLeft: 20,
  },
});
