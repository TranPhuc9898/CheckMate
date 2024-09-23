import React, { useLayoutEffect, useState } from "react";
import { Animated, Dimensions, TouchableOpacity } from "react-native";
import Config from "react-native-config";
import { useSelector } from "react-redux";
// LODASH
import _ from "lodash";

// COMPONENT
import { Badge, Icon } from "components";
import { checkAnimationDisable, navigateTo } from "libs/helper";
import { RootState } from "redux/slice";

// STYLES
import styles from "./styles";

const width = Dimensions.get("window").width;
interface IMonthlyRewardIcon {
  fromHomePage: boolean;
}
const IconMonthlyReward: React.FC<IMonthlyRewardIcon> = ({ fromHomePage }) => {
  const monthlyReward = useSelector((state: RootState) => state.getMonthlyReward);
  //   ANIMATION
  // animation move Value
  const [animationValue] = useState(new Animated.Value(width * 2));
  // animtion share value
  const shakeAnimation = new Animated.Value(0);

  // Shake Animation when it have route?.rewardId
  const shake = () => {
    if (checkAnimationDisable()) return;
    shakeAnimation.setValue(0);
    Animated.timing(shakeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => shake());
  };
  // Render Animation Shake
  useLayoutEffect(() => {
    shake();
  }, [shakeAnimation]);

  const animation = () => {
    if (checkAnimationDisable()) return;
    // Start the animation when the component mounts
    Animated.timing(animationValue, {
      toValue: -20, // Move the element 100 pixels to the left
      duration: 1500, // The animation should take 1 second
      useNativeDriver: true,
    }).start();
  };

  // Render Move automactically
  useLayoutEffect(() => {
    animation();
  }, []);

  // Không có rewardId -> return
  if (!monthlyReward?.data?.rewardId) {
    return null;
  }

  return (
    <TouchableOpacity
      testID="btnRewardScreen"
      onPress={() => navigateTo("MonthlyRewardDetail", monthlyReward?.data)}
    >
      {/* animation shake */}
      <Animated.View
        style={[
          styles.buttonNotification,
          {
            transform: [
              {
                translateX: animationValue,
              },
            ],
          },
        ]}
      >
        {/* animation move */}
        <Animated.View
          style={{
            transform: [
              {
                rotate: shakeAnimation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "15deg", "0deg"],
                }),
              },
            ],
          }}
        >
          <Icon
            name="gift"
            width={30}
            height={30}
          />
          <Badge containerStyle={styles.badge} />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default IconMonthlyReward;
