import { useContext, useState } from "react";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { Box, Container, Card, Text, Button, Alert } from "components";

// Styles
import styles from "./styles";

// Libs
import {
  getKeyPreFixProfile,
  getUserIdGlobal,
  isAndroid,
  navigateTo,
} from "libs/helper";

// Other Libs
import ImagePicker from "react-native-image-crop-picker";

import _ from "lodash";
import { RNS3 } from "react-native-aws3";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/slice";
import {
  setCertificateBackImage,
  setCertificateFrontImage,
} from "screens/supplement-profile/slice";
import { LocalizationContext } from "libs/context";
import { store } from "redux/store";
import { setLoading } from "redux/slice/app-slice";

const { width, height } = Dimensions.get("window");

const UploadImageCertificate = (props) => {
  // getKeyPreFixProfile() : check Global to get a KeyPreFix in dev.en
  const keyPreFixProfile = getKeyPreFixProfile();

  const I18n = useContext(LocalizationContext);

  // isFronted : check from props?.route?.params if true is Front Image and the others Behind Image
  const isFronted = props?.route?.params;

  // Hook
  const [progressStatus, setProgressStatus] = useState(null);
  const { environmentKey } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const taskerId = getUserIdGlobal();

  // checkCamera === false get photo from album photo, another get photo by camera
  const [checkCamera, setCheckCamera] = useState(true);

  // Upload from Libs
  const _uploadImage = (image) => {
    if (!taskerId || !image) {
      return;
    }
    const file = {
      uri: "file://" + image.path,
      name: isFronted ? "front_image" : "back_image",
      type: image.mime,
    };

    // Function check Front Side or Back Side

    const checkLink = (link: any) => {
      isFronted
        ? dispatch(setCertificateFrontImage(link))
        : dispatch(setCertificateBackImage(link));
      navigateTo("CertificateConduct");
    };

    // Sever AMAZON save link pic
    const optionsAWS3 = {
      //environmentKey lấy tù store/slice
      keyPrefix: keyPreFixProfile + `/${taskerId}` + "/certificate-of-conduct/",
      bucket: environmentKey?.AWS3?.Bucket,
      region: environmentKey?.AWS3?.Region,
      accessKey: environmentKey?.AWS3?.AccessKey,
      secretKey: environmentKey?.AWS3?.SecretKey,
      successActionStatus: 201,
    };

    // update image to S3
    store.dispatch(setLoading(true))
    RNS3.put(file, optionsAWS3)

      .progress((e) => {
        setProgressStatus(e.percent.toFixed(2) * 100);
      })
      .then(async (response) => {
        store.dispatch(setLoading(false))
        // upload image and send link
        setProgressStatus(null);
        // success
        if (response.status === 201) {
          const link = _.get(response, "body.postResponse.location", null);
          {
            if (link) {
              return checkLink(link);
            }
            return;
          }
        }
        // error
        Alert.alert.open(
          {
            title: "DIALOG_TITLE_INFORMATION",
            message: { text: "SEND_IMAGE_FAIL" },
          },
          true
        );
      });
  };
  const _selectImage = (camera) => {
    const options: any = {
      compressImageMaxWidth: width,
      compressImageMaxHeight: height,
      cropping: false,
      // compressImageQuality: 0.8,
      mediaType: "photo",
    };
    // check camera
    if (camera) {
      return ImagePicker.openCamera(options).then(
        (image) => image && _uploadImage(image)
      );
    }
    // Libs
    return ImagePicker.openPicker(options)
      .then((image) => image && _uploadImage(image))
      .catch((error) => {
        if (isAndroid) {
          Alert.alert.open({
            title: "PERMISSION.ACCESS_PHOTOS_TITLE",
            message: "PERMISSION.ACCESS_PHOTOS_CONTENT",
            actions: [
              {
                text: "DIALOG.BUTTON_ACCEPT",
                onPress: () => {
                  Alert.alert.close();
                },
              },
            ],
          });
        }
      });
  };
  const _handleChoiceImage = () => {
    return Alert.alert.open(
      {
        message: "SUPPLEMENT_INFO.CHOOSE_PHOTO",
        actions: [
          {
            text: "SUPPLEMENT_INFO.OPEN_PHOTO_GALLERY",
            onPress: () => {
              _selectImage(!checkCamera);
              Alert.alert.close();
            },
          },
          {
            text: "SUPPLEMENT_INFO.OPEN_IMAGE_CAMERA",
            onPress: () => {
              _selectImage(checkCamera);
              Alert.alert.close();
            },
          },
        ],
      },
      true
    );
  };

  const boxText = () => {
    return (
      <Box>
        <Box>
          <Text>{I18n.t("SUPPLEMENT_INFO.TEXT_NOTE_IDENTITY_1")}</Text>
        </Box>

        <Box style={styles.boxText2}>
          <Text>{I18n.t("SUPPLEMENT_INFO.TEXT_NOTE_IDENTITY_2")}</Text>
        </Box>
      </Box>
    );
  };
  return (
    <Container>
      <Card>
        {/* Image */}
        <Box center>
          <Image
            source={require("@images/add-profile.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <Box style={styles.boxText}>
            <Text bold>{I18n.t("SUPPLEMENT_INFO.TAKE_A_PHOTO")}</Text>
          </Box>
        </Box>
        {/* Note */}
        <Box>{boxText()}</Box>

        {/* Image */}
        <Box
          center
          style={styles.boxImage}
        >
          {isFronted ? (
            <Image
              source={require("@images/active-account/curriculum-front.png")}
              resizeMode="contain"
              style={styles.imageCurriculum}
            />
          ) : (
            <Image
              source={require("@images/active-account/curriculum-back.png")}
              resizeMode="contain"
              style={styles.imageCurriculum}
            />
          )}
        </Box>

        {/* Open Camera */}
        <Box style={styles.footerBtn}>
          <Button
            color={"secondary"}
            title={I18n.t("SUPPLEMENT_INFO.OPEN_CAMERA")}
            onPress={() => {
              _handleChoiceImage();
            }}
          ></Button>
        </Box>
      </Card>
    </Container>
  );
};

export default UploadImageCertificate;
