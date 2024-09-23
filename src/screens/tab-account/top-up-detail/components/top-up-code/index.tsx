import _ from "lodash";
import React, {
  FunctionComponent,
  ComponentProps,
  useContext,
} from "react";
import { TouchableOpacity, View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import StepIndicator from "react-native-step-indicator";
import Accordion from "react-native-collapsible/Accordion";
import {
  Card,
  Box,
  Text,
  PriceItem,
  Icon,
  Image,
  Alert,
} from "@src/components";
import {
  getCurrency,
  isAndroid,
  requestStoragePermission,
} from "libs/helper";
import styles from "./styles";

import ReactNativeBlobUtil from "react-native-blob-util";

import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Toast from "react-native-simple-toast";
import { colors } from "libs/theme";

interface IMainFinance extends ComponentProps<typeof View> {
  navigation?: any;
  route?: any;
  setLoading?: (isloading: boolean) => void;
}

const MainFinanceScreen: FunctionComponent<IMainFinance> = ({ route }) => {
  const I18n = useContext(LocalizationContext);
  const [activeSection, setActiveSection] = React.useState([0]);

  const labels = [
    I18n.t("TOPUP.STEP_1"),
    I18n.t("TOPUP.STEP_2"),
    I18n.t("TOPUP.STEP_3"),
  ];

  const CONTENT = [
    {
      title: I18n.t("TOPUP.QR_NOTE"),
    },
  ];

  const QRCodeUrl = _.get(route, "params.QRCodeUrl", "");
  const amount = _.get(route, "params.amount", 0);

  const currency = getCurrency();

  const handleDownload = async () => {
    // No image link, do nothing
    if (!QRCodeUrl) {
      return null;
    }

    // if device is android you have to ensure you have permission
    if (isAndroid) {
      const granted = await requestStoragePermission(I18n);
      if (!granted) {
        return Alert.alert.open({
          title: "PERMISSION.WRITE_EXTERNAL_STORAGE_TITLE",
          message: "PERMISSION.WRITE_EXTERNAL_STORAGE_CONTENT",
        });
      }
    }

    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: "png",
    })
      .fetch("GET", QRCodeUrl)
      .then((res) => {
        CameraRoll.save(res.data, { type: "photo" })
          .then(() => {
            // Alert save image success
            Toast.showWithGravity(
              I18n.t("TOPUP.SAVE_IMAGE_SUCCESS"),
              Toast.SHORT,
              Toast.BOTTOM
            );
          })
          .catch((err) => {
            // Save image error
            Toast.showWithGravity(err, Toast.SHORT, Toast.BOTTOM);
          })
          .finally(() => {});
      })
      .catch((error) => {
        // Save image error
        Toast.showWithGravity(error, Toast.SHORT, Toast.BOTTOM);
      });
  };

  const _renderHeader = (section, i, isActive) => {
    return (
      <Box style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
        <Icon
          color="grey2"
          name={isActive ? "icDown" : "icUp"}
          size="m"
        />
      </Box>
    );
  };

  const _renderContent = () => {
    return (
      <StepIndicator
        customStyles={{
          labelAlign: "flex-start",
          stepIndicatorCurrentColor: colors.primary,
          stepIndicatorUnFinishedColor: colors.primary,
          stepStrokeCurrentColor: colors.primary,
          separatorUnFinishedColor: colors.primary,
          currentStepStrokeWidth: 0,
          currentStepIndicatorSize: 30,
          stepIndicatorLabelCurrentColor: colors.white,
          stepIndicatorLabelUnFinishedColor: colors.white,
        }}
        labels={labels}
        direction="vertical"
        stepCount={3}
        renderLabel={({ label }) => {
          return (
            <Box
              flex
              style={styles.boxText}
            >
              <Text>{label}</Text>
            </Box>
          );
        }}
      />
    );
  };

  return (
    <Box>
      <Card>
        <Box
          center
          style={styles.boxContainer}
        >
          <Text
            bold
            color="primary"
            fontSize="xl"
          >
            {I18n.t("TAB_ACCOUNT.AMOUNT")}
          </Text>
          <Box
            row
            center
            style={styles.boxMainAccount}
          >
            <PriceItem
              cost={amount}
              priceStyle={styles.mainAccountStyle}
            />
          </Box>
          <Box style={styles.boxQRCode}>
            <Image
              source={{
                uri: QRCodeUrl,
              }}
              style={styles.QRCode}
            />
          </Box>
          <Text style={styles.txtBtaskeeCompany}>
            {I18n.t("TOPUP.BTASKEE_THAILAND")}
          </Text>
          {QRCodeUrl ? (
            <TouchableOpacity onPress={() => handleDownload()}>
              <Box center>
                <Icon
                  name="saveImage"
                  color="primary"
                  size="xxxl"
                />
                <Text style={styles.txtSave}>{I18n.t("TOPUP.SAVE_IMAGE")}</Text>
              </Box>
            </TouchableOpacity>
          ) : null}
        </Box>
        <Box style={styles.containerHeader}>
          <Accordion
            activeSections={activeSection}
            sections={CONTENT}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            duration={400}
            onChange={(active) => setActiveSection(active)}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default MainFinanceScreen;
