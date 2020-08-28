import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Swiper from "react-native-swiper";
import * as Location from "expo-location";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import getForecastEmoji from "../services/getForecastEmoji";
import dayjs from "dayjs";
import Nodes from "../services/Nodes";
export default class WeatherScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      days: [],
      currently: [],
      hourly: [],
      refreshing: false,
      show: false,
      place: "",
    };
  }
  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
      this.getWeatherData();
    }, 3000);
  };
  componentDidMount() {
    this._isMounted = true;
    this._getuserLocation().then((position) => {
      console.log(position.coords.latitude);
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      this.getWeatherData();
      this.getLocationName();
    });
  }
  getLocationName = () => {
    Nodes.getlocationName(this.state.latitude, this.state.longitude).then(
      async (result) => {
        this.setState({ place: result });
      }
    );
  };
  componentWillUnmount() {
    this._isMounted = false;
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
      )
      .then((WeatherData) => {
        this.setState({ currently: WeatherData.data.currently, show: true });
        // get hourly data
        let hours = WeatherData.data.hourly.data;
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
              waterPercent: element.precipProbability,
            },
          ]);
        });
        // get daily data
        let WeatherDays = WeatherData.data.daily.data;
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
              waterPercent: element.precipProbability,
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
      return (
        <View style={styles.fivecolumns}>
          <Text style={styles.columntitle}>
            {""}
            {dayjs(new Date(element.time * 1000)).format("ddd")}
          </Text>
          <MaterialCommunityIcons
            size={38}
            name={getForecastEmoji(element.icon)}
            color={"#5ABD8C"}
          />

          <Text style={styles.temp}>
            {Math.round(element.temperatureMax)}°C
          </Text>
          <View style={styles.waterForecast}>
            <MaterialCommunityIcons
              size={15}
              name="water-percent"
              color={"#5ABD8C"}
            />
            <Text style={{ fontSize: 10 }}>{element.waterPercent} %</Text>
          </View>
        </View>
      );
    });
  }
  listDaily = ({ item }) => {
    return (
      <View style={styles.fivecolumns}>
        <Text style={styles.columntitle}>
          {""}
          {dayjs(new Date(item.time * 1000)).format("ddd")}
        </Text>
        <MaterialCommunityIcons
          size={38}
          name={getForecastEmoji(item.icon)}
          color={"#5ABD8C"}
        />

        <Text style={styles.temp}>{Math.round(item.temperatureMax)}°C</Text>
        <View style={styles.waterForecast}>
          <MaterialCommunityIcons
            size={15}
            name="water-percent"
            color={"#5ABD8C"}
          />
          <Text style={{ fontSize: 10 }}>{item.waterPercent} %</Text>
        </View>
      </View>
    );
  };

  renderElement = ({ item }) => {
    return (
      <View style={styles.containerForecast}>
        <View style={styles.dayForecast}>
          <Text> {dayjs(new Date(item.time * 1000)).format("hh:mm a")}</Text>
        </View>
        <View style={styles.iconForecast}>
          <MaterialCommunityIcons
            size={38}
            name={getForecastEmoji(item.icon)}
            color={"#fff"}
          />
          {/* <Text>{getForecastEmoji(item.icon)}</Text> water-percent */}
        </View>
        <View style={styles.tempreatureForecast}>
          <Text>{Math.round(item.temperature)}°C</Text>
        </View>
        <View style={styles.waterForecast}>
          <MaterialCommunityIcons
            size={20}
            name="water-percent"
            color={"#fff"}
          />
          <Text>{item.waterPercent} %</Text>
        </View>
      </View>
    );
  };
  render() {
    const body = (
      <ImageBackground
        style={styles.upperregion}
        source={require("../assets/test2.jpg")}
      >
        <View>
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
            <Text style={[styles.addwhite, { fontSize: 18 }]}>
              {this.state.place}
            </Text>
            <Text style={styles.degrees}>
              {this.state.currently.temperature
                ? Math.round(this.state.currently.temperature)
                : null}
              °C
            </Text>
            <MaterialCommunityIcons
              size={48}
              name={getForecastEmoji(this.state.currently.icon)}
              color={"#fff"}
            />
            <Text style={styles.weathercondition}>
              {this.state.currently.summary}
            </Text>
          </View>

          <View style={styles.lowerinnerregion}>
            <View style={[styles.addwhite, { marginTop: 10 }]}>
              <FlatList
                style={styles.listForecast}
                horizontal
                data={this.state.hourly}
                renderItem={this.renderElement}
                ItemSeparatorComponent={() => (
                  <View style={styles.separator}></View>
                )}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
    const laoding = (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      ></ActivityIndicator>
    );
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {this.state.show ? body : laoding}

          <View>
            <FlatList
              // style={styles.listForecast}
              horizontal
              data={this.state.days}
              renderItem={this.listDaily}
              ItemSeparatorComponent={() => (
                <View style={styles.separator}></View>
              )}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
        {/* <View style={styles.lowerregion}>{this.listDays()}</View> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 10,
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  container: {
    flex: 2,
  },
  upperregion: {
    flex: 2,
    alignItems: "center",
  },

  lowerregion: {
    flex: 0.5,
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    height: 5,
  },

  innerupperregion: {
    marginTop: 50,
    backgroundColor: "transparent",
    alignItems: "center",
    flex: 2,
  },

  lowerinnerregion: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    alignItems: "center",
    paddingBottom: 10,
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
    fontSize: 50,
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
    marginTop: 5,
    marginBottom: 5,
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
    // height: 10,
    // paddingLeft: 10,
  },
  containerForecast: {
    padding: 10,
    paddingBottom: 10,
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
    alignItems: "center",
  },
  waterForecast: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dayForecast: {
    marginTop: 2,
    paddingTop: 5,
    paddingBottom: 8,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  separator: {
    marginLeft: 20,
  },
});
