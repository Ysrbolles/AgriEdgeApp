import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  RefreshControl,
  View,
} from "react-native";

import HeaderComponent from "../components/HeaderComponent";
import Histogram from "../components/Histogram";
import HistogramType from "../components/HistogramType";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// const FirstRoute = () => (
//   <ScrollView
//   style={styles.container}
//   contentContainerStyle={styles.containerContent}
//   // refreshControl={
//   //   // <RefreshControl
//   //   //   refreshing={this.state.refreshing}
//   //   //   onRefresh={this.onRefresh}
//   //   // />
//   // }
// >
//   {/* <HeaderComponent></HeaderComponent> */}
//   {/* <Text>{JSON.stringify(this.props.navigation.state.params.NodeId)}</Text> */}
//   {/* <HistogramType
//     value={this.state.histogramType}
//     onTypeChange={this.handleTypeChange}
//   ></HistogramType>
//   <Histogram
//     type={this.state.histogramType}
//     NodeId={this.props.navigation.state.params.NodeId}
//   ></Histogram> */}
//   {/* <Text style={styles.histogramTitle}>
//   {this.getHistogramTitle(this.state.histogramType)}
// </Text> */}
// </ScrollView>

// );

export default class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histogramType: 0,
      watermark1: [],
      watermark2: [],
      watermark3: [],
      res: [],
      refreshing: false,
      now: null,
      index: 0,
      routes: [
        { key: "first", title: "Node Charts" },
        { key: "second", title: "Node Details" },
      ],
    };
  }
  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
      this.forceUpdate();
    }, 3000);
  };
  handleTypeChange = (histogramType) => {
    this.setState({ histogramType });
  };
  getHistogramTitle = (histogramType) => {
    const buttons = [
      "WaterMark1",
      "WaterMark2",
      "WaterMark3",
      "air_humidity",
      "air_temperature",
      "soil_temperature",
    ];
    return `Histogram of ${buttons[histogramType]} values`;
  };
  _handleIndexChange = (index) =>
    this.setState({
      index,
    });

  render() {
    const FirstRoute = () => (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}
        // refreshControl={
        //   // <RefreshControl
        //   //   refreshing={this.state.refreshing}
        //   //   onRefresh={this.onRefresh}
        //   // />
        // }
      >
        {/* <HeaderComponent></HeaderComponent> */}
        {/* <Text>{JSON.stringify(this.props.navigation.state.params.NodeId)}</Text> */}
        <HistogramType
          value={this.state.histogramType}
          onTypeChange={this.handleTypeChange}
        ></HistogramType>
        <Histogram
          type={this.state.histogramType}
          NodeId={this.props.navigation.state.params.NodeId}
        ></Histogram>
        {/* <Text style={styles.histogramTitle}>
  {this.getHistogramTitle(this.state.histogramType)}
</Text> */}
      </ScrollView>
    );
    const SecondRoute = () => (
      <View style={[styles.scene, { backgroundColor: "#037d50" }]} />
    );

    const initialLayout = { width: Dimensions.get("window").width };
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        // renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    );
  }
  _renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // tabbar: {
  //   backgroundColor: white,
  // },
  // tab: {
  //   width: screenWidth / 2,
  // },
  // indicator: {
  //   backgroundColor: primarycolor,
  // },
  // label: {
  //   color: primarycolor,
  //   fontWeight: "400",
  // },
  containerContent: {
    alignItems: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  histogramTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
