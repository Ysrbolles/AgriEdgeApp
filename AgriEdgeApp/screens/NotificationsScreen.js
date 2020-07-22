import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Vibration,
  Platform,
  ScrollView,
  SafeAreaView,
  LayoutAnimation,
  FlatList,
  RefreshControl,
} from "react-native";
import { navigation } from "@react-navigation/native";
import AddScreen from "./AddNodes";
import * as firebase from "firebase";
import { SocialIcon, Input, Overlay } from "react-native-elements";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import { Avatar, ListItem, Header } from "react-native-elements";
import Nodes from "../services/Nodes";
export default class NotificationsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      expoPushToken: "",
      notifications: [],
      currentUser: [],
    };
  }

  async componentDidMount() {
    this.state.currentUser = await firebase.auth().currentUser;
    this.getAppNotif();
  }
  getAppNotif = async () => {
    Nodes.getAppNotif(this.state.currentUser.uid).then((res) => {
      this.setState({ notifications: res });
    });
  };
  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
      this.getAppNotif();
    }, 3000);
  };
  listDaily = ({ item }) => {
    return (
      <View>
        <ListItem
          title={item.Node}
          subtitle={item.msg}
          bottomDivider
          friction={90}
          chevron
          activeScale={0.95}
        />
      </View>
    );
  };
  render() {
    LayoutAnimation.easeInEaseOut();
    const landig = (
      <View
        style={{
          marginTop: 200,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>No Notifications</Text>
      </View>
    );
    const notification = (
      <View style={{ marginTop: 32 }}>
        <View style={styles.lowerregion}>
          <FlatList
            data={this.state.notifications}
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
          {this.state.notifications ? notification : landig}
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
