import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import * as firebase from "firebase";
// import { ListItem } from "@ui-kitten/components";
import { Avatar, ListItem, Header } from "react-native-elements";
// import { ListItem } from 'react-native-elements'
import {
  ModernHeader,
  ClassicHeader,
} from "@freakycoder/react-native-header-view";
import Drawer from "react-native-circle-drawer";
import ScalingDrawer from "react-native-scaling-drawer";
import { ApplicationProvider, Card, Layout } from "react-native-ui-kitten";
import { mapping, light as lightTheme } from "@eva-design/eva";
import Nodes from "../services/Nodes";
let defaultScalingDrawerConfig = {
  scalingFactor: 0.6,
  minimizeFactor: 0.6,
  swipeOffset: 20,
};
const he = (props) => (
  <View {...props} style={{height: 50}}>
    <Text category="h1">Nodes List</Text>
    {/* <Text category="s1">Test</Text> */}
  </View>
);
export default class ProfileScreen extends React.Component {
  state = {
    user: null,
    email: "",
    Firstname: "",
    lastname: "",
    displayName: "",
    profilpic: "",
    list: [],
  };

  componentDidMount() {
    this.getUser();
    Nodes.getNodes()
    .then(res => {
      this.setState({list: res})
      console.log(res)
    })
  }
  getUser = async () => {
    const user = await firebase.auth().currentUser;
    this.setState({
      user: user,
      displayName: user.displayName,
      email: user.email,
      profilpic: user.photoURL,
    });
    console.log(user);
  };
  signOutUser = () => {
    firebase.auth().signOut();
  };

  listDaily = ({ item }) => {
    return (
      <View>
        {/* {this.state.list.map((l, i) => ( */}
          <ListItem
            // key={i}
            title={item.NodeId}
            bottomDivider
            onPress={() => {
                  alert(item.NodeId);
                }}
          />
        {/* ))} */}
      </View>
    );
  };
  renderSideMenu() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Item 1 </Text>
        <Text>Item 2 </Text>
      </View>
    );
  }
  render() {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <View>
          <Header
            // leftComponent={{ icon: "menu", color: "#fff" }}
            centerComponent={{ text: "Profile" }}
            rightComponent={{ icon: "settings" }}
            backgroundColor="#fff"
          />
          <Layout style={styles.topContainer} level="1">
            <Card style={styles.card}>
              <Layout style={styles.topContainer} level="1">
                <Avatar
                  rounded
                  style={{ width: 100, height: 100 }}
                  source={{
                    uri: this.state.profilpic,
                  }}
                />
                <View>
                  <Layout style={styles.Logout} level="1">
                    {/* <Text>{this.state.email}</Text> */}
                    <Text>{this.state.displayName}</Text>
                    <TouchableOpacity
                      style={{ marginTop: 32 }}
                      onPress={this.signOutUser}
                    >
                      <Text>Logout</Text>
                    </TouchableOpacity>
                  </Layout>
                </View>
              </Layout>
            </Card>
          </Layout>

          <View style={styles.lowerregion}>
            <Card style={styles.card} header={he}>
              <FlatList
                // style={styles.listForecast}

                data={this.state.list}
                renderItem={this.listDaily}
                ItemSeparatorComponent={() => (
                  <View style={styles.separator}></View>
                )}
                keyExtractor={(item, index) => index.toString()}
               
              />
            </Card>
          </View>
        </View>
      </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginLeft: 20,
  },
  lowerregion: {
    marginTop: 100,
    backgroundColor: "#f4f4f4",
    height: 300,
  },
  card: {
    flex: 1,
    margin: 2,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Logout: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
