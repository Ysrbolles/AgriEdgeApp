import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import _ from "lodash";
import data_mock from "../mock/co2_data.json";
import Nodes from "../services/Nodes";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import dayjs from "dayjs";
// import FuckYou from "react-chartist";
import PureChart from "react-native-pure-chart";
import { ECharts } from "react-native-echarts-wrapper";
export default class Histogram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histogramType: 0,
      watermark1: "",
      watermark2: "",
      watermark3: "",
      air_humidity: "",
      air_temperature: "",
      soil_temperature: "",
      res: [],
      exists: false,
    };
  }

  async componentDidMount() {
    this.getNodesDetails();
  }
  getNodesDetails = async () => {
    await Nodes.getNodeDetails(this.props.NodeId).then(async (res) => {
      console.log("|||||||||||||||||||||||||||||||||");
      console.log(res);
      console.log("|||||||||||||||||||||||||||||||||");
      await this.setState({ res: res, exists: true });
      console.log(res[0].watermark_1);
      this.setState({
        watermark1: res[0].watermark_1,
        watermark2: res[0].watermark_2,
        watermark3: res[0].watermark_3,
        air_humidity: res[0].air_humidity,
        air_temperature: res[0].air_temperature,
        soil_temperature: res[0].soil_temperature,
      });
    });
  };
  /**
   * Generate data to correct format based on chosen type of histogram
   * @param {any} data input data
   * @param {histogramType} histogramType chosen type of histogram
   */
  createData(data, histogramType) {
    let createdData;
    switch (histogramType) {
      case 0:
        createdData = data.reverse().map((row) => parseFloat(row.watermark_1));
        break;
      case 1:
        createdData = data.reverse().map((row) => parseFloat(row.watermark_2));
        break;
      case 2:
        createdData = data.reverse().map((row) => parseFloat(row.watermark_3));
        break;
      case 3:
        createdData = data.reverse().map((row) => parseFloat(row.air_humidity));
        break;
      case 4:
        createdData = data
          .reverse()
          .map((row) => parseFloat(row.air_temperature));
        break;
      case 5:
        createdData = data.map((row) =>
          parseFloat(row.soil_temperature.toFixed(0))
        );
        break;
      default:
        createdData = data.reverse().map((row) => parseFloat(row.watermark_1));
    }
    return createdData;
  }
  createtime(data, histogramType) {
    let createdData;

    createdData = data.reverse().map((row) => {
      if (row.db_timestamp != null)
        dayjs(new Date(row.db_timestamp * 1000)).format("hh:mm a");
    });

    return createdData;
  }
  getDataNumbers = (histogramType) => {
    let createdData;
    switch (histogramType) {
      case 0:
        createdData = parseFloat(this.state.watermark1);
        break;
      case 1:
        createdData = parseFloat(this.state.watermark2);
        break;
      case 2:
        createdData = parseFloat(this.state.watermark3);
        break;
      case 3:
        createdData = parseFloat(this.state.air_humidity);
        break;
      case 4:
        createdData = parseFloat(this.state.air_temperature);
        break;
      case 5:
        createdData = parseFloat(this.state.soil_temperature);
        break;
      default:
        createdData = parseFloat(this.state.watermark1);
    }
    return <Text style={styles.histogramTitle}>{createdData}</Text>;
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
    return `Last Value of ${buttons[histogramType]} is :`;
  };
  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
      this.getNodesDetails();
    }, 3000);
  };
  handlerYAxis = (value) => {
    alert(value);
    return parseInt(value);
  };
  verticalLableFont(y) {
    console.log("dkheeeeeeeeeeeeeeeeeeeeeeelt");
    console.log(y);
    let yValue = y.toString();
    return convertToPersianNumber(yValue);
  }
  render() {
    const histogramType = this.props.type;
    const data = {
      labels: this.createtime(Object.values(this.state.res), histogramType),
      datasets: [
        {
          // labels: [0, 20, 50, 100],
          data: this.createData(Object.values(this.state.res), histogramType),
          // data: [24, 40, 26, 26, 50, 30, 26],
        },
      ],
    };

    const chartConfig = {
      backgroundColor: "#1cc910",
      backgroundGradientFrom: "#eff3ff",
      backgroundGradientTo: "#efefef",
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      fillShadowGradient: "#037d50",
      fillShadowGradientOpacity: 0.9,
      barPercentage: 0.4,
      style: {
        borderRadius: 20,
      },
    };
    const chart = (
      <View>
        <View>
          <Text style={styles.histogramTitle}>
            {this.getHistogramTitle(histogramType)}
            {this.getDataNumbers(histogramType)}
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <BarChart
            data={data}
            width={350}
            height={550 * 0.7}
            showBarTops={true}
            withInnerLines={true}
            formatYLabel={(y) => this.verticalLableFont(y)}
            chartConfig={chartConfig}
            verticalLabelRotation={90}
            style={styles.barChartStyle}
            showValuesOnTopOfBars={true}
          />
        </View>
      </View>
    );
    const landig = (
      <View
        style={{
          marginTop: 200,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>No Chart Data Or API is broken, try later</Text>
      </View>
    );
    return (
      <View style={styles.container}>
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
          {this.state.exists ? chart : landig}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    paddingVertical: 15,
    marginTop: 20,
    flex: 1,
  },
  barChartStyle: {
    borderRadius: 16,
    fontWeight: "bold",
    fontSize: 20,
  },
  histogramTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
