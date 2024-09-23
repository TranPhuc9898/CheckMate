import { Alert, Box, Button, Container, Divider, Icon, Text } from "components";
import styles from "./styles";
//libs
import { IRespond, navigateTo } from "libs/helper";
import _ from "lodash";
import { InteractionManager, Image } from "react-native";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import NoteSupplement from "screens/supplement-profile/component/note-supplement";
import { LocalizationContext } from "libs/context";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import React from "react";
import Lightbox from "react-native-lightbox-v2";

const UploadProfile = () => {
  // Hook
  const uploadImage = useSelector((state: RootState) => state.uploadImage);
  const [from, setFrom] = useState(true);
  const I18n = useContext(LocalizationContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused;
  }, [isFocused]);

  return (
    <Container headerShow={true}>
      {/* Note Supplement */}
      <NoteSupplement />
      <Box
        row
        flex
        between
        margin="m"
      >
        <Box
          flex
          center
          style={styles.containerUpload}
        >
          <Text bold>{I18n.t("SUPPLEMENT_INFO.IMAGE_FRONT_SIDE")}</Text>
          <Box center>
            {_.isEmpty(uploadImage?.identityFrontImage) ? (
              <Image
                source={require("assets/images/active-account/font-end.png")}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            ) : (
              <Lightbox
                activeProps={{
                  style: styles.imageActive,
                }}
                underlayColor=""
                // doubleTapMaxZoom={2}
                swipeToDismiss={true}
              >
                <Image
                  source={{
                    uri: `${uploadImage?.identityFrontImage}?${Math.random()}`,
                  }}
                  style={styles.imageStyle}
                  resizeMode="contain"
                />
              </Lightbox>
            )}
          </Box>
          <Button
            size="md"
            onPress={() => {
              navigateTo("UploadImageProfile", from);
            }}
          >
            <Box
              row
              alignCenter
              style={styles.containerBtn}
            >
              <Icon
                name="upload"
                size="m"
              />
              <Text
                style={styles.txtBtn}
                fontSize="m"
                color="white"
                fontWeight="m"
              >
                {I18n.t("SUPPLEMENT_INFO.UPLOAD")}
              </Text>
            </Box>
          </Button>
        </Box>
        <Box
          flex
          center
          style={styles.containerUpload}
        >
          <Text bold>{I18n.t("SUPPLEMENT_INFO.IMAGE_BACK_SIDE")}</Text>
          <Box center>
            {_.isEmpty(uploadImage?.identityBackImage) ? (
              <Image
                source={require("assets/images/active-account/back-end.png")}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            ) : (
              <Lightbox
                activeProps={{
                  style: styles.imageActive,
                }}
                underlayColor=""
                // doubleTapMaxZoom={2}
                swipeToDismiss={true}
              >
                <Image
                  source={{
                    uri: `${uploadImage?.identityBackImage}?${Math.random()}`,
                  }}
                  style={styles.imageStyle}
                  resizeMode="contain"
                />
              </Lightbox>
            )}
          </Box>
          <Button
            size="md"
            onPress={() => {
              navigateTo("UploadImageProfile", !from);
            }}
          >
            <Box
              row
              alignCenter
              style={styles.containerBtn}
            >
              <Icon
                name="upload"
                size="m"
              />
              <Text
                style={styles.txtBtn}
                fontSize="m"
                color="white"
                fontWeight="m"
              >
                {I18n.t("SUPPLEMENT_INFO.UPLOAD")}
              </Text>
            </Box>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default UploadProfile;
