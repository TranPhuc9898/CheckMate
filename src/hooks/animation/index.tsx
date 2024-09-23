/**
 * @author Duc Anh Pham
 * @email ducanh.pham@btaskee.com
 * @create date 2023-07-20 11:57:18
 * @modify date 2023-07-20 11:57:18
 * @desc Sự dụng cho layout animation
 */

import { LayoutAnimation, Platform, UIManager } from "react-native";
import { checkAnimationDisable } from "libs/helper";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type animation = "spring" | "linear" | "easeInEaseOut";

export function useAnimation(animation: animation = "spring") {
  // Not run animation when testing mode
  if (checkAnimationDisable()) {
    return null;
  }
  if (animation === "spring") {
    return LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }
  if (animation === "linear") {
    return LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  }
  if (animation === "easeInEaseOut") {
    return LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }
}
