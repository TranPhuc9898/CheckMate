import React from "react";
import { useNetInfo } from "@react-native-community/netinfo";

import { StyleSheet, View } from "react-native";
import { Text } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import moment from "moment";

const TIMEOUT_CHECK_CONNECTION = 30; // After 10s app lauched
let current = null;

const NetInfo = (props) => {
  const I18n = React.useContext(LocalizationContext);
  const netInfo = useNetInfo();

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    current = moment().add(TIMEOUT_CHECK_CONNECTION, "seconds");
  }, []);

  React.useEffect(() => {
    if (moment().isAfter(current)) {
      setVisible(true);
      setTimeout(() => {
        if (netInfo?.isConnected) {
          setVisible(false);
        }
      }, 2000);
    }
  }, [netInfo?.isConnected]);

  if (visible) {
    return (
      <View style={[styles.container, netInfo?.isConnected && styles.online]}>
        <Text
          color="white"
          center
        >
          {netInfo?.isConnected
            ? I18n.t("HOME.NET_ONLINE")
            : I18n.t("HOME.NET_DISCONNECTED")}
        </Text>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  online: {
    backgroundColor: "green",
  },
  container: {
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    // top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});

export default NetInfo;
