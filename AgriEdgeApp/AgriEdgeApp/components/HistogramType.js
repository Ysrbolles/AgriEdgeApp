import React, { Component, useState } from "react";
import { Dimensions, StyleSheet, ScrollView } from "react-native";
import { ButtonGroup } from "react-native-elements";

const screenWidth = Dimensions.get("window").width;

export default class HistogramType extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {}
  handleChange(selectedIndex) {
    this.props.onTypeChange(selectedIndex);
  }

  render() {
    const histogramType = this.props.value != undefined ? this.props.value : 0;
    const buttons = [
      "Soil Humidity (10cm)",
      "Soil Humidity (20cm)",
      "Soil Humidity (30cm)",
      "Air Humidity",
      "Air Temperature",
      "Soil Temperature",
    ];

    const buttonsII = [
      "Soil Humidity (20cm)",
      "Soil Humidity (40cm)",
      "Soil Humidity (60cm)",
      "Air Humidity",
      "Air Temperature",
      "Soil Temperature",
    ];
    return (
      <ScrollView
        style={styles.Cnt}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <ButtonGroup
          selectedButtonStyle={{ backgroundColor: "#037d50" }}
          onPress={this.handleChange}
          selectedIndex={histogramType}
          buttons={buttons}
          containerStyle={styles.container}
          text
          Style={{ fontSize: 12 }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Cnt: {
    flex: 1,
  },
  container: {
    height: 50,
    marginTop: 30,
    minWidth: screenWidth * 2,
  },
});
