import MaskedView from "@react-native-masked-view/masked-view";
import { Box, Text } from "components";
import { LocalizationContext } from "libs/context";
import { useContext } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "../styles";

const PremiumBanner = ({ isPremiumTasker, navigation }) => {
  const I18n = useContext(LocalizationContext);

  if (!isPremiumTasker) {
    return null;
  }
  return (
    <TouchableOpacity onPress={() => navigation.navigate("PremiumDetail")}>
      <ImageBackground
        resizeMode="cover"
        style={styles.imageBGPremium}
        imageStyle={styles.backgroundImageStyle}
        source={require("@images/premium/banner-premium-tasker.png")}
      >
        <Box
          flex
          style={styles.boxPremiumContent}
        >
          <MaskedView
            style={{ flexDirection: "row", height: "100%" }}
            maskElement={
              <View
                style={{
                  // Transparent background because mask is based off alpha channel.
                  backgroundColor: "transparent",
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <Text
                  bold
                  color="white"
                  fontSize="l"
                >
                  {I18n.t("TRAINING_PREMIUM.TASKER_PREMIUM_SUB_TITLE")}
                </Text>
              </View>
            }
          >
            {/* Shows behind the mask, you can put anything here, such as an image */}
            <View
              style={{
                flex: 1,
                height: "100%",
                backgroundColor: "#faf0d7",
              }}
            />
            <View
              style={{
                flex: 1,
                height: "100%",
                backgroundColor: "#f2dca5",
              }}
            />
            <View
              style={{
                flex: 1,
                height: "100%",
                backgroundColor: "#ebdab5",
              }}
            />
            <View
              style={{
                flex: 1,
                height: "100%",
                backgroundColor: "#faf0d7",
              }}
            />
          </MaskedView>
        </Box>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default PremiumBanner;
