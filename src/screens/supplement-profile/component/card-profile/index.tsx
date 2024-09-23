import React, { useContext } from "react";
// Components
import { Box, Card, Divider, Text, Image, Stamp } from "components";
// Styles
import styles from "./styles";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { LocalizationContext } from "libs/context";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { colors } from "libs/theme";

interface ICardProfile {
  testID?: string;
  textTitle: any;
  textSup: any;
  styleTextSup?: object;
  isChecked?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  name?: string;
}

const CardProfile: React.FC<ICardProfile> = ({
  testID,
  textTitle,
  textSup,
  styleTextSup,
  isChecked,
  onPress,
  name,
}) => {
  const I18n = useContext(LocalizationContext);
  // check taskerProfileInfo
  const { taskerProfileInfo } = useSelector((state: RootState) => state.app);
  // check HOUSE_HOLD VÀ IDENTITY_CARD có trong taskerProfileInfo
  const isApproved = taskerProfileInfo?.approvedFields?.includes(name);
  const isRejected = taskerProfileInfo?.rejectedFields?.includes(name);

  const _renderIcon = () => {
    if (isChecked) {
      return (
        <Image
          source={require("@images/supplement-check.png")}
          style={styles.image}
        />
      );
    }
    if (isRejected) {
      return (
        <Stamp
          title={I18n.t("PROCEDURE_ACTIVE_ACCOUNT.REJECTED_TITLE")}
          type="failed"
          testID={testID + "_rejected"}
        />
      );
    }
    if (isApproved) {
      return (
        <Stamp
          title={I18n.t("PROCEDURE_ACTIVE_ACCOUNT.APPROVED_TITLE")}
          testID={testID + "_approved"}
        />
      );
    }
  };

  const checkBorderColor = () => {
    if (isApproved) {
      return colors.success;
    }
    if (isRejected) {
      return colors.error;
    }
    return null;
  };

  return (
    <Card
      testID={testID}
      style={{
        borderColor: checkBorderColor(),
        borderWidth: isApproved || isRejected ? 1 : 0,
        backgroundColor: isApproved ? colors.grey5 : colors.background,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={isApproved}
      >
        <Box
          row
          style={[styles.boxContainer]}
        >
          {/* Text */}
          <Box flex>
            <Box>
              <Text bold>{I18n.t(textTitle)}</Text>
              <Divider
                width={1}
                style={styles.divider}
              />
            </Box>
            <Box style={[styles.text]}>
              <Text
                style={[styleTextSup]}
                color="secondary"
              >
                {I18n.t(textSup)}
              </Text>
            </Box>
          </Box>
          {/* Image */}
          <Box
            center
            style={styles.boxImage}
          >
            {_renderIcon()}
          </Box>
        </Box>
      </TouchableOpacity>
    </Card>
  );
};

export default CardProfile;
