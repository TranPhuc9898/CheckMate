/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-25 10:42:16
 * @modify date 2022-10-25 10:42:16
 * @desc [Render content modal notes]
 */

import { useContext, useMemo } from "react";
import { Box, Button, Text, Alert } from "@src/components";
import { colors } from "libs/theme";
import { LocalizationContext } from "libs/context";
import { reasonsCancel } from "libs/config";
import styles from "../../styles";
import moment from "moment";
import { getDistance, getCurrentLocation } from "libs/helper";
import { CANCEL_TASK_REASON_NEARBY_TASK_PLACE } from "libs/constants";

function ContentModalChooseReason({
  openModalConfirmCancelTask,
  closeModalChooseReason,
  setReasonCancel,
  reasonCancel,
  taskDate,
  locationTask,
  collectionDate,
}) {
  const I18n = useContext(LocalizationContext);

  const _handleChooseReasonCancel = async (reason: string) => {
    // Save reason cancel
    setReasonCancel(reason);

    // Close modal choose reason cancel
    closeModalChooseReason();

    if (reason === CANCEL_TASK_REASON_NEARBY_TASK_PLACE) {
      const currentLocation: any = await getCurrentLocation();
      if (!currentLocation) {
        // Can not get distance, show tasker enable GPS and reload app
        return Alert.alert.open({
          message: "TASK_DETAIL.CANCEL_TASK_LOCATION_NOT_FOUND_TEXT",
          actions: [{ text: "DIALOG.BUTTON_CLOSE" }],
        });
      }
      const distance: any = await getDistance(
        locationTask,
        currentLocation?.coords
      );
      if (distance > 500) {
        // Tasker is so far away taskPlace
        return Alert.alert.open({
          message: "TASK_DETAIL.CANCEL_TASK_TASKER_SO_FAR_AWAY_TASK_PLACE",
          actions: [{ text: "DIALOG.BUTTON_CLOSE" }],
        });
      }
    }
    // Open modal confirm cancel task
    openModalConfirmCancelTask();
  };

  const renderListReason = useMemo(() => {
    const reasons = reasonsCancel.filter((item: any) =>
      moment().isBefore(moment(collectionDate ? collectionDate : taskDate))
        ? item.key !== CANCEL_TASK_REASON_NEARBY_TASK_PLACE
        : true
    );
    return reasons.map((item) => (
      <Button
        testID={"reasonCancel" + item.key}
        key={item.key}
        color={"primary"}
        titleStyle={{
          color: colors.white,
        }}
        buttonStyle={styles.buttonStyleBtnChooseReason}
        onPress={() => _handleChooseReasonCancel(item.key)}
      >
        <Text
          center
          color="white"
          bold
        >
          {I18n.t("TASK_DETAIL." + item.text)}
        </Text>
      </Button>
    ));
  }, [reasonCancel]);

  return (
    <Box style={styles.containerContentModalChooseReason}>
      <Text
        center
        fontSize="m"
        style={styles.txtIntroModalChooseReason}
      >
        {I18n.t("TASK_DETAIL.CANCEL_TASK_REASON_TEXT")}
      </Text>
      {renderListReason}
    </Box>
  );
}

export default ContentModalChooseReason;
