import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

import Box from "components/box";
import { checkAnimationDisable } from "libs/helper";

interface ZoomingImageProps {
  imageSource: any; // Replace 'any' with the appropriate type for your image source
  imageStyle?: {};
  duration?: number;
  scaleTo?: number;
}

const ZoomingImage: React.FC<ZoomingImageProps> = ({ imageSource, imageStyle, duration = 1000, scaleTo = 1.1 }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    !checkAnimationDisable() ? startZooming() : null;
  }, []);

  const startZooming = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: scaleTo, // Zoom in to scaleTo times the original size
          duration: duration, // Duration of zoom-in animation
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, // Zoom back to the original size
          duration: duration, // Duration of zoom-out animation
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const animatedStyle = { transform: [{ scale: scaleValue }] };

  return (
    <Box>
      <Animated.Image
        source={imageSource}
        style={[animatedStyle, imageStyle]} // Adjust the width and height as needed
        resizeMode={"center"}
      />
    </Box>
  );
};

export default ZoomingImage;
