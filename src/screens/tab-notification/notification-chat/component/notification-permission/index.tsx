import React, { useContext } from "react";
import { Box, Card, Text, Icon, Button } from "components";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import { TouchableOpacity } from "react-native";
import { colors } from "libs/theme";

interface INotificationPermission {
  onPress?: any;
  disabled?: boolean;
}

const NotificationPermission: React.FC<INotificationPermission> = ({
  onPress,
  disabled,
}) => {
  const I18n = useContext(LocalizationContext);

  if (!disabled) return null;

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Card style={styles.cardStyle}>
          <Box row>
            <Box style={styles.boxContainer}>
              <Icon
                name="bell"
                color="secondary"
              />
            </Box>
            <Box flex>
              <Text
                bold
                fontSize="m"
              >
                {I18n.t("NOTIFICATION.TITLE_NOTIFICATION_WARNING")}
              </Text>
              <Box style={styles.text}>
                <Text
                  color="grey1"
                  fontSize="m"
                >
                  {I18n.t("NOTIFICATION.CONTENT_NOTIFICATION_WARNING")}
                </Text>
              </Box>
              <Box
                row
                style={styles.styleNoti}
              >
                <Button
                  testID="btnTurnOnNotification"
                  title={I18n.t("NOTIFICATION.TURN_ON_NOTIFICATION")}
                  titleStyle={styles.text2}
                  size="sm"
                  onPress={onPress}
                />
              </Box>
            </Box>
          </Box>
        </Card>
      </TouchableOpacity>
    </>
  );
};

export default NotificationPermission;
