import { Box, Card, Icon, Text } from "components";
import { LocalizationContext } from "libs/context";
import { borderRadius, spacing } from "libs/theme";
import { useContext, useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";
import styles from "./styles";
import getFinancialTransactionsAPI from "apis/car-advertising/get-tasker-financial-transaction-car-advertising";
import getCarAdvertisingInfoAPI from "apis/car-advertising/get-tasker-car-advertising-info";
import {
  formatDate,
  formatMoney,
  getCountry,
  getLocaleGlobal,
  getShortLinkFirebase,
  IRespond,
  isAndroid,
} from "libs/helper";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import _ from "lodash";
import Share from "react-native-share";

interface ICarAdvertising {
  FMainaccount: number;
  TotalUserAddReferral: number;
}

const CarAdvertisingScreen = () => {
  const { user, settingSystem } = useSelector((state: RootState) => state.app);
  const I18n = useContext(LocalizationContext);
  const [carAdvertisingInfo, setCarAdvertisingInfo] =
    useState<ICarAdvertising>();
  const [financialTransaction, setFinancialTransaction] = useState([]);

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

  // Init data
  const _initFinancialTransaction = async () => {
    // Show loading
    await store.dispatch(setLoading(true));
    // Get financial
    const respond: IRespond = await getFinancialTransactionsAPI();
    // Hide loading
    await store.dispatch(setLoading(false));

    if (respond.isSuccess) {
      setFinancialTransaction(respond?.data);
    }
  };
  useEffect(() => {
    // Init data car advertising
    _initInfoCarAdvertising();
    // Init data financial transaction
    _initFinancialTransaction();
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
        return null;
      }

      const country = getCountry();
      const inviteeValue = _.get(
        settingSystem,
        "referralSetting.tasker.inviteeValue",
        0
      );
      const voucherValue = _.get(
        settingSystem,
        "referralSetting.voucher.value",
        0
      );
      const referralValue = I18n.t("COST_AND_CURRENCY", {
        cost: formatMoney(inviteeValue),
        currency: country?.currency,
      });
      const txtVoucher = I18n.t("COST_AND_CURRENCY", {
        cost: formatMoney(voucherValue),
        currency: country?.currency,
      });
      // const message = I18n.t('INVITE_ASKER_TEXT_HEAD') + ' ' + referralCode + ' ' + I18n.t('INVITE_ASKER_TEXT_TAIL', { t: cost });
      // referralSetting
      const message = I18n.t("CAR_ADVERTISING.INVITE_ADVERTISING_SHARE_TEXT", {
        referralCode: referralCode,
        referralValue: referralValue,
        voucherValue: txtVoucher,
      });

      const shareOptions = {
        title: I18n.t("CAR_ADVERTISING.INVITE_ASKER_TEXT_HEAD"),
        message: message + "\n" + url,
        subject: I18n.t("CAR_ADVERTISING.INVITE_ASKER_TEXT_HEAD"), //  for email
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

  // render item transaction
  const _renderItemTransaction = ({ item, index }) => {
    const txtFriendPhone = `${item?.friendPhone.substring(0, 7)}xxx`;
    const borderTopRadius =
      index === 0
        ? {
            borderTopLeftRadius: borderRadius.s,
            borderTopRightRadius: borderRadius.s,
            paddingTop: spacing.l,
          }
        : {};
    const borderBottomRadius =
      index === financialTransaction?.length - 1
        ? {
            borderBottomLeftRadius: borderRadius.s,
            borderBottomRightRadius: borderRadius.s,
            paddingBottom: spacing.l,
            marginBottom: spacing.l,
          }
        : {};
    return (
      <Box
        row
        alignCenter
        style={[
          styles.between,
          styles.lineStyle,
          borderTopRadius,
          borderBottomRadius,
        ]}
      >
        <Box>
          <Text bold>{txtFriendPhone}</Text>
          <Text>{formatDate(item?.date, "other")}</Text>
        </Box>
        <Text
          variant="h4"
          color="primary"
        >
          +{item?.amount}
        </Text>
      </Box>
    );
  };

  const _headerFlatList = () => (
    <Box>
      <Card>
        <Box center>
          {/* Referral code */}
          <Text
            center
            fontWeight="xl"
            testID="titleReferralCode"
          >
            {I18n.t("CAR_ADVERTISING.YOUR_REFERRAL_CODE")}
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
                {I18n.t("CAR_ADVERTISING.BUTTON_SHARE_REFERRAL_CODE")}
              </Text>
            </Box>
          </TouchableOpacity>
          {/* End share referral code */}
        </Box>
      </Card>
      {/* Tổng khách hàng nhập mã */}
      <Card>
        <Box
          row
          style={styles.between}
        >
          <Text>
            {I18n.t("CAR_ADVERTISING.NUMBER_PEOPLE_REGISTER_WITH_REFERRAL")}
          </Text>
          <Text
            color="primary"
            bold
            testID="txtNumberCustomerEnteredCode"
          >
            {carAdvertisingInfo?.TotalUserAddReferral}
          </Text>
        </Box>
      </Card>
      {!_.isEmpty(financialTransaction) && (
        <Box
          row
          style={styles.containerTitle}
        >
          <Icon name="transaction" />
          <Text
            color="white"
            bold
          >
            {I18n.t("CAR_ADVERTISING.TITLE_HISTORY_TRANSACTION")}
          </Text>
          <Icon name="down" />
        </Box>
      )}
    </Box>
  );

  return (
    <Box flex>
      <FlatList
        ListHeaderComponent={_headerFlatList}
        data={financialTransaction}
        renderItem={_renderItemTransaction}
        keyExtractor={(item, index) => "financialTransaction" + index}
      />
    </Box>
  );
};

export default CarAdvertisingScreen;
