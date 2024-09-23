/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2022-10-12 10:19
 * @modify date 2022-10-12 10:19
 * @desc Config header journey
 */
import { TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Text, Box, Icon } from "@src/components";
import HeaderBackButton from "components/header-back-button";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import { navigateTo } from "libs/helper";
import { useNavigation } from "@react-navigation/native";

interface IHeaderJourney {
  url?: string;
  isShowRightButton?: boolean;
}

const HeaderJourney: React.FC<IHeaderJourney> = ({
  url,
  isShowRightButton
}) => {
  const I18n = useContext(LocalizationContext);
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets(); // for Iphone X
  const navigation = useNavigation();

  // get header height
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  return (
    <Box alignCenter style={[styles.container, { height: headerHeight }]}>
      {/* Button back */}
      <Box
        flex
        style={styles.btnBack}
      >
        <Box style={styles.wrapperBack}>
          <HeaderBackButton navigation={navigation} />
        </Box>
      </Box>
      {/* End button back */}
      <Box style={styles.header}>
        <Text
          color="white"
          style={styles.title}
        >
          {I18n.t("JOURNEY.TITLE")}
        </Text>
      </Box>
      {
        url && isShowRightButton ? (
          <Box style={styles.grGiftButton}>
            <TouchableOpacity
              onPress={() => navigateTo("WebviewDetail", { url: url, title: I18n.t("JOURNEY.TITLE_DETAIL_JOURNEY") })}
            >
              <Icon
                size="l"
                name="faq"
                color="white"
              />
            </TouchableOpacity>
          </Box>
        ) : null
      }
    </Box>
  );
};

export default HeaderJourney;
