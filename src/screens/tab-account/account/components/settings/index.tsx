import React, { FunctionComponent, ComponentProps, useContext } from "react";
import { View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { CardItem, Box, Text } from "@src/components";
import styles from "./styles";

interface ISettings extends ComponentProps<typeof View> {
  navigation?: any;
  user?: any;
}

const SettingsScreen: FunctionComponent<ISettings> = ({ navigation, user }) => {
  const I18n = useContext(LocalizationContext);

  return (
    <CardItem
      testID="SettingsDetail"
      iconName="right"
      title={I18n.t("SETTINGS.SETTINGS")}
      onPress={() => navigation.navigate("SettingsDetail")}
    >
      <Box
        row
        center
        style={styles.boxIteam}
      >
        <Text>{I18n.t("SETTINGS.NOTIFICATION_TASK")}</Text>
        <Text>
          {I18n.t(
            user.noReceiveNotification
              ? "SETTINGS.NOTIFICATION_OFF"
              : "SETTINGS.NOTIFICATION_ON"
          )}
        </Text>
      </Box>
    </CardItem>
  );
};

export default SettingsScreen;
