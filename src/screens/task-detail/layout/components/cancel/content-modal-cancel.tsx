/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-25 10:42:16
 * @modify date 2022-10-25 10:42:16
 * @desc [Render content modal notes]
 */

import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Icon, PriceItem, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import getCancelPolicy from "apis/tasks/get-cancel-policy";
import {
  handleError,
  IRespond,
  getLocalePaymentMethod,
  formatDate,
} from "libs/helper";
import { setLoading } from "redux/slice/app-slice";
import { WebView } from "react-native-webview";
import styles from "../../styles";
import { store } from "redux/store";

import { Duration } from "components/task-item/components";

function ContentModalCancel({
  dataTask,
  closeModalCancel,
  openModalChooseReason,
}) {
  const [cancelPolicy, setCancelPolicy] = useState("");
  const I18n = React.useContext(LocalizationContext);

  // Get cancel policy
  const initData = async () => {
    // Show loading
    await store.dispatch(setLoading(true));
    // Call api get cancel policy
    const result: IRespond = await getCancelPolicy(dataTask?._id);
    // Hide loading
    await store.dispatch(setLoading(false));
    if (result.isSuccess) {
      return setCancelPolicy(result?.data);
    }
    closeModalCancel();
    return handleError(result?.error);
  };

  useEffect(() => {
    // Init data
    initData();
  }, []);

  // Navigate to choose reason cancel
  const _onChooseReasonCancel = () => {
    // Close modal cancel
    closeModalCancel();
    // Open modal choose reason
    openModalChooseReason();
  };

  // Render cancel policy
  const renderPolicy = useMemo(() => {
    if (cancelPolicy) {
      return (
        <WebView
          source={{
            html: cancelPolicy,
          }}
          contentMode="mobile"
          style={styles.containerCancelPolicy}
        />
      );
    }
  }, [cancelPolicy]);

  /**
   * Hiển thị thông tin cơ bản của task
   */
  const renderDataTask = useMemo(() => {
    const collectMoneyMethod = getLocalePaymentMethod(dataTask?.paymentMethod);
    const taskDate = formatDate(dataTask?.date, "date");

    return (
      <Box style={styles.boxTask}>
        <Text
          bold
          color="primary"
        >
          {I18n.t("TASK_DETAIL.TITLE")}
        </Text>
        <Box style={styles.boxTaskDetail}>
          {/* Giá trị của task và phương thức thanh toán */}
          <Box
            between
            row
            style={styles.boxItemDetailTask}
          >
            <Box
              row
              style={styles.alignItemsCenter}
            >
              <Icon
                name="collectMoney"
                color="primary"
                size="l"
                style={styles.iconTaskCancel}
              />
              <PriceItem
                cost={dataTask?.cost}
                priceStyle={styles.priceCancelStyle}
                currencyStyle={styles.currencyCancelStyle}
              />
            </Box>
            <Box center>
              <Text bold>{I18n.t(collectMoneyMethod)}</Text>
            </Box>
          </Box>

          {/* Ngày giờ làm việc và duration */}
          <Box
            row
            between
            style={styles.boxItemDetailTask}
          >
            <Duration
              showMore={false}
              date={dataTask?.date}
              duration={dataTask?.duration}
            />
            <Box row>
              <Icon
                name="subscription"
                color="primary"
                size="xl"
                style={styles.iconTaskCancel}
              />
              <Text
                bold
                fontSize="xl"
                numberOfLines={1}
              >
                {taskDate}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }, [dataTask]);

  return (
    <Box style={styles.containerModalCancel}>
      {/* Data task */}
      {renderDataTask}

      {/* Rule cancel */}
      {renderPolicy}

      {/* Action */}
      <Box
        center
        style={styles.lineContainer}
      >
        <Text fontWeight="m">{I18n.t("TASK_DETAIL.CONFIRM_CANCEL_TEXT")}</Text>
      </Box>
      <Box
        row
        style={styles.containerBtnCancel}
      >
        <Box style={styles.boxBtnCancel}>
          <Button
            title={I18n.t("TASK_DETAIL.BUTTON_CANCEL")}
            color="white"
            titleStyle={styles.titleStyleBtnCancel}
            buttonStyle={styles.buttonStyleBtnCancel}
            onPress={_onChooseReasonCancel}
            testID="btnConfirmCancel"
          />
        </Box>
        <Box style={styles.boxBtnCancel}>
          <Button
            title={I18n.t("TASK_DETAIL.BUTTON_NO")}
            onPress={closeModalCancel}
            testID="btnBack"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ContentModalCancel;
