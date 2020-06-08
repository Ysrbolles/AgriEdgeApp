import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { navigation } from "@react-navigation/native";
// const [loading, setLoading] = useState(false);
// const navigation = useNavigation();

export default class NotificationsScreen extends React.Component {
  render() {
    // LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <Text>Notifications Screen</Text>
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => this.props.navigation.navigate("AddNodes")}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            New to SocialApp?{" "}
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
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
