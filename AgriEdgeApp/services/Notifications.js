import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
registerForPushNotificationsAsync = async (currentUser) => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return;
  }
  if (Platform.OS === "android") {
    Notifications.createChannelAndroidAsync("default", {
      name: "default",
      sound: true,
      priority: "max",
      vibrate: [0, 250, 250, 250],
    });
  }
  if (Platform.OS === "android") {
    Notifications.createChannelAndroidAsync("default", {
      name: "default",
      sound: true,
      priority: "max",
      vibrate: [0, 250, 250, 250],
    });
  }
  try {
    let token = await Notifications.getExpoPushTokenAsync();
    firebase
      .database()
      .ref("users/" + currentUser.uid + "/push_token")
      .set(token);
  } catch (error) {
    console.log(error);
  }
};

export default registerForPushNotificationsAsync