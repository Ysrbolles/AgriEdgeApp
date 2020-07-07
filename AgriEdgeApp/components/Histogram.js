import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

import data_mock from "../mock/co2_data.json";
import Nodes from "../services/Nodes";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import dayjs from "dayjs";

export default class Histogram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histogramType: 0,
      watermark1: [],
      watermark2: [],
      watermark3: [],
      res: [],
    };
  }

  componentWillMount() {
    Nodes.getNodeDetails(this.props.NodeId).then(async (res) => {
      this.setState({ res: res });
      for (let i = 0; i < 10; i++) {
        await this.state.watermark1.push(res[i].watermark_1);
      }
      console.log(
        dayjs(new Date(this.state.res[0].db_timestamp * 1000)).format("hh:mm a")
      );
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
        createdData = data.reverse().map((row) => parseFloat(row.air_temperature));
        break;
      case 5:
        createdData = data.reverse().map((row) => parseFloat(row.soil_temperature));
        break;
      default:
        createdData = data.reverse().map((row) => parseFloat(row.watermark_1));
    }
    return createdData;
  }
  createtime(data, histogramType) {
    let createdData;
    createdData = data.reverse().map((row) => dayjs(new Date(row.db_timestamp * 1000)).format("hh:mm a"));

    return createdData;
  }

  render() {
    const histogramType = this.props.type;
    const data = {
      labels: this.createtime(Object.values(this.state.res), histogramType),

      datasets: [
        {
          data: this.createData(Object.values(this.state.res), histogramType),
        },
      ],
    };
    const chartConfig = {
      backgroundGradientFrom: "#037d50",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#037d50",
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(3, 125, 80, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      fillShadowGradient: "#037d50",
      fillShadowGradientOpacity: 0.8,
      barPercentage: 0.7,
      style: {
        fontSize: 20,
      },
    };

    return (
      <View style={styles.container}>
        <BarChart
          data={data}
          width={screenWidth}
          height={screenHeight * 0.6}
          chartConfig={chartConfig}
          verticalLabelRotation={90}
          fromZero={true}
          style={styles.barChartStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 15,
    marginTop: 20,
  },
  barChartStyle: {
    borderRadius: 16,
    fontWeight: "bold",
    fontSize: 20,
  },
});