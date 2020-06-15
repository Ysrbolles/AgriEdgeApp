import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { navigation } from "@react-navigation/native";
import AddScreen from "./AddNodes";
import { SocialIcon, Input, Overlay } from "react-native-elements";
// const [loading, setLoading] = useState(false);
// const navigation = useNavigation();

export default class NotificationsScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false
    }
  }
  toggleOverlay = () => {
    this.setState({visible: !this.state.visible});
  };
  AddNode = () => {
    console.log("teeeeeeeeeeeeeeeeeeeeeest");
    return <AddScreen />;
  };
  render() {
    // LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <Text>Notifications Screen</Text>
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={this.toggleOverlay}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>
              Add Node
            </Text>
          </Text>
        </TouchableOpacity>
        <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay}>
          <AddScreen />
        </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
