import "react-native-get-random-values";

import { StyleSheet, TouchableOpacity } from "react-native";
import { getCurrentLocation, isIOS, openUrl } from "@src/libs/helper";
import { Alert, Icon } from "components";
import { LocalizationContext } from "libs/context";
import moment from "moment";
import { useContext } from "react";
import AndroidOpenSettings from "react-native-android-open-settings";
import { v4 as uuidv4 } from "uuid";
import { setLoading } from "../../../redux/slice/app-slice";

interface ISendLocation {
  onSend?: any;
  user?: any;
}
const SendLocation: React.FC<ISendLocation> = ({ onSend, user }) => {
  const I18n = useContext(LocalizationContext);
  const _onSend = (location) => {
    onSend([
      {
        _id: uuidv4(),
        location: location,
        createdAt: moment().toDate(),
        user: {
          _id: user,
        },
      },
    ]);
  };

  const _getLocation = async () => {
      const currentLocation: any = await getCurrentLocation();
      if (currentLocation) {
        return _onSend({
          longitude: currentLocation?.coords?.longitude,
          latitude: currentLocation?.coords?.latitude,
        });
      }
  };
  const _onPressShareLocation = () => {
    Alert.alert.open({
      title: "DIALOG.TITLE_INFORMATION",
      message: "CHAT.MODAL_CONFIRM_SHARE_LOCATION_TITLE",
      actions: [
        {
          text: "DIALOG.BUTTON_ACCEPT",
          onPress: () => {
            _getLocation();
            setLoading(true);
            Alert.alert.close();
          },
        },
        { text: "DIALOG.BUTTON_CLOSE", style: "cancel" },

      ],
    });
  };
  return (
    <TouchableOpacity
      style={styles.wrap_iconNew}
      onPress={_onPressShareLocation}
    >
      <Icon
        name="position"
        color="primary"
        size="xxl"
      />
    </TouchableOpacity>
  );
};

export default SendLocation;

const styles = StyleSheet.create({
  wrap_iconNew: {
    justifyContent: "center",
  },
});
