import React, { useContext, useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import "react-native-get-random-values";
// Component

import { LocalizationContext } from "@src/libs/context";
import { isAndroid } from "@src/libs/helper";
import { Alert, Icon } from "components";
// Lib
import { randomCode } from "libs/helper";
import { colors } from "libs/theme";
import _ from "lodash";
import moment from "moment";
import { RNS3 } from "react-native-aws3";
import ImagePicker from "react-native-image-crop-picker";
// import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { v4 as uuidv4 } from "uuid";

interface ISendImage {
  isUsedCamera?: boolean;
  onSendGiftChat?: any;
  user?: any;
  onSendWithAPI?: any;
  config?: any;
}

const { width, height } = Dimensions.get("window");

const SendImage: React.FC<ISendImage> = ({
  isUsedCamera,
  onSendWithAPI,
  user,
  config,
}) => {
  const { environmentKey } = useSelector((state: RootState) => state.app);

  const I18n = useContext(LocalizationContext);
  const [progressStatus, setProgressStatus] = useState(null);

  const _onSend = (link: any, isSendWithSocket = false) => {
    const objMessage = {
      _id: uuidv4(),
      image: link,

      createdAt: moment().toDate(),
      user: {
        _id: user,
      },
    };
    if (isSendWithSocket) {
      return onSendWithAPI( objMessage);
    }
  };

  const _uploadImage = (image) => {
    if (!user || !image) {
      return;
    }

    const randomCodeName = randomCode("character", 5);
    const file = {
      uri: "file://" + image.path,
      name: "tasker-chat-" + user + "-" + randomCodeName,
      type: image.mime,
    };

    // Sever AMAZON save link pic
    const optionsAWS3 = {
      //environmentKey lấy tù store/slice
      keyPrefix: environmentKey?.AWS3?.KeyPrefix,
      bucket: environmentKey?.AWS3?.Bucket,
      region: environmentKey?.AWS3?.Region,
      accessKey: environmentKey?.AWS3?.AccessKey,
      secretKey: environmentKey?.AWS3?.SecretKey,
      successActionStatus: 201,
    };

    // send message to gift chat only
    _onSend(file.uri);

    // update image to S3

    RNS3.put(file, optionsAWS3)

      .progress((e) => {
        setProgressStatus(e.percent.toFixed(2) * 100);
      })
      .then(async (response) => {
        // upload image and send link
        setProgressStatus(null);
        // success
        if (response.status === 201) {
          const link = _.get(response, "body.postResponse.location", null);

          return _onSend(link, true);
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

  const _selectImage = () => {
    const options: any = {
      compressImageMaxWidth: width,
      compressImageMaxHeight: height,
      cropping: true,
      compressImageQuality: 0.8,
      mediaType: "photo",
    };
    // camera
    if (isUsedCamera) {
      return ImagePicker.openCamera(options).then(
        (image) => image && _uploadImage(image)
      );
    }
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

  return (
    <TouchableOpacity
      onPress={() => {
        _selectImage();
      }}
      style={{
        justifyContent: "center",
        paddingLeft: 5,
        paddingRight: 10,
        paddingTop: 5,
      }}
    >
      <Icon
        name={isUsedCamera ? "camera" : "image"}
        color="primary"
        size="xxl"
      />
    </TouchableOpacity>
  );
};

export default SendImage;
