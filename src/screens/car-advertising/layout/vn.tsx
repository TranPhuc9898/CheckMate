import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Share from "react-native-share";
import _ from "lodash";

import getCarAdvertisingInfoAPI from "apis/car-advertising/get-tasker-car-advertising-info";
import { Box, Card, Icon, Text } from "components";
import { useAppSelector } from "hooks/redux-store";
import { useI18n } from "hooks/translation";
import { formatMoney, getCountry, getLocaleGlobal, getShortLinkFirebase, IRespond, isAndroid } from "libs/helper";
import { spacing } from "libs/theme";
import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";

import styles from "./styles";

interface ICarAdvertising {
  FMainaccount: number;
  TotalTaskDoneReferralCode: number;
  TotalUserAddReferral: number;
}

const CarAdvertisingScreen = () => {
  const { user, settingSystem } = useAppSelector((state) => state.app);
  const { t } = useI18n();
  const [carAdvertisingInfo, setCarAdvertisingInfo] = useState<ICarAdvertising>();

  // Init data
  const _initInfoCarAdvertising = async () => {
    // Show loading
    await store.dispatch(setLoading(true));
    // Get financial
    const respond: IRespond = await getCarAdvertisingInfoAPI();
    // Hide loading
    await store.dispatch(setLoading(false));

    if (respond.isSuccess) {
      setCarAdvertisingInfo(respond?.data);
    }
  };

  useEffect(() => {
    // Init data car advertising
    _initInfoCarAdvertising();
  }, []);

  // Handle share
  const _onShareReferralCode = async () => {
    // Show loading
    await store.dispatch(setLoading(true));
    try {
      const referralCode = user?.referralCode;

      const params = `referralCode=${referralCode}`;
      const url = await getShortLinkFirebase({
        language: getLocaleGlobal(),
        deeplinkSetting: settingSystem?.inviteDeeplink,
        params: params,
      });
      if (!url) {
        return;
      }

      const country = getCountry();
      const inviteeValue = _.get(settingSystem, "referralSetting.tasker.inviteeValue", 0);
      const voucherValue = _.get(settingSystem, "referralSetting.voucher.value", 0);
      const referralValue = t("COST_AND_CURRENCY", {
        cost: formatMoney(inviteeValue),
        currency: country?.currency,
      });
      const txtVoucher = t("COST_AND_CURRENCY", { cost: formatMoney(voucherValue), currency: country?.currency });
      // const message = t('INVITE_ASKER_TEXT_HEAD') + ' ' + referralCode + ' ' + t('INVITE_ASKER_TEXT_TAIL', { t: cost });
      // referralSetting
      const message = t("INVITE_ADVERTISING_SHARE_TEXT", {
        referralCode: referralCode,
        referralValue: referralValue,
        voucherValue: txtVoucher,
      });

      const shareOptions = {
        title: t("CAR_ADVERTISING.INVITE_ASKER_TEXT_HEAD"),
        message: message + "\n" + url,
        subject: t("CAR_ADVERTISING.INVITE_ASKER_TEXT_HEAD"), //  for email
      };
      //Android required url
      if (isAndroid) {
        shareOptions.url = url;
        shareOptions.message = message;
      }
      // Hide loading
      await store.dispatch(setLoading(false));
      // share start
      Share.open(shareOptions)
        .then((res) => {
          // console.log(res)
        })
        .catch((err) => {
          // err && console.log(err);
        });
    } catch (error) {
      // Hide loading
      await store.dispatch(setLoading(false));
    }
  };
  return (
    <Box flex>
      <Card>
        <Box center>
          {/* Referral code */}
          <Text
            center
            fontWeight="xl"
            testID="titleReferralCode"
          >
            {t("CAR_ADVERTISING.YOUR_REFERRAL_CODE")}
          </Text>
          <Box
            center
            style={styles.referralCode}
          >
            <Text
              color="primary"
              variant="h3"
              testID="referralCode"
            >
              {user?.referralCode}
            </Text>
          </Box>
          {/* End referral code */}

          {/* Share referral code */}
          <TouchableOpacity
            onPress={_onShareReferralCode}
            testID="btnShareReferral"
          >
            <Box
              row
              style={styles.btnShareReferralCode}
            >
              <Icon name={"share"} />
              <Text
                style={{
                  marginLeft: spacing.m,
                }}
                color="white"
              >
                {t("CAR_ADVERTISING.BUTTON_SHARE_REFERRAL_CODE")}
              </Text>
            </Box>
          </TouchableOpacity>
          {/* End share referral code */}
        </Box>
      </Card>
      <Card>
        <Box
          row
          between
        >
          <Text>{t("CAR_ADVERTISING.NUMBER_PEOPLE_REGISTER_WITH_REFERRAL")}</Text>
          <Text
            color="primary"
            bold
            testID="txtNumberCustomerEnteredCode"
          >
            {carAdvertisingInfo?.TotalUserAddReferral}
          </Text>
        </Box>
        <Box
          row
          between
          style={styles.wrapTotalUser}
        >
          <Text>{t("CAR_ADVERTISING.NUMBER_PEOPLE_DONE_TASK")}</Text>
          <Text
            color="primary"
            bold
            testID="txtNumberCustomerDoneTask"
          >
            {carAdvertisingInfo?.TotalTaskDoneReferralCode}
          </Text>
        </Box>
      </Card>
    </Box>
  );
};
export default CarAdvertisingScreen;
