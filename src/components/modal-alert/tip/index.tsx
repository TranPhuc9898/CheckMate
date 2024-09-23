import isReadNotification from "apis/notification/read-notification";
import { Button, Divider, Image, PriceItem, Text } from "components";
import Box from "components/box";
import Lottie from "components/lottie";
import { LocalizationContext } from "libs/context";
import { colors } from "libs/theme";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { hideModalAlert } from "redux/slice/app-slice";
import { store } from "redux/store";
import styles from "./styles";
import Sound from "react-native-sound";

const ModalAlertTip = () => {
  const I18n = useContext(LocalizationContext);
  const { data } = useSelector((state: RootState) => state.app?.modalAlert);

  useEffect(() => {
    var sound = new Sound("tip.mp3", Sound.MAIN_BUNDLE, (error) => {
      // Play the sound with an onEnd callback
      sound.play();
    });
    // Reduce the volume by half
    sound.setVolume(0.5);
    return () => {
      sound.stop();
    };
  }, []);

  return (
    <Box
      center
      style={styles.container}
    >
      <Box style={styles.containerContent}>
        <Box center>
          <Box style={styles.headerBell}>
            <Lottie
              style={styles.lottieBell}
              source={require("assets/lottie/bell.json")}
              autoPlay={true}
              loop={true}
            />
          </Box>
        </Box>
        <Text
          center
          variant="h2"
          color="primary"
          style={styles.title}
        >
          {I18n.t("MODAL_ALERT.TITLE_MODAL_TIP")}
        </Text>
        <Box
          center
          margin="m"
        >
          <Lottie
            style={styles.iconTip}
            source={require("assets/lottie/tip.json")}
            autoPlay={true}
          />
        </Box>
        <Text
          center
          style={styles.txtContent}
        >
          {I18n.t("MODAL_ALERT.LABEL_MODAL_TIP")}
        </Text>
        <Box
          row
          center
        >
          <PriceItem
            cost={data?.number}
            currency={data?.currency}
            priceStyle={styles.priceStyle}
            currencyStyle={styles.currencyStyle}
          />
        </Box>
        <Divider
          color={colors.grey0}
          style={styles.dividerStyle}
        />
        <Text
          center
          fontSize="m"
        >
          {I18n.t("MODAL_ALERT.TEXT_MODAL_TIP")}
        </Text>
        <Button
          onPress={async () => {
            await isReadNotification(data.notifyId);
            store.dispatch(hideModalAlert());
          }}
          buttonStyle={styles.btnStyles}
          title={I18n.t("DIALOG.BUTTON_CLOSE")}
        />
      </Box>
    </Box>
  );
};
export default ModalAlertTip;
