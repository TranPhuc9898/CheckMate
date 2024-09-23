import { Text } from "components";
import Box from "components/box";
import Lottie from "components/lottie";
import { LocalizationContext } from "libs/context";
import { checkRouteExist, getTextWithLocale, navigateTo, navigationRef } from "libs/helper";
import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { hideModalAlert } from "redux/slice/app-slice";
import { store } from "redux/store";
import styles from "./styles";

const ModalAlertTask = () => {
  const I18n = useContext(LocalizationContext);
  const { data } = useSelector(
    (state: RootState) => state.app?.modalAlert
  );
  return (
    <Box
      center
      style={styles.container}
    >
      <Box
        center
        style={styles.containerContent}
      >
        <Box style={styles.headerBell}>
          <Lottie
            style={styles.lottieBell}
            source={require("assets/lottie/bell.json")}
            autoPlay={true}
            loop={true}
          />
        </Box>
        <Text
          variant="h4"
          color="primary"
          style={styles.title}
        >
          {I18n.t("NOTIFICATION.TITLE_HAVE_NEW_TASK")}
        </Text>
        <Box
          margin="l"
          center
          style={styles.boxContent}
        >
          <Text center style={styles.txtDistrict}>{data?.district}</Text>
          <Text center variant="h2">{getTextWithLocale(data?.serviceText)}</Text>
        </Box>
        <Box
          row
          between
          style={styles.containerAction}
        >
          <Box flex>
            <TouchableOpacity
              style={styles.leftButton}
              onPress={() => store.dispatch(hideModalAlert())}
            >
              <Text
                center
                bold
                color="secondary"
              >
                {I18n.t("DIALOG.BUTTON_CLOSE")}
              </Text>
            </TouchableOpacity>
          </Box>
          <Box flex>
            <TouchableOpacity
              style={styles.rightButton}
              onPress={() => {
                // Check exist route
                if (checkRouteExist("TaskDetail") && navigationRef.current?.canGoBack()) {
                  navigationRef.current?.goBack();
                }
                // Navigate to TaskDetail
                navigateTo("TaskDetail", { taskId: data?.taskId });
                // Hide modal
                store.dispatch(hideModalAlert());
              }}
            >
              <Text
                bold
                center
                color="white"
              >
                {I18n.t("DIALOG.BUTTON_SEE")}
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default ModalAlertTask;
