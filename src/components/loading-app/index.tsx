import React from "react";
import { useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
import { View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Text, Box } from "@src/components";
import { borderRadius, colors, spacing } from "libs/theme";
import { RootState } from "redux/slice";

const LoadingComponent: React.FunctionComponent = () => {
  const { loading } = useSelector((state: RootState) => state.app);
  const I18n = React.useContext(LocalizationContext);
  if (!loading.isShow) {
    return null;
  }
  let content = loading.content;
  if (loading.contentWithI18n) {
    content = I18n.t(loading.contentWithI18n);
  }
  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <FastImage
        style={{ width: 50, height: 50, marginBottom: spacing.m }}
        source={require("@images/loading.gif")}
        resizeMode={FastImage.resizeMode.contain}
      />
      {content ? (
        <Box
          style={{
            backgroundColor: colors.white,
            padding: spacing.l,
            borderRadius: borderRadius.s,
          }}
        >
          <Text color="primary">{content}</Text>
        </Box>
      ) : null}
    </View>
  );
};

export default LoadingComponent;
