import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { NavigationContainer } from "@react-navigation/native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Dropdown } from "react-native-material-dropdown";
import DatePicker from "react-native-datepicker";

import { SocialIcon, Input, Overlay } from "react-native-elements";
export default class AddNodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      data: [
        {
          value: "Drip irrigation",
        },
        {
          value: "Sprinkler irrigation",
        },
        {
          value: "Surface irrigation",
        },
      ],
    };
  }

  render() {
    return (
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <ProgressSteps>
            <ProgressStep label="First Step">
              <View
                style={{
                  alignItems: "center",
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 40,
                }}
              >
                <Grid>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      placeholder="Name"
                      renderErrorMessage={true}
                    />
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      placeholder="Node ID"
                      renderErrorMessage={true}
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col style={{ marginTop: 21 }}>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      placeholder="Total Area"
                      keyboardType="phone-pad"
                      renderErrorMessage={true}
                    />
                  </Col>
                  <Col style={{ marginBottom: 20 }}>
                    <Dropdown
                      label="Irrigation Systeme"
                      data={this.state.data}
                      error={""}
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      placeholder="Culture"
                      renderErrorMessage={true}
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col style={{ marginTop: 21 }}>
                    <Text>Crop Densit :</Text>
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      keyboardType="phone-pad"
                    />
                  </Col>
                  {/* <Col style={{ marginTop: 21, marginLeft: 5 }}>
                    <Text>X</Text>
                  </Col> */}
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      keyboardType="phone-pad"
                    />
                  </Col>
                </Grid>
              </View>
            </ProgressStep>
            <ProgressStep label="Second Step">
              <View
                style={{
                  alignItems: "center",
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 40,
                }}
              >
                <Grid>
                  <Col>
                    <DatePicker
                      style={{ width: 160 }}
                      date={this.state.date} //initial date from state
                      mode="date" //The enum of date, datetime and time
                      placeholder="Select Date"
                      format="DD-MM-YYYY"
                      minDate="01-01-2016"
                      maxDate={Date().now}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                          marginLeft: 0,
                        },
                        dateInput: {
                          marginLeft: 36,
                        },
                      }}
                      onDateChange={(date) => {
                        this.setState({ date: date });
                      }}
                    />
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Root depth /cm"
                      keyboardType="phone-pad"
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Flow rate / l/h"
                      keyboardType="phone-pad"
                    />
                  </Col>
                  <Col>
                    <Text>Spacing / m</Text>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Spacing / m"
                      keyboardType="phone-pad"
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Number of ramps / line"
                      keyboardType="phone-pad"
                    />
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Coefficient of uniformity /%"
                      keyboardType="phone-pad"
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Irrigation efficency"
                      keyboardType="phone-pad"
                    />
                  </Col>
                
                </Grid>
              </View>
            </ProgressStep>
            <ProgressStep label="Third Step">
              <View style={{ alignItems: "center" }}>
                <Text>This is the content within step 3!</Text>
              </View>
            </ProgressStep>
            <ProgressStep label="ford Step">
              <View style={{ alignItems: "center" }}>
                <Text>This is the content within step 3!</Text>
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});
