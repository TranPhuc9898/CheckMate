import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Card, Divider, Icon, Text } from "components";
import { LocalizationContext } from "libs/context";

import _ from "lodash";

import styles from "./styles";
import { colors } from "libs/theme";
import { openUrl, callSupport } from "libs/helper";
import Communications from "react-native-communications";
interface ISocialReward {
  data: any;
}
const iconSocial = {
  hotline: "phoneCall",
  website: "web",
  facebook: "facebook_outline",
  instagram: "instagram_outline",
  email: "mail_outline",
};

const RenderSocialReward: React.FC<ISocialReward> = ({ data }) => {
  // Hook
  const I18n = useContext(LocalizationContext);

  // Clone data social
  const listSocial = _.cloneDeep(data?.social);
  // Nếu không có social -> return null
  if (_.isEmpty(listSocial)) {
    return null;
  }
  // Xóa ios and android ra khỏi social
  if (listSocial?.ios) {
    delete listSocial?.ios;
  }
  if (listSocial?.android) {
    delete listSocial?.android;
  }

  // Handle on press link social
  const handleOnPress = (key, value) => {
    // Hotline -> call
    if (key === "hotline") {
      return callSupport(value);
    }
    // Email -> send email
    if (key === "email") {
      const subject = `[Hỗ trợ] ${data?.title?.vi}`;
      return Communications.email([value], null, null, subject, null);
    }
    // Open Url
    return openUrl(value);
  };

  // Function
  const _renderSocial = () => {
    return Object.entries(listSocial).map(([key, value], index) => (
      <TouchableOpacity
        key={key}
        onPress={() => handleOnPress(key, value)}
      >
        <Box
          alignCenter
          row
          style={styles.boxSocial}
        >
          <Box>
            <Icon
              name={iconSocial[key]}
              size="l"
              color="primary"
            />
          </Box>
          <Box
            flex
            style={styles.boxText}
          >
            <Text numberOfLines={2}>{value}</Text>
          </Box>
        </Box>
        {index < Object.keys(listSocial).length - 1 ? (
          <Divider
            width={1}
            color={colors.grey3}
            style={styles.boxDivider}
          />
        ) : null}
      </TouchableOpacity>
    ));
  };

  return (
    <Card flex>
      <Box>
        <Text bold>{I18n.t("BREWARD.TITLE_CONTACT")}</Text>
      </Box>
      {/* Liên hệ */}
      <Box>{_renderSocial()}</Box>
    </Card>
  );
};

export default RenderSocialReward;
