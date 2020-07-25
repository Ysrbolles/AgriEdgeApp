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
  TouchableHighlight,
} from "react-native";
import { navigation } from "@react-navigation/native";
import AddScreen from "./AddNodes";
import * as firebase from "firebase";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import _ from "lodash";
import { Avatar, ListItem, Header, Icon, Overlay } from "react-native-elements";
import Nodes from "../services/Nodes";
import { Col, Row, Grid } from "react-native-easy-grid";
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
  toggleOverlay = () => {
    this.setState({ visible: !this.state.visible });
  };
  listDaily = ({ item }) => {
    return (
      <View>
        <ListItem
          title={"Warning: " + item.Node}
          subtitle={item.msg}
          bottomDivider
          friction={90}
          activeScale={0.95}
          leftIcon={
            <Icon
              raised
              name="warning"
              type="font-awesome"
              color="#f50"
              size={20}
              onPress={() => {
                this.setState({ visible: true });
              }}
            />
          }
          rightIcon={
            <Icon
              raised
              name="chevron-right"
              type="font-awesome"
              color="#5ABD8C"
              size={15}
              onPress={() => {
                this.setState({ visible: true });
              }}
            />
          }
          // chevron

          onPress={() => {
            this.setState({ visible: true });
          }}
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
    const laoding = <ActivityIndicator size="large"></ActivityIndicator>;
    // const body = this.state.notifications ? notification : landig;
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
          {this.state.notifications ? notification : laoding}
          <Overlay
            isVisible={this.state.visible}
            onBackdropPress={this.toggleOverlay}
          >
            <View style={{ width: 300, height: 200 }}>
              <Text
                style={{ fontSize: 24, alignSelf: "center", color: "#red" }}
              >
                Done
              </Text>
              <TouchableOpacity
                rounded
                onPress={() => {
                  this.toggleOverlay;
                }}
              >
                <Text
                  style={{ fontSize: 24, alignSelf: "center", color: "#red" }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </Overlay>
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
