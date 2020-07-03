import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, RefreshControl } from "react-native";

import HeaderComponent from "../components/HeaderComponent";
import Histogram from "../components/Histogram";
import HistogramType from "../components/HistogramType";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histogramType: 0,
      watermark1: [],
      watermark2: [],
      watermark3: [],
      res: [],
      refreshing: false
    };
  }
  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
     
    }, 3000);
  };
  handleTypeChange = (histogramType) => {
    this.setState({ histogramType });
  };
  getHistogramTitle = (histogramType) => {
    const buttons = ["WaterMark1", "WaterMark2", "WaterMark3", "air_humidity", "air_temperature", "soil_temperature"];
    return `Histogram of ${buttons[histogramType]} values`;
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}
        refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
      >
        {/* <HeaderComponent></HeaderComponent> */}
        <Text>{JSON.stringify(this.props.navigation.state.params.NodeId)}</Text>
        <HistogramType
          value={this.state.histogramType}
          onTypeChange={this.handleTypeChange}
        ></HistogramType>
        <Histogram
          type={this.state.histogramType}
          NodeId={this.props.navigation.state.params.NodeId}
        ></Histogram>
        <Text style={styles.histogramTitle}>
          {this.getHistogramTitle(this.state.histogramType)}
        </Text>
      </ScrollView>
    );
  }
}

// export default function App({ route, navigation }) {
// //   const { NodeId } = route.params;
//   const [histogramType, setHistogramType] = React.useState(0);
//   const handleTypeChange = (histogramType) => {
//     setHistogramType(histogramType);
//     this.set
//   };

//   function getHistogramTitle(histogramType) {
//     const buttons = ["WaterMark 1", "WaterMark 2", "WaterMark 3", "Air"];
//     return `Histogram of ${buttons[histogramType]} values`;
//   }
//   //   componentDidMount(){
//   //       alert(this.props.navigation.NodeId)
//   //   }

// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
