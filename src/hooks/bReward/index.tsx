import React, { useEffect } from "react";
import { Alert, Box, Divider, LottieView, Text } from "@src/components";
import styles from "./styles";
import {
  formatMoney,
  IRespond,
  handleError,
  checkRouteExist,
} from "libs/helper";
import _ from "lodash";
import redeemGiftAPI from "apis/benefit/redeem-gift";
import { store } from "redux/store";
import { getUserInfo, setLoading } from "redux/slice/app-slice";
import { colors } from "libs/theme";
import { useI18n } from "hooks/translation";
import { useNavigation } from "@react-navigation/native";

// Flag đang đổi quà
let redeeming = false;
let timeout = null;

/**
 * Hook để đổi quà cho bReward
 * method:
 *
 * redeemGift
 *
 * params: giftId, point
 * @returns
 */
export function bReward() {
  const { t } = useI18n();
  const navigation = useNavigation();

  useEffect(() => {
    redeeming = false;
    return () => {
      redeeming = false;
      timeout && clearTimeout(timeout);
    };
  }, []);

  const onRedeemGift = async (giftId) => {
    // Đang trong quá trình redeem trước
    if (redeeming) {
      return;
    }
    // Bật Flag redeem chống spam API
    redeeming = true;
    // Show loading
    await store.dispatch(setLoading(true));
    // Call api get task detail, make sure modal close
    timeout = setTimeout(async () => {
      const result: IRespond = await redeemGiftAPI(giftId);
      await store.dispatch(setLoading(false));
      // Tắt Flag redeem chống spam API
      redeeming = false;
      if (result.isSuccess) {
        Alert.alert.open({
          message: (
            <Box center>
              <LottieView
                source={require("assets/lottie/gift.json")}
                style={styles.lottieTick}
              />
              <Text
                testID="txtRedeemSuccess"
                color="primary"
                variant="h3"
                style={styles.txtTitle}
              >
                {t("TAB_BENEFIT.REDEEM_SUCCESS")}
              </Text>
            </Box>
          ),
          onClosed: async () => {
            // Kiểm tra xem trang hiện tại có phải ở detail hay không, nếu ở detail thì back về
            if (checkRouteExist("BRewardDetail")) {
              navigation.goBack();
            }
            navigation.navigate("MyGift");
          },
        });
        // Chắc chắn point cửa user được cập nhật lại
        store.dispatch(getUserInfo());
        return;
      }
      return handleError(result?.error);
    }, 500);
  };

  const redeemGift = (giftId: string, point: Number = 0) => {
    // Hỏi confirmed
    Alert.alert.open({
      title: "TAB_BENEFIT.TITLE_ALERT_CONFIRM_REDEEM",
      message: (
        <Box>
          <Box center>
            <Text>{t("TAB_BENEFIT.CONTEXT_ALERT_CONFIRM_REDEEM")}</Text>
          </Box>
          <Box style={styles.boxDivider}>
            <Divider
              style={styles.sizeDivider}
              width={1}
              color={colors.secondary}
            />
          </Box>
          <Box
            row
            center
          >
            <Text
              variant="h1"
              color="secondary"
            >
              {formatMoney(point)}
            </Text>
            <Box
              center
              style={styles.boxPoint}
            >
              <Text
                color="grey1"
                fontSize="m"
              >
                {t("TAB_BENEFIT.NUMBER_POINT")}
              </Text>
            </Box>
          </Box>
        </Box>
      ),
      actions: [
        {
          testID: "btnConfirmRedeem",
          text: "BREWARD.BUTTON_AGREE",
          disabled: true,
          onPress: async () => {
            Alert.alert?.close();
            onRedeemGift(giftId);
          },
        },
        {
          text: "BREWARD.BUTTON_LATER",
          style: "cancel",
        },
      ],
    });
  };

  return { redeemGift };
}
