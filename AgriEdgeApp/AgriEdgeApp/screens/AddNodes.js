import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { NavigationContainer } from "@react-navigation/native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Dropdown } from "react-native-material-dropdown";
import DatePicker from "react-native-datepicker";
import Nodes from "../services/Nodes";
import axios from "axios";
import { navigation } from "@react-navigation/native";
import firebase from "firebase";

import { SocialIcon, Input, Overlay } from "react-native-elements";
import { Toast } from "native-base";
export default class AddNodes extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    console.debug("lng " + this.params.polygone[0][0].longitude);
    this.state = {
      polygon: this.params.polygone,
      uid: "",
      name: "",
      latitude: this.params.polygone[0][0].latitude,
      longitude: this.params.polygone[0][0].longitude,
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
      errors: true,
      nameError: "",
      nodidError: "",
      totalAreaError: "",
      irrigationSystemError: "",
      cultureError: "",
      crop1Error: "",
      crop2Error: "",
      RootdepthErr: "",
      FlowrateErr: "",
      SpacingErr: "",
      NbrofRampsErr: "",
      CoefficientErr: "",
      IrrigationefficencyErr: "",
      ClayContentErr: "",
      LimoncontentErr: "",
      SandcontentErr: "",
      OrganicMaterErr: "",
      SoilSalinityErr: "",
      dateErr: "",
      NodeExistErr: "",
    };
  }
  componentDidMount() {
    this.getUser();
  }
  AddNode = async () => {
    if (this.state.OrganicMater === null) {
      this.setState({
        errors: true,
        OrganicMaterErr: "this field is required",
      });
    }
    if (this.state.SoilSalinity === null) {
      this.setState({
        errors: true,
        SoilSalinityErr: "this field is required",
      });
    }
    if (this.state.ClayContent === null) {
      this.setState({ errors: true, ClayContentErr: "this field is required" });
    }
    if (this.state.Limoncontent === null) {
      this.setState({
        errors: true,
        LimoncontentErr: "this field is required",
      });
    }
    if (this.state.Sandcontent === null) {
      this.setState({ errors: true, SandcontentErr: "this field is required" });
    } else {
      this.setState({
        errors: false,
        OrganicMaterErr: "",
        SoilSalinityErr: "",
        ClayContentErr: "",
        LimoncontentErr: "",
        SandcontentErr: "",
      });
      await Nodes.addnewone(this.state).then(async (data) => {
        if (data === "Already Exist!") {
          this.setState({
            errors: true,
            NodeExistErr: "This NodeID is" + data + " try another one",
          });
          alert("This NodeID is " + data + " try another one");
        } else {
          this.setState({ errors: false, NodeExistErr: "" });
          this.props.navigation.goBack();
        }
      });
      this.props.navigation.goBack();
    }
  };

  getUser = async () => {
    const user = await firebase.auth().currentUser;
    this.setState({
      user: user,
      displayName: user.displayName,
      email: user.email,
      profilpic: user.photoURL,
      uid: user.uid,
    });
    console.log(user.email);
  };
  checkSecondStep = () => {
    if (this.state.Rootdepth === null) {
      this.setState({ errors: true, RootdepthErr: "this field is required" });
    }
    if (this.state.Flowrate === null) {
      this.setState({ errors: true, FlowrateErr: "this field is required" });
    }
    if (this.state.Spacing === null) {
      this.setState({ errors: true, SpacingErr: "this field is required" });
    }
    if (this.state.NbrofRamps === null) {
      this.setState({ errors: true, NbrofRampsErr: "this field is required" });
    }
    if (this.state.Coefficient === null) {
      this.setState({ errors: true, CoefficientErr: "this field is required" });
    }
    if (this.state.Irrigationefficency === null) {
      this.setState({
        errors: true,
        IrrigationefficencyErr: "this field is required",
      });
    } else {
      this.setState({
        errors: false,
        RootdepthErr: "",
        FlowrateErr: "",
        SpacingErr: "",
        NbrofRampsErr: "",
        CoefficientErr: "",
        IrrigationefficencyErr: "",
      });
    }
  };
  checkFirstStep = () => {
    if (this.state.name === "") {
      this.setState({ errors: true, nameError: "this field is required" });
    }
    if (this.state.node_id === "") {
      this.setState({ errors: true, nodidError: "this field is required" });
    }
    if (this.state.totalAreaError === "") {
      this.setState({
        errors: true,
        totalAreaError: "this field is required",
      });
    }
    if (this.state.irrigationSystem === "") {
      this.setState({
        errors: true,
        irrigationSystemError: "this field is required",
      });
      if (this.state.culture === "") {
        this.setState({
          errors: true,
          cultureError: "this field is required",
        });
      }
    }
    if (this.state.Cropdensit1 === null) {
      this.setState({
        errors: true,
        crop1Error: "this field is required",
      });
    }
    if (this.state.Cropdensit2 === null) {
      this.setState({
        errors: true,
        crop2Error: "this field is required",
      });
    } else {
      this.setState({
        errors: false,
        nameError: "",
        nodidError: "",
        totalAreaError: "",
        irrigationSystemError: "",
        cultureError: "",
        crop1Error: "",
        crop2Error: "",
      });
    }
  };
  render() {
    const buttonTextStyle = {
      color: "#fffff",
    };
    return (
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <ProgressSteps>
            <ProgressStep
              label="First Step"
              nextBtnStyle={buttonTextStyle}
              errors={this.state.errors}
              onNext={this.checkFirstStep}
            >
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
                      errorMessage={this.state.nameError}
                      value={this.state.name}
                      onChangeText={(name) => this.setState({ name: name })}
                    />
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      placeholder="Node ID"
                      renderErrorMessage={true}
                      value={this.state.node_id}
                      errorMessage={this.state.nodidError}
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
                      value={this.state.totalArea}
                      errorMessage={this.state.totalAreaError}
                      onChangeText={(totalArea) =>
                        this.setState({ totalArea: totalArea })
                      }
                    />
                  </Col>
                  <Col style={{ marginBottom: 20 }}>
                    <Dropdown
                      label="Irrigation Systeme"
                      data={this.state.data}
                      error={this.state.irrigationSystemError}
                      value={this.state.irrigationSystem}
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
                      value={this.state.culture}
                      errorMessage={this.state.cultureError}
                      onChangeText={(culture) =>
                        this.setState({ culture: culture })
                      }
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col style={{ marginTop: 21 }}>
                    <Text>Crop Densit /m :</Text>
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      value={this.state.Cropdensit1}
                      errorMessage={this.state.crop1Error}
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
                      value={this.state.Cropdensit2}
                      errorMessage={this.state.crop2Error}
                      keyboardType="phone-pad"
                      onChangeText={(Cropdensit2) =>
                        this.setState({ Cropdensit2: Cropdensit2 })
                      }
                    />
                  </Col>
                </Grid>
              </View>
            </ProgressStep>
            <ProgressStep
              label="Second Step"
              onNext={this.checkSecondStep}
              errors={this.state.errors}
            >
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
                      format="YYYY-MM-DD"
                      minDate="01-01-2000"
                      maxDate={new Date()}
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
                      errorMessage={this.state.RootdepthErr}
                      value={this.state.Rootdepth}
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
                      errorMessage={this.state.FlowrateErr}
                      value={this.state.Flowrate}
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
                      value={this.state.Spacing}
                      errorMessage={this.state.SpacingErr}
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
                      placeholder="Number of ramps/line"
                      keyboardType="phone-pad"
                      value={this.state.NbrofRamps}
                      errorMessage={this.state.NbrofRampsErr}
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
                      value={this.state.Coefficient}
                      errorMessage={this.state.CoefficientErr}
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
                      placeholder="Irrigation efficency / %"
                      keyboardType="phone-pad"
                      value={this.state.Irrigationefficency}
                      errorMessage={this.state.IrrigationefficencyErr}
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
            <ProgressStep
              label="Third Step"
              onSubmit={this.AddNode}
              errors={this.state.errors}
            >
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
                      placeholder="Organic matter / %"
                      keyboardType="phone-pad"
                      errorMessage={this.state.OrganicMaterErr}
                      value={this.state.OrganicMater}
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
                      placeholder="Soil Salinity / %"
                      keyboardType="phone-pad"
                      errorMessage={this.state.SoilSalinityErr}
                      value={this.state.SoilSalinity}
                      onChangeText={(SoilSalinity) =>
                        this.setState({ SoilSalinity: SoilSalinity })
                      }
                    />
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Clay Content / %"
                      errorMessage={this.state.ClayContentErr}
                      keyboardType="phone-pad"
                      value={this.state.ClayContent}
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
                      placeholder="Limon content / %"
                      keyboardType="phone-pad"
                      value={this.state.Limoncontent}
                      errorMessage={this.state.LimoncontentErr}
                      onChangeText={(Limoncontent) =>
                        this.setState({ Limoncontent: Limoncontent })
                      }
                    />
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Sand content / %"
                      keyboardType="phone-pad"
                      errorMessage={this.state.SandcontentErr}
                      value={this.state.Sandcontent}
                      onChangeText={(Sandcontent) =>
                        this.setState({ Sandcontent: Sandcontent })
                      }
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Latitiude"
                      keyboardType="phone-pad"
                      value={this.state.latitude}
                      onChangeText={(latitude) =>
                        this.setState({ latitude: latitude })
                      }
                    />
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      placeholder="Longitude"
                      keyboardType="phone-pad"
                      value={this.state.longitude}
                      onChangeText={(longitude) =>
                        this.setState({ longitude: longitude })
                      }
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col>
                    <Text style={{ color: "red", fontSize: 25 }}>
                      {this.state.NodeExistErr}
                    </Text>
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
