/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-10-12 10:19
 * @modify date 2022-10-12 10:19
 * @desc Config header home
 */
import React from "react";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import _ from "lodash";

import { Box, ConditionView, Text } from "@src/components";

import RightButton from "./right-button";
import RightButtonWeather from "./right-button-weather";
// STYLES
import styles from "./styles";
// import IconNotification from "./icon-notification";

interface IHeaderHome {
  title?: string;
  navigation?: any;
  fromHomePage?: any;
  isShowWeather?: boolean;
}

const HeaderHome: React.FC<IHeaderHome> = ({ title, fromHomePage, isShowWeather }) => {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets(); // for Iphone X

  // get header height
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  return (
    <Box style={[styles.container, { height: headerHeight }]}>
      <Box style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </Box>
      <Box style={styles.rightButton}>
        <Box row>
          <ConditionView
            condition={isShowWeather}
            viewTrue={<RightButtonWeather />}
            viewFalse={<RightButton fromHomePage={fromHomePage} />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderHome;
