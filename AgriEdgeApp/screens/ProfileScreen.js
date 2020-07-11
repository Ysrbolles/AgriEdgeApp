import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as firebase from "firebase";
import { Avatar, ListItem, Header } from "react-native-elements";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Chart from "./charts";

import Nodes from "../services/Nodes";
import { Button } from "native-base";

const he = (props) => (
  <View {...props} style={{ height: 50 }}>
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
    uidAPP: "",
    list: [],
    refrshing: false,
  };

  async componentDidMount() {
    this.getUser().then(async () => {
      await Nodes.getNodes(this.state.uidAPP)
        .then((res) => {
          this.setState({ refreshing: true });
          this.setState({ list: res });
        })
        .finally(() => this.setState({ refreshing: false }));
    });
  }
  getUser = async () => {
    const user = await firebase.auth().currentUser;
    this.setState({
      user: user,
      displayName: user.displayName,
      email: user.email,
      profilpic: user.photoURL,
      uidAPP: user.uid,
    });
  };
  signOutUser = () => {
    firebase.auth().signOut();
  };

  listDaily = ({ item }) => {
    return (
      <View>
        <ListItem
          title={item.NodeId}
          bottomDivider
          friction={90} 
          chevron
          activeScale={0.95}
          onPress={() =>
            this.props.navigation.navigate("Charts", { NodeId: item.NodeId })
          }
        />
      </View>
    );
  };

  render() {
    const imageauth = (
      <Image
        source={this.state.profilpic}
        style={styles.Image}
        resizeMode="center"
      ></Image>
    );
    const imagedefault = (
      <Image
        source={require("../assets/logo.png")}
        style={styles.Image}
        resizeMode="center"
      ></Image>
    );
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.TitleBar}>
            <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
          </View>
          <TouchableOpacity onPress={this.signOutUser}>
            <Text>Logout</Text>
          </TouchableOpacity>
          {/* <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              {this.state.profilpic ? imagedefault : imagedefault}
            </View>
          </View> */}
          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {this.state.displayName}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBox,
                {
                  borderColor: "#DFDBCB",
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                },
              ]}
            >
              <Text style={[styles.text, { fontSize: 24 }]}>
                {this.state.list.length}
              </Text>
              <Text styles={[styles.text, styles.subtext]}>Nodes Number</Text>
            </View>
          </View>
          <View style={{ marginTop: 32 }}>
            <View style={styles.lowerregion}>
              <FlatList
                data={this.state.list}
                renderItem={this.listDaily}
                ItemSeparatorComponent={() => (
                  <View style={styles.separator}></View>
                )}
                keyExtractor={(item, index) => index.toString()}
                refreshing={this.state.refrshing}
                onRefresh={this.getUser}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    marginLeft: 20,
  },
  lowerregion: {
    height: 400,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 2,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  Logout: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  Image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  TitleBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statusContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statusBox: {
    alignItems: "center",
    flex: 1,
  },
  subtext: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  text: {
    color: "#52575D",
  },
});
