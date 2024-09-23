import { Box, Button, Image, Text } from "components";
import { LocalizationContext } from "libs/context";
import { navigateTo } from "libs/helper";
import { spacing } from "libs/theme";
import { useContext } from "react";
import { ImageBackground } from "react-native";
import styles from "./styles";

const CardShare = () => {
  const I18n = useContext(LocalizationContext);

  return (
    <Box
      flex
      style={[styles.containerStyle]}
    >
      <ImageBackground
        resizeMode="cover"
        style={{
          padding: spacing.l,
          paddingBottom: spacing.m,
        }}
        source={require("@images/share/share-background.png")}
      >
        <Box
          row
          between
        >
          <Box
            flex
            between
            style={styles.boxContent}
          >
            <Text
              variant="h3"
              color="primary"
            >
              {I18n.t("TAB_ACCOUNT.TITLE_CARD_SHARE")}
            </Text>
            <Text
              style={styles.txtShare}
              color="primary"
            >
              {I18n.t("TAB_ACCOUNT.CONTENT_CARD_SHARE")}
            </Text>
            <Button
              testID="btnViewMore"
              onPress={() => navigateTo("ShareScreen")}
              size="md"
              style={styles.containerBtn}
            >
              <Text
                fontSize="m"
                color="white"
                bold
              >
                {I18n.t("TAB_ACCOUNT.BUTTON_VIEW_MORE")}
              </Text>
            </Button>
          </Box>
          <Box
            flex
            center
          >
            <Image
              source={require("@images/share/image-share.png")}
              style={{
                width: 130,
                height: 130,
              }}
            />
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default CardShare;
