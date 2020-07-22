import React, { Component } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";

import data_mock from "../mock/co2_data.json";
import Nodes from "../services/Nodes";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import dayjs from "dayjs";

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
    };
  }

  async componentDidMount() {
    await Nodes.getNodeDetails(this.props.NodeId).then(async (res) => {
      await this.setState({ res: res });
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
  }
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
        createdData = data
          .reverse()
          .map((row) => parseFloat(row.soil_temperature));
        break;
      default:
        createdData = data.reverse().map((row) => parseFloat(row.watermark_1));
    }
    return createdData;
  }
  createtime(data, histogramType) {
    let createdData;
    createdData = data
      .reverse()
      .map((row) => dayjs(new Date(row.db_timestamp * 1000)).format("hh:mm a"));

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

  render() {
    const histogramType = this.props.type;
    const data = {
      labels: this.createtime(Object.values(this.state.res), histogramType),
      datasets: [
        {
          label: ["0", "25", "50", "100", "150", "200", "250"],
          data: this.createData(Object.values(this.state.res), histogramType),
        },
      ],
    };
    const sampleData = [
      {
        data: this.createData(Object.values(this.state.res), histogramType),
        color: "green",
      },
    ];
    const option = {
      xAxis: {
        type: "category",
        data: this.createtime(Object.values(this.state.res), histogramType),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: this.createData(Object.values(this.state.res), histogramType),
          type: "line",
        },
      ],
    };
    const chartConfig = {
      backgroundGradientFrom: "#037d50",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#037d50",
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(20, 125, 80, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      fillShadowGradient: "#037d50",
      fillShadowGradientOpacity: 0.8,
      barPercentage: 0.5,
      style: {
        fontSize: 20,
      },
    };

    // const chartConfig = {
    //   backgroundGradientFrom: "#1E2923",
    //   backgroundGradientFromOpacity: 0,
    //   backgroundGradientTo: "#08130D",
    //   backgroundGradientToOpacity: 0.5,
    //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    //   strokeWidth: 2, // optional, default 3
    //   barPercentage: 0.5,
    //   useShadowColorFromDataset: false, // optional
    // };

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.histogramTitle}>
            {this.getHistogramTitle(histogramType)}
            {this.getDataNumbers(histogramType)}
          </Text>
          {/* <ECharts option={option} /> */}
        </View>
        <View style={{ marginTop: 40 }}>
          <BarChart
            data={data}
            width={350}
            height={550 * 0.7}
            showBarTops={true}
            withInnerLines={false}
            // showValuesOnTopOfBars={true}
            chartConfig={chartConfig}
            verticalLabelRotation={90}
            fromZero={true}
            style={styles.barChartStyle}
          />
          {/* <LineChart
            data={data}
            width={350}
            height={550 * 0.7}
            showBarTops={true}
            withInnerLines={false}
            // showValuesOnTopOfBars={true}
            chartConfig={chartConfig}
            verticalLabelRotation={90}
            fromZero={true}
            style={styles.barChartStyle}
          /> */}

          {/* <PureChart width={30} data={sampleData} type="bar" /> */}
        </View>
        {/* <LineChart
          data={data}
          width={350}
          height={220}
          chartConfig={chartConfig}
        /> */}
        {/* <PureChart width={30} data={sampleData} type="bar" /> */}
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
