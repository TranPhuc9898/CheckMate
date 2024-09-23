/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-10-12 10:19
 * @modify date 2022-10-12 10:19
 * @desc Config header reward
 */
import { TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Text, Box, Icon, LottieView, RewardIcon } from "@src/components";
import HeaderBackButton from "components/header-back-button";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import { spacing } from "libs/theme";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { formatMoney } from "libs/helper";

interface IHeaderReward {
  hideHeadBack?: boolean;
  title?: string;
  navigation?: any;
  headerStyle?: object;
  giftStyle?: object;
  isHideRightIcon?: boolean;
  // Qùa
  isGift?: boolean;
}

const HeaderReward: React.FC<IHeaderReward> = ({
  hideHeadBack,
  headerStyle,
  giftStyle,
  title,
  navigation,
  isHideRightIcon,
  isGift = false,
}) => {
  const I18n = useContext(LocalizationContext);
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets(); // for Iphone X

  const { user } = useSelector((state: RootState) => state.app);

  // get header height
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  const _renderRightButton = () => {
    if (isHideRightIcon) {
      return null;
    }
    return (
      <Box style={[styles.grButton, giftStyle]}>
        <Box
          row
          testID="btnMyPoint"
          style={styles.boxIcon}
        >
          <Icon
            name="point"
            size={"l"}
            color="secondary"
          />
          <Box>
            <Text
              bold
              color="secondary"
              style={styles.txtPoint}
            >
              {formatMoney(user?.point || 0)}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  };

  const _renderGiftButton = () => {
    if (isHideRightIcon) {
      return null;
    }
    return (
      <Box style={styles.grGiftButton}>
        <RewardIcon />
      </Box>
    );
  };

  return (
    <Box style={[styles.container, { height: headerHeight }]}>
      {/* Button back */}
      {!hideHeadBack ? (
        <Box
          flex
          style={styles.btnBack}
        >
          <Box style={styles.wrapperBack}>
            <HeaderBackButton navigation={navigation} />
          </Box>
        </Box>
      ) : null}
      {/* End button back */}
      <Box style={styles.header}>
        <Text
          color="black"
          style={[styles.title, headerStyle]}
        >
          {title ? title : I18n.t("TAB_BENEFIT.PROMOTION")}
        </Text>
      </Box>
      {isGift ? _renderGiftButton() : _renderRightButton()}
    </Box>
  );
};

export default HeaderReward;
