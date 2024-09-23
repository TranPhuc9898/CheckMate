/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-10-12 10:19
 * @modify date 2022-10-12 10:19
 * @desc Config header reward
 */
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Text, Box, Icon, Alert } from "@src/components";
import HeaderBackButton from "components/header-back-button";
import { LocalizationContext } from "libs/context";
import styles from "./styles";

interface IHeaderSystem {
  hideHeadBack?: boolean;
  navigation?: any;
  headerStyle?: object;
  giftStyle?: object;
  headerTitle?:any
  headerIcon?:any
  onPress?:(event: GestureResponderEvent) => void
}

const HeaderSystem: React.FC<IHeaderSystem> = ({ hideHeadBack, headerStyle, giftStyle, navigation,headerTitle,headerIcon,onPress   }) => {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets(); // for Iphone X

  // get header height
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  return (
    <Box style={[styles.container, { height: headerHeight }]}>
      {/* Button back */}
      {!hideHeadBack ? <Box
        flex
        style={styles.btnBack}
      >
        <HeaderBackButton navigation={navigation} />
      </Box> : null}
      {/* End button back */}
      <Box style={styles.header}>
        <Text
          color="white"
          style={[styles.title, headerStyle]}
        >
          {headerTitle}
        </Text>
      </Box>
      <Box style={[styles.grButton, giftStyle]}>
        <TouchableOpacity style={styles.wrapper} testID="btnLogout" onPress={onPress}>
          <Icon name={headerIcon} size="xl" />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default HeaderSystem;
