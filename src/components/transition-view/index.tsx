import * as React from "react";
import * as Animatable from "react-native-animatable";

import { checkAnimationDisable } from "libs/helper";

const DURATION = 300;
interface FlatListProps {
  index?: number;
  animation?: //Attention Seekers
  | "bounce"
    | "flash"
    | "jello"
    | "pulse"
    | "rotate"
    | "rubberBand"
    | "shake"
    | "swing"
    | "tada"
    | "wobble"
    // Bouncing Entrances
    | "bounceIn"
    | "bounceInDown"
    | "bounceInUp"
    | "bounceInLeft"
    | "bounceInRight"
    // Bouncing Exits
    | "bounceOut"
    | "bounceOutDown"
    | "bounceOutUp"
    | "bounceOutLeft"
    | "bounceOutRight"
    // Fading Entrances
    | "fadeIn"
    | "fadeInDown"
    | "fadeInDownBig"
    | "fadeInUp"
    | "fadeInUpBig"
    | "fadeInLeft"
    | "fadeInLeftBig"
    | "fadeInRight"
    | "fadeInRightBig"
    // Fading Exits
    | "fadeOut"
    | "fadeOutDown"
    | "fadeOutDownBig"
    | "fadeOutUp"
    | "fadeOutUpBig"
    | "fadeOutLeft"
    | "fadeOutLeftBig"
    | "fadeOutRight"
    | "fadeOutRightBig"
    // Flippers
    | "flipInX"
    | "flipInY"
    | "flipOutX"
    | "flipOutY"
    // Lightspeed
    | "lightSpeedIn"
    | "lightSpeedOut"
    // Sliding Entrances
    | "slideInDown"
    | "slideInUp"
    | "slideInLeft"
    | "slideInRight"
    // Sliding Exits
    | "slideOutDown"
    | "slideOutUp"
    | "slideOutLeft"
    | "slideOutRight"
    // Zooming Entrances
    | "zoomIn"
    | "zoomInDown"
    | "zoomInUp"
    | "zoomInLeft"
    | "zoomInRight"
    // Zooming Exits
    | "zoomOut"
    | "zoomOutDown"
    | "zoomOutUp"
    | "zoomOutLeft"
    | "zoomOutRight";

  duration?: number;
  children?: JSX.Element;
  style?: any;
}
/**
 * @link https://github.com/oblador/react-native-animatable
 * - index: tính thời gian delay theo số thư tự của item, bắt đầu từ 0
 * - animation: Loại hiệu ứng, mặc định fadeIn
 * - duration: Thời gian chạy, mặc định 300ms
 */
const TransitionView = (props: FlatListProps) => {
  const { index, children, animation, duration, ...others } = props;
  return (
    <Animatable.View
      animation={!checkAnimationDisable() ? animation || "fadeIn" : null}
      useNativeDriver={true}
      duration={duration || DURATION}
      delay={index ? (index * DURATION) / 3 : 0}
      {...others}
    >
      {children ? children : null}
    </Animatable.View>
  );
};

export default TransitionView;
