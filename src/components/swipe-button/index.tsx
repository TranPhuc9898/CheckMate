import SwipeButton from "rn-swipe-button";
import { View } from "react-native";
import { colors, borderRadius, spacing } from "@src/libs/theme";
import { Icon } from "@src/components";
import React from "react";
import { getFontFamilyByLocale } from "libs/helper";

interface ISwipeButton extends React.ComponentProps<typeof SwipeButton> {}
const SIZE_THUMB_ICON = 52;
const HEIGHT_BUTTON = 56;
/**
 * @see https://github.com/UdaySravanK/RNSwipeButton
 */
const CustomSwipButton: React.FunctionComponent<ISwipeButton> = (props) => {
  const CheckoutButton = () => {
    return (
      <View
        testID="swipeBtn"
        style={{
          width: SIZE_THUMB_ICON,
          height: SIZE_THUMB_ICON,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          name="right"
          size="l"
          color="black"
        />
      </View>
    );
  };
  return (
    <SwipeButton
      {...props}
      // onSwipeSuccess={() => alert("Slide success!")}
      disableResetOnTap={true}
      railBackgroundColor={colors.secondary}
      railBorderColor={colors.secondary}
      title={props.title}
      thumbIconComponent={CheckoutButton}
      titleColor={colors.white}
      titleStyles={{
        fontFamily: getFontFamilyByLocale().normal,
        fontWeight: "600",
        fontSize: 16,
      }}
      thumbIconBackgroundColor={colors.white}
      thumbIconWidth={SIZE_THUMB_ICON}
      titleMaxFontScale={1}
      thumbIconBorderColor={colors.white}
      height={HEIGHT_BUTTON}
      containerStyles={{ borderRadius: borderRadius.s, padding: spacing.s }}
      railStyles={{
        borderRadius: 10,
        backgroundColor: "#44000088",
        borderColor: "#44000088",
      }}
      thumbIconStyles={{ borderRadius: 10 }}
      swipeSuccessThreshold={95}
    />
  );
};

export default CustomSwipButton;
