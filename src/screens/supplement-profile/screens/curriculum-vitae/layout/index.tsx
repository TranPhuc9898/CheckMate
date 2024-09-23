import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-native";
import { Box, Container, Text, Button, Icon } from "components";
import { navigateTo } from "libs/helper";

import styles from "./styles";
import NoteSupplement from "screens/supplement-profile/component/note-supplement";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import _ from "lodash";
import { LocalizationContext } from "libs/context";
import { useIsFocused } from "@react-navigation/native";
//
import Lightbox from "react-native-lightbox-v2";

const CurriculumVitae = () => {
  const [fromCurriculum, setFromCurriculum] = useState(true);
  const uploadImage = useSelector((state: RootState) => state.uploadImage);
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused;
  }, [isFocused]);

  const I18n = useContext(LocalizationContext);
  return (
    <Container headerShow={true}>
      {/* Note Supplement*/}
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
          {/* Check Image */}
          <Box
            center
            style={styles.boxImage}
          >
            {_.isEmpty(uploadImage?.curriculumFrontImage) ? (
              <Image
                source={require("assets/images/active-account/curriculum-front.png")}
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
                    uri: `${
                      uploadImage?.curriculumFrontImage
                    }?${Math.random()}`,
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
              navigateTo("UploadImageCurriculum", fromCurriculum);
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
          {/* Check Image */}
          <Box
            center
            style={styles.boxImage}
          >
            {_.isEmpty(uploadImage?.curriculumBackImage) ? (
              <Image
                source={require("assets/images/active-account/curriculum-back.png")}
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
                    uri: `${uploadImage?.curriculumBackImage}?${Math.random()}`,
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
              navigateTo("UploadImageCurriculum", !fromCurriculum);
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

export default CurriculumVitae;
