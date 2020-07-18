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
} from "react-native";
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
      date: new Date().toISOString().substr(0, 10),
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
  render() {
    return (
      <SafeAreaView>
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
                    placeholder={this.state.name}
                    renderErrorMessage={true}
                    onChangeText={(name) => this.setState({ name: name })}
                  />
                </Col>
                <Col>
                  <Input
                    style={{ marginVertical: 10, fontSize: 17 }}
                    label="Node Id"
                    value={this.state.node_id}
                    placeholder={this.state.node_id}
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
                    placeholder={String(this.state.totalArea)}
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
                    placeholder={this.state.IrrigationSystem}
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
                    placeholder={this.state.culture}
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
                    placeholder={String(this.state.Cropdensit1)}
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
                    placeholder={String(this.state.Cropdensit2)}
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
                    placeholder={this.state.date}
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
                    label="Root depth /cm"
                    placeholder={String(this.state.Rootdepth)}
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
                    placeholder={String(this.state.Flowrate)}
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
                    placeholder={String(this.state.Spacing)}
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
                    placeholder={String(this.state.NbrofRamps)}
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
                    placeholder={String(this.state.Coefficient)}
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
                    label="Irrigation efficency"
                    placeholder={String(this.state.Irrigationefficency)}
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
                    label="Soil texture"
                    placeholder={String(this.state.SoilTexture)}
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
                    label="Organic matter"
                    placeholder={String(this.state.OrganicMater)}
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
                    label="Soil Salinity"
                    placeholder={String(this.state.SoilSalinity)}
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
                    label="Clay Content"
                    placeholder={String(this.state.ClayContent)}
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
                    label="Limon content"
                    placeholder={String(this.state.Limoncontent)}
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
                    label="Sand content"
                    placeholder={String(this.state.Sandcontent)}
                    keyboardType="phone-pad"
                    onChangeText={(Sandcontent) =>
                      this.setState({ Sandcontent: Sandcontent })
                    }
                  />
                </Col>
              </Grid>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
