import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { NavigationContainer } from "@react-navigation/native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Dropdown } from "react-native-material-dropdown";
import DatePicker from "react-native-datepicker";
import Nodes from "../services/Nodes";
import axios from "axios";
import firebase from 'firebase'

import { SocialIcon, Input, Overlay } from "react-native-elements";
export default class AddNodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      name: "",
      latitude: -87877.12,
      longitude: 99989.45,
      node_id: "",
      totalArea: null,
      irrigationSystem: "",
      culture: "",
      Cropdensit1: null,
      Cropdensit2: null,
      Rootdepth: null,
      Flowrate: null,
      Spacing: null,
      NbrofRamps: null,
      Coefficient: null,
      Irrigationefficency: null,
      SoilTexture: null,
      OrganicMater: null,
      SoilSalinity: null,
      ClayContent: null,
      Limoncontent: null,
      Sandcontent: null,
      date: null,
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
      user: null,
      email: "",
      Firstname: "",
      lastname: "",
      displayName: "",
      profilpic: "",
    };
  
  }
  componentDidMount() {
    console.log("----------------------------------------------------------------------")
    console.log(this.props)
    console.log("----------------------------------------------------------------------")
   
    this.getUser();
  }
  fuck = () => {
    console.debug("lmlawi")
    Nodes.addnewone(this.state);
  };

  getUser = async () => {
    const user = await firebase.auth().currentUser;
    this.setState({
      user: user,
      displayName: user.displayName,
      email: user.email,
      profilpic: user.photoURL,
      uid: user.uid
    });
    console.log(user.email);
  };
  render() {
    const buttonTextStyle = {
      color: "#fffff",
    };
    return (
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <ProgressSteps>
            <ProgressStep label="First Step" nextBtnStyle={buttonTextStyle}>
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
                      onChangeText={(name) => this.setState({ name: name })}
                    />
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      placeholder="Node ID"
                      renderErrorMessage={true}
                      onChangeText={(node_id) =>
                        this.setState({ node_id: node_id })
                      }
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
                      onChangeText={(totalArea) =>
                        this.setState({ totalArea: totalArea })
                      }
                    />
                  </Col>
                  <Col style={{ marginBottom: 20 }}>
                    <Dropdown
                      label="Irrigation Systeme"
                      data={this.state.data}
                      error={""}
                      onChangeText={(irrigationSystem) =>
                        this.setState({ irrigationSystem: irrigationSystem })
                      }
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      placeholder="Culture"
                      renderErrorMessage={true}
                      onChangeText={(culture) =>
                        this.setState({ culture: culture })
                      }
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
                      onChangeText={(Cropdensit1) =>
                        this.setState({ Cropdensit1: Cropdensit1 })
                      }
                    />
                  </Col>

                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      keyboardType="phone-pad"
                      onChangeText={(Cropdensit2) =>
                        this.setState({ Cropdensit2: Cropdensit2 })
                      }
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
                      style={{ width: 140 }}
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
                      onChangeText={(Rootdepth) =>
                        this.setState({ Rootdepth: Rootdepth })
                      }
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
                      onChangeText={(Flowrate) =>
                        this.setState({ Flowrate: Flowrate })
                      }
                    />
                  </Col>
                  <Col>
                    {/* <Text>Spacing / m</Text> */}
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Spacing / m"
                      keyboardType="phone-pad"
                      onChangeText={(Spacing) =>
                        this.setState({ Spacing: Spacing })
                      }
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
                      onChangeText={(NbrofRamps) =>
                        this.setState({ NbrofRamps: NbrofRamps })
                      }
                    />
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Coefficient of uniformity /%"
                      keyboardType="phone-pad"
                      onChangeText={(Coefficient) =>
                        this.setState({ Coefficient: Coefficient })
                      }
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
                      onChangeText={(Irrigationefficency) =>
                        this.setState({
                          Irrigationefficency: Irrigationefficency,
                        })
                      }
                    />
                  </Col>
                </Grid>
              </View>
            </ProgressStep>
            <ProgressStep label="Third Step" onSubmit={this.fuck}>
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
                      renderErrorMessage={true}
                      placeholder="Soil texture"
                      keyboardType="phone-pad"
                      onChangeText={(SoilTexture) =>
                        this.setState({ SoilTexture: SoilTexture })
                      }
                    />
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Organic matter"
                      keyboardType="phone-pad"
                      onChangeText={(OrganicMater) =>
                        this.setState({ OrganicMater: OrganicMater })
                      }
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Soil Salinity"
                      keyboardType="phone-pad"
                      onChangeText={(SoilSalinity) =>
                        this.setState({ SoilSalinity: SoilSalinity })
                      }
                    />
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Clay Content"
                      keyboardType="phone-pad"
                      onChangeText={(ClayContent) =>
                        this.setState({ ClayContent: ClayContent })
                      }
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Limon content"
                      keyboardType="phone-pad"
                      onChangeText={(Limoncontent) =>
                        this.setState({ Limoncontent: Limoncontent })
                      }
                    />
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Sand content"
                      keyboardType="phone-pad"
                      onChangeText={(Sandcontent) =>
                        this.setState({ Sandcontent: Sandcontent })
                      }
                    />
                  </Col>
                </Grid>
              </View>
            </ProgressStep>
          </ProgressSteps>
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});
