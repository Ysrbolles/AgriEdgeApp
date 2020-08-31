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
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import * as firebase from "firebase";
import { Avatar, ListItem, Header } from "react-native-elements";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

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
    done: false,
  };

  async componentDidMount() {
    this.getUser();
  }
  getUser = async () => {
    const user = await firebase.auth().currentUser;
    this.setState({
      uidAPP: user.uid,
    });
    await Nodes.getNodes(this.state.uidAPP).then((res) => {
      this.setState({ list: res, done: true });
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
            this.props.navigation.navigate("Node", {
              NodeId: item.NodeId,
              on: this.onRefresh,
            })
          }
        />
      </View>
    );
  };
  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
      this.getUser();
    }, 3000);
  };
  render() {
    const list = (
      <View style={{ marginTop: 32 }}>
        <Text style={styles.histogramTitle}>Nodes List</Text>
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
    );

    const laoding = (
      <ActivityIndicator
        size="large"
        style={styles.containerLoading}
      ></ActivityIndicator>
    );
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {this.state.done ? list : laoding}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  histogramTitle: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 15
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300,
  },
  container: {
    flex: 1,
  },
  separator: {
    marginLeft: 20,
  },
  lowerregion: {
    height: 'auto',
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
