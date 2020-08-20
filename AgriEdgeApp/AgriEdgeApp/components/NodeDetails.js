import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { navigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Dropdown } from "react-native-material-dropdown";
import DatePicker from "react-native-datepicker";
import Nodes from "../services/Nodes";
import { SceneView } from "react-navigation";

import { SocialIcon, Input, Overlay } from "react-native-elements";
export default class NodeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      latitude: "",
      longitude: "",
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
      IrrigationSystem: "",
      newDate: "",
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
    };
  }
  async componentDidMount() {
    this.getNodeData();
  }
  getNodeData = async () => {
    await Nodes.getNodeDetailsDatabase(this.props.NodeId).then(async (res) => {
      await this.setState({
        name: res.FarmerName,
        latitude: res.latitude,
        longitude: res.longitude,
        node_id: res.NodeId,
        totalArea: res.Totalarea,
        irrigationSystem: res.IrrigationSystem,
        culture: res.Culture,
        Cropdensit1: res.CropDensit1,
        Cropdensit2: res.CropDensit2,
        Rootdepth: res.depthroot,
        Flowrate: res.DripppersFlowrate,
        Spacing: res.DrippersSpaces,
        NbrofRamps: res.Numberramps,
        Coefficient: res.Cofficientuinf,
        Irrigationefficency: res.Irrigationefficiency,
        SoilTexture: res.Soiltextue,
        OrganicMater: res.OrganicMatter,
        SoilSalinity: res.Soilsalinity,
        ClayContent: res.Clay,
        Limoncontent: res.Limon,
        Sandcontent: res.Sand,
        date: new Date(res.Date),
        IrrigationSystem: res.IrrigationSystem,
      });
    });
  };
  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
      this.getNodeData();
    }, 3000);
  };
  updateNodeDetails = async () => {
    await Nodes.updateNodeDetails(this.state).then((Data) => {
      Alert.alert("Data Updated", "Your Node Data is updated ", [
        {
          text: "ok",
          onPress: () => {},
          style: "cancel",
        },
      ]);
      this.getNodeData();
    });
  };
  deleteNode = async () => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this Node ?",
      [
        {
          text: "NO",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            Nodes.deleteNode(this.state.node_id).then((data) => {
              if (data.ok === 1) {
                this.props.closeScreen();
              }
            });

            // this.props.navigation.goBack();
          },
        },
      ]
    );
  };
  handlClickha = () => {
    this.props.closeScreen();
  };
  render() {
    return (
      <SafeAreaView>
        <NavigationContainer>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            <View style={{ flex: 1 }}>
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
                      label="Name"
                      value={this.state.name}
                      renderErrorMessage={true}
                      onChangeText={(name) => this.setState({ name: name })}
                    />
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      label="Node Id"
                      value={this.state.node_id}
                      value={this.state.node_id}
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
                      label="Total Area"
                      value={String(this.state.totalArea)}
                      keyboardType="phone-pad"
                      renderErrorMessage={true}
                      onChangeText={(totalArea) =>
                        this.setState({ totalArea: totalArea })
                      }
                    />
                  </Col>
                  <Col style={{ marginBottom: 10, marginTop: 21 }}>
                    <Dropdown
                      label="Irrigation System"
                      value={this.state.IrrigationSystem}
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
                      label="Culture"
                      value={this.state.culture}
                      renderErrorMessage={true}
                      onChangeText={(culture) =>
                        this.setState({ culture: culture })
                      }
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col style={{ marginTop: 15 }}>
                    <Text>Crop Densit /m:</Text>
                  </Col>
                  <Col style={{ marginLeft: 20 }}>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      value={String(this.state.Cropdensit1)}
                      renderErrorMessage={true}
                      keyboardType="phone-pad"
                      onChangeText={(Cropdensit1) =>
                        this.setState({ Cropdensit1: Cropdensit1 })
                      }
                    />
                  </Col>
                  {/* <Col style={{ marginTop: 21, marginLeft: 50 }}>
                  <Text>X</Text>
                </Col> */}
                  <Text
                    style={{ marginTop: 21, marginLeft: 5, marginRight: 5 }}
                  >
                    X
                  </Text>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      value={String(this.state.Cropdensit2)}
                      keyboardType="phone-pad"
                      onChangeText={(Cropdensit2) =>
                        this.setState({ Cropdensit2: Cropdensit2 })
                      }
                    />
                  </Col>
                </Grid>
              </View>
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
                      value={this.state.date}
                      format="YYYY-MM-DD"
                      minDate="01-01-2016"
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
                      label="Root depth /cm"
                      value={String(this.state.Rootdepth)}
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
                      label="Flow rate / l/h"
                      value={String(this.state.Flowrate)}
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
                      label="Spacing / m"
                      value={String(this.state.Spacing)}
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
                      label="Number of ramps / line"
                      value={String(this.state.NbrofRamps)}
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
                      label="Coefficient of uniformity /%"
                      value={String(this.state.Coefficient)}
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
                      label="Irrigation efficency / %"
                      value={String(this.state.Irrigationefficency)}
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
                      label="Organic matter / %"
                      value={String(this.state.OrganicMater)}
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
                      label="Soil Salinity / %"
                      value={String(this.state.SoilSalinity)}
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
                      label="Clay Content / %"
                      value={String(this.state.ClayContent)}
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
                      label="Limon content / %"
                      value={String(this.state.Limoncontent)}
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
                      label="Sand content / %"
                      value={String(this.state.Sandcontent)}
                      keyboardType="phone-pad"
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
                      label="latitude"
                      value={String(this.state.latitude)}
                      keyboardType="phone-pad"
                      onChangeText={(latitude) =>
                        this.setState({ latitude: latitude })
                      }
                    />
                  </Col>
                  <Col>
                    <Input
                      style={{ marginVertical: 10, fontSize: 17 }}
                      renderErrorMessage={true}
                      label="longitude"
                      value={String(this.state.longitude)}
                      keyboardType="phone-pad"
                      onChangeText={(longitude) =>
                        this.setState({ longitude: longitude })
                      }
                    />
                  </Col>
                </Grid>
              </View>
              <View>
                <Grid>
                  <Col>
                    <TouchableOpacity
                      style={styles.button2}
                      title="Update"
                      onPress={this.deleteNode}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          alignSelf: "center",
                          color: "#FFF",
                        }}
                      >
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity
                      style={styles.button}
                      title="Update"
                      onPress={this.updateNodeDetails}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          alignSelf: "center",
                          color: "#FFF",
                        }}
                      >
                        Update Details
                      </Text>
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </View>
            </View>
          </ScrollView>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#037d50",
    height: 46,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    backgroundColor: "red",
    height: 46,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
