import React, { useContext, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

import { Box, Icon, RewardIcon, Text } from "@src/components";
import HeaderBackButton from "components/header-back-button";
import { LocalizationContext } from "libs/context";
import { formatMoney, getFontFamilyByLocale } from "libs/helper";
import { borderRadius, colors, spacing } from "libs/theme";
import { RootState } from "redux/slice";

const SPACING = spacing.l;

interface IHeaderReward {
  getHeight?: (headerHeight: number) => void;
  scrollY: Animated.Value;
  heightHeader: number;
}

const PointReward = ({ point = "0" }) => {
  return (
    <Box
      testID="btnMyPoint"
      row
    >
      <Icon
        name="point"
        size="l"
        color="secondary"
      />
      <Box>
        <Text
          bold
          color="secondary"
          style={styles.txtPoint}
        >
          {point}
        </Text>
      </Box>
    </Box>
  );
};

const Gift = () => {
  return (
    <Box style={styles.giftContainer}>
      <RewardIcon />
    </Box>
  );
};
export const ToolBarReward: React.FC<IHeaderReward> = ({ getHeight, heightHeader, scrollY }) => {
    const navigation = useNavigation();
    const I18n = useContext(LocalizationContext);
    const frame = useSafeAreaFrame();
    const insets = useSafeAreaInsets(); // for Iphone X
    const TOOLBAR_HEIGHT = getDefaultHeaderHeight(frame, false, insets.top) + spacing.l;
  
    const { user } = useSelector((state: RootState) => state.app);
  
    useEffect(() => {
      getHeight?.(TOOLBAR_HEIGHT);
    }, []);
  
    const SCROLL = SPACING + heightHeader;
    const SCROLL_HAFT = SCROLL / 2;
    const INPUT_RANGE = [0, SCROLL_HAFT, SCROLL];
  
    const translateYPoint = scrollY.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [0, -SCROLL_HAFT, -SCROLL],
      extrapolate: "clamp",
    });
    const opacityPoint = scrollY.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [1, 0, 0],
      extrapolate: "clamp",
    });
  
    const translateYGift = scrollY.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [SCROLL, SCROLL_HAFT, 0],
      extrapolate: "clamp",
    });
  
    const opacityGift = scrollY.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [0, 0.5, 1],
      extrapolate: "clamp",
    });
  
    const opacityBackground = scrollY.interpolate({
      inputRange: [0, SPACING],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
  
    const colorTitle = scrollY.interpolate({
      inputRange: [0, SPACING],
      outputRange: [colors.black, colors.white],
      extrapolate: "clamp",
    });
    return (
        <Box style={[styles.container, { height: TOOLBAR_HEIGHT }]}>
          <Animated.View style={[styles.animatedBackground, { opacity: opacityBackground }]} />
          <Box
            row
            alignCenter
            style={styles.contentContainer}
          >
            <Box style={styles.wrapperBack}>
              <HeaderBackButton navigation={navigation} />
            </Box>
            <Animated.Text style={[styles.titleTxt, { color: colorTitle }]}>
              {I18n.t("TAB_BENEFIT.PROMOTION")}
            </Animated.Text>
            <Animated.View
              style={[
                {
                  transform: [{ translateY: translateYPoint }],
                  opacity: opacityPoint,
                },
              ]}
            >
              <PointReward point={formatMoney(user?.point)} />
            </Animated.View>
            <Animated.View
              style={[
                styles.giftAnimatedContainer,
                {
                  transform: [{ translateY: translateYGift }],
                  opacity: opacityGift,
                },
              ]}
            >
              <Gift />
            </Animated.View>
          </Box>
        </Box>
      );
    };

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingBottom: SPACING,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
    },
    animatedBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.primary,
    },
    contentContainer: {
        paddingHorizontal: SPACING,
        overflow: "hidden",
    },
    wrapperBack: {
        borderRadius: 15,
        backgroundColor: colors.primary1,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    titleTxt: {
        fontSize: 17,
        fontWeight: "700",
        flex: 1,
        textAlign: "center",
        marginLeft: spacing.xl,
        fontFamily: getFontFamilyByLocale().bold,
    },
    giftAnimatedContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: SPACING,
        height: "100%",
    },
    
    giftContainer: {
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: borderRadius.s,
    },
    txtPoint: {
        marginLeft: spacing.s,
    },
});