import { Box, Card, Icon, Text } from "components";
import { LocalizationContext } from "libs/context";
import { colors } from "libs/theme";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";

interface NotificationChatApp {
  onPress?: any;
  iconName?: any;
}
const NotificationChatApp: React.FC<NotificationChatApp> = ({
  onPress,
  iconName,
}) => {
  const I18n = useContext(LocalizationContext);
  return (
    <Card style={styles.cardStyle}>
      <Box
        row
        alignCenter
        between
      >
        <Text
          bold
          color="white"
        >
          {I18n.t("CHAT.LABEL_CHAT_WITH_BTASKEE")}
        </Text>
        <Box>
          <TouchableOpacity onPress={onPress}>
            <Box
              center
              style={styles.btnStyle}
            >
              <Icon
                name={iconName}
                tintColor={colors.primary}
                color="primary"
              />
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </Card>
  );
};

export default NotificationChatApp;
