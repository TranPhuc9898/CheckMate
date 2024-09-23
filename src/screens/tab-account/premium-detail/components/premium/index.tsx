import React, { FunctionComponent, ComponentProps, useContext } from "react";
import _ from "lodash";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Box, Text } from "@src/components";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import RNFS from "react-native-fs";
import styles from "./styles";

interface IWithdraw extends ComponentProps<typeof View> {
  setLoading?: (isloading: boolean) => void;
  navigation?: any;
  user: {
    name: string;
  };
}

const WithdrawScreen: FunctionComponent<IWithdraw> = ({ user }) => {
  const I18n = useContext(LocalizationContext);

  const viewShotRef: any = React.useRef();

  const captureAndShareScreenshot = () => {
    viewShotRef?.current.capture().then((uri) => {
      RNFS.readFile(uri, "base64").then((res) => {
        let urlString = "data:image/png;base64," + res;
        let options = {
          title: I18n.t("TRAINING_PREMIUM.TASKER_PREMIUM_TITLE"),
          message: I18n.t("TRAINING_PREMIUM.TASKER_PREMIUM_SUB_TITLE"),
          url: urlString,
          type: "image/png",
        };
        Share.open(options)
          .then((res) => {})
          .catch((err) => {});
      });
    });
  };

  return (
    <Box style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollStyle}
        contentContainerStyle={{ paddingBottom: "30%" }}
      >
        <ViewShot
          style={{}}
          ref={viewShotRef}
          options={{ format: "png" }}
        >
          <ImageBackground
            resizeMode={"contain"}
            source={require("@images/premium/background-premium.png")}
            style={styles.backgroundStyle}
          >
            <Text style={styles.txtTaskerName}>{user?.name}</Text>
          </ImageBackground>
        </ViewShot>

        <Box style={styles.boxFooter}>
          <TouchableOpacity
            style={styles.btnTouchable}
            onPress={() => captureAndShareScreenshot()}
          >
            <Text style={styles.txtShare}>
              {I18n.t("TRAINING_PREMIUM.SHARE")}
            </Text>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default WithdrawScreen;
