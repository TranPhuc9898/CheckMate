/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-25 10:42:16
 * @modify date 2022-10-25 10:42:16
 * @desc [Render content modal notes]
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Box, Button, Icon, Text, TextInput } from "@src/components";
import { colors, spacing } from "libs/theme";
import { LocalizationContext } from "libs/context";
import HeaderTaskDetail from "components/task-item";
import { reasonsCancel } from "libs/config";
import { CANCEL_TASK_OTHER_REASON } from "libs/constants";
import getCancelFeeAPI, { IParamCancelFee } from "apis/tasks/get-cancel-fee";
import { getUserIdGlobal, handleError, IRespond } from "libs/helper";
import { setLoading } from "redux/slice/app-slice";
import PriceItem from "components/price";
import cancelTaskAPI, { IParamCancelTask } from "apis/tasks/cancel-task";
import styles from "../../styles";

const SIZE_ICON = 48;
import { Dimensions } from "react-native";
import { store } from "redux/store";

function ContentModalConfirmCancelTask({
  dataTask,
  closeModalConfirmCancelTask,
  reasonCancel,
  navigation,
}) {
  const [cancelFee, setCancelFee] = useState({
    currency: {
      code: "",
      sign: "",
    },
    fee: 0,
  });
  const [otherReasonTxt, setOtherReasonTxt] = useState("");
  const refInput = useRef(null);
  const I18n = React.useContext(LocalizationContext);

  // Get cancel fee
  const getCancelFee = async () => {
    // Check if reason is other return
    if (reasonCancel === CANCEL_TASK_OTHER_REASON) {
      return;
    }
    const params: IParamCancelFee = {
      taskId: dataTask._id,
      userId: getUserIdGlobal(),
      reason: reasonCancel,
    };
    // Hide loading
    await store.dispatch(setLoading(true));
    // Call api get task detail
    const result: IRespond = await getCancelFeeAPI(params);
    // Hide loading
    await store.dispatch(setLoading(false));
    if (result?.isSuccess) {
      // Save data to state
      return setCancelFee(result?.data);
    }
    closeModalConfirmCancelTask();
    return handleError(result?.error);
  };

  useEffect(() => {
    // Auto focus if reason is other
    if (reasonCancel === CANCEL_TASK_OTHER_REASON) {
      refInput.current?.focus();
    }
    // Init cancel fee
    getCancelFee();
  }, []);

  const _showReasonCancel = () => {
    const reason = reasonsCancel.find((reason) => reason.key === reasonCancel);
    return reason.text;
  };

  const renderCancelFee = useMemo(() => {
    if (cancelFee?.fee) {
      return (
        <Box center>
          <Text
            fontWeight="m"
            testID="textCancelFree"
          >
            {I18n.t("TASK_DETAIL.CANCEL_FREE")}
          </Text>
          {/* Price */}
          <PriceItem
            testID="cancelFee"
            cost={cancelFee?.fee}
            priceStyle={styles.cancelFeeTxtStyle}
            currencyStyle={styles.cancelFeeTxtStyle}
          />
        </Box>
      );
    }
  }, [cancelFee]);

  // Func handle cancel task
  const _handleCancelTask = async () => {
    // Check other reason empty
    if (reasonCancel === CANCEL_TASK_OTHER_REASON && !otherReasonTxt.trim()) {
      return;
    }
    const params: IParamCancelTask = {
      taskId: dataTask._id,
      userId: getUserIdGlobal(),
      reason: reasonCancel,
      otherReason:
        reasonCancel === CANCEL_TASK_OTHER_REASON ? otherReasonTxt : "",
    };
    // Hide loading
    await store.dispatch(setLoading(true));
    // Call api get task detail
    const result: IRespond = await cancelTaskAPI(params);
    // Hide loading
    await store.dispatch(setLoading(false));
    // Close modal confirm cancel
    closeModalConfirmCancelTask();
    if (!result?.isSuccess) {
      return handleError(result?.error, () => {
        navigation.goBack();
      });
    }

    // Save data to state
    return Alert.alert.open({
      title: "DIALOG.TITLE_INFORMATION",
      message: (
        <Box
          testID="cancelSuccess"
          center
        >
          <Icon
            name="success"
            color="primary"
            height={SIZE_ICON}
            width={SIZE_ICON}
          />
          <Text
            center
            fontSize="xl"
            color="primary"
            style={styles.txtCancelTaskSuccess}
            testID="cancelTaskSuccess"
          >
            {I18n.t("DIALOG.CANCEL_TASK_SUCCESS")}
          </Text>
        </Box>
      ),
      actions: [
        {
          text: "DIALOG.BUTTON_CLOSE",
          onPress: navigation.popToTop(),
          type: "close",
        },
      ],
    });
  };

  const _renderContent = useMemo(() => {
    if (reasonCancel === CANCEL_TASK_OTHER_REASON) {
      return (
        <>
          <Button
            color={"primary"}
            disabled
            disabledStyle={{
              backgroundColor: colors.primary,
            }}
          >
            <Text
              center
              color="white"
              bold
            >
              {I18n.t("TASK_DETAIL.CANCEL_TASK_OTHER_REASON")}
            </Text>
          </Button>
          <TextInput
            testID="textInputOtherReason"
            forwardedRef={refInput}
            value={otherReasonTxt}
            onChangeText={setOtherReasonTxt}
            inputContainerStyle={styles.inputOtherReasonCancel}
            placeholder={I18n.t("TASK_DETAIL.PLACEHOLDER_TEXT_INPUT")}
            validType={"require"}
            multiline
            inputStyle={{
              height: Dimensions.get("window").width / 3,
            }}
            textAlignVertical={"top"}
          />
        </>
      );
    }
    return (
      <>
        <Text
          fontSize="m"
          color="secondary"
        >
          {I18n.t("TASK_DETAIL.NOTE_CANCEL_TASK")}
        </Text>
        {/* Task item */}
        <Box style={styles.containerTaskItemCancel}>
          <HeaderTaskDetail
            item={dataTask}
            disabled={true}
            disabledCard={true}
          />
        </Box>

        <Box
          center
          margin="l"
        >
          <Text
            fontWeight="m"
            testID="txtReasonCancelIs"
          >
            {I18n.t("TASK_DETAIL.CANCEL_REASON_IS")}
          </Text>
          <Text
            bold
            color="primary"
            style={styles.cancelReasonTxt}
          >
            {I18n.t("TASK_DETAIL." + _showReasonCancel())}
          </Text>

          {renderCancelFee}
        </Box>
      </>
    );
  }, [reasonCancel, cancelFee, otherReasonTxt]);

  return (
    <Box style={{ padding: spacing.m }}>
      {_renderContent}
      <Box
        row
        style={[styles.containerBtnCancel, { paddingBottom: spacing.m }]}
      >
        <Box style={styles.boxBtnCancel}>
          <Button
            title={I18n.t("TASK_DETAIL.BUTTON_CANCEL")}
            color="white"
            titleStyle={styles.titleStyleBtnCancel}
            buttonStyle={styles.buttonStyleBtnCancel}
            onPress={_handleCancelTask}
            testID="btnCancelTask"
          />
        </Box>
        <Box style={styles.boxBtnCancel}>
          <Button
            title={I18n.t("TASK_DETAIL.BUTTON_NO")}
            onPress={closeModalConfirmCancelTask}
            testID="btnBack"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ContentModalConfirmCancelTask;
