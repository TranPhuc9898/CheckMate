import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Icon,
  Text,
  Image,
  Divider,
} from "components";
import { LocalizationContext } from "libs/context";
import { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import Clipboard from "@react-native-community/clipboard";
import Toast from "react-native-simple-toast";
import { store } from "redux/store";
import { setLoading } from "redux/slice/app-slice";
import getReferralPolicyAPI from "apis/user/get-referral-policy";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import StepIndicator from "react-native-step-indicator";
import {
  createShortDynamicLink,
  formatDate,
  formatMoney,
  getAvatar,
  getShortLinkFirebase,
  getTextWithLocale,
  IRespond,
  isAndroid,
  isIOS,
} from "libs/helper";

import { TASKER, ASKER } from "@src/libs/constants/index";

import { trackingClickShareReferral } from "@src/libs/tracking/track-clever-tap";
import { colors, spacing } from "libs/theme";
import Share from "react-native-share";

import _ from "lodash";

const ShareScreen = () => {
  const { referralCode, phone } = store.getState().app?.user;
  const insets = useSafeAreaInsets(); // for Iphone X
  const I18n = useContext(LocalizationContext);

  const [dataResult, setDataReSult] = useState<any>();
  const [numberOfItemsToShow, setNumberOfItemsToShow] = useState(5);

  const showMoreItems = (data: any) => {
    setNumberOfItemsToShow(data.length);
  };

  const currencyReferral = _.get(
    dataResult,
    "data.referralValue.currency",
    null
  );
  const noteReferral = _.get(dataResult, "data.referralValue.note", null);
  const titleInvite = _.get(dataResult, "data.invitee.title", null);
  const titleCondition = _.get(dataResult, "data.condition.title", null);
  const titleBenefit = _.get(dataResult, "data.benefit.title", null);

  const trackingButtonClick = (shareWith: any) => {
    const params = {
      referralCode,
      phone,
      shareWith,
    };
    trackingClickShareReferral(params);
  };

  const showToast = () => {
    Toast.showWithGravity(
      I18n.t("SHARE_SCREEN.LABEL_COPY"),
      Toast.SHORT,
      Toast.BOTTOM
    );
    //save to Clipboard
    Clipboard.setString(referralCode.toString());
  };

  const _showReferralPolicy = async () => {
    // Show loading
    store.dispatch(setLoading(true));
    // Get referral policy
    const result: IRespond = await getReferralPolicyAPI();
    // Hide loading
    store.dispatch(setLoading(false));
    // Get data false
    if (result?.error) {
      return;
    }
    return setDataReSult(result);
  };

  useEffect(() => {
    _showReferralPolicy();
  }, []);

  const mapKey = {
    CUSTOMER: require("@images/share/share_detail_5.png"),
    PARTNER: require("@images/share/share_detail_4.png"),
  };

  const _onShareAsker = async () => {
    // Tracking CleverTap
    trackingButtonClick(ASKER);

    try {
      // Loading
      store.dispatch(setLoading(true));
      const params = `referralCode=${referralCode}`;
      const url = await getShortLinkFirebase({
        language: I18n.locale,
        deeplinkSetting: store.getState().app?.settingSystem?.inviteDeeplink,
        params: params,
      });
      store.dispatch(setLoading(false));
      if (!url) {
        return;
      }
      const cost = I18n.t("COST_AND_CURRENCY");
      const message =
        I18n.t("CAR_ADVERTISING.INVITE_ASKER_TEXT_HEAD") +
        " " +
        referralCode +
        " " +
        I18n.t("CAR_ADVERTISING.INVITE_ASKER_TEXT_TAIL");
      const shareOptions = {
        title: I18n.t("CAR_ADVERTISING.INVITE_ASKER_TEXT_HEAD"),
        message: message + "\n" + url,
        subject: I18n.t("CAR_ADVERTISING.INVITE_ASKER_TEXT_HEAD"), //  for email
      };

      //Android required url
      if (isAndroid) {
        // shareOptions.url = url;
        shareOptions.message = message;
      }
      // share start
      // Hide Loading
      Share.open(shareOptions)
        .then((res) => {
          // console.log(res)
          // hide loading
        })
        .catch((err) => {
          // err && console.log(err);
        });
    } catch (error) {}
  };

  const _onShareTasker = () => {
    // Tracking CleverTap
    trackingButtonClick(TASKER);

    // Loading
    // store.dispatch(setLoading(true));
    let message =
      I18n.t("CAR_ADVERTISING.INVITE_ASKER_TEXT_HEAD") + " " + referralCode;
    // Hide Loading
    if (referralCode) {
      createShortDynamicLink(referralCode)
        .then((url) => {
          if (url) {
            const shareOptions = {
              title: I18n.t("CAR_ADVERTISING.INVITE_ASKER_TEXT_HEAD"),
              message: message + "\n" + url,
              subject: I18n.t("CAR_ADVERTISING.INVITE_ASKER_TEXT_HEAD"), //  for email
            };
            //Android required url
            if (!isIOS) {
              shareOptions.url = url;
              shareOptions.message = message;
            }
            Share.open(shareOptions).catch((err) => {});
          }
        })
        .catch((error) => {});
    }
    // store.dispatch(setLoading(false));
  };

  const _handleShare = () => {
    return Alert.alert.open(
      {
        title: "SHARE_SCREEN.TITLE_SHARE_REFERRAL_CODE",
        message: ["SHARE_SCREEN.SUB_TITLE_SHARE_REFERRAL_CODE"],
        actions: [
          {
            text: "SHARE_SCREEN.SHARE_WITH_ASKER",
            onPress: () => {
              _onShareAsker();
              Alert.alert.close();
            },
          },
          {
            text: "SHARE_SCREEN.SHARE_WITH_TASKER",
            onPress: () => {
              _onShareTasker();
              Alert.alert.close();
            },
          },
        ],
      },
      true
    );
  };

  const labels = ["SHARE_WITH_YOUR_FRIEND", "FRIEND_DOW_APP", "BE_REWARDED"];

  const renderStepIndicator = ({ position, stepStatus }) => {
    const icons = {
      finished: "unChecked",
      unfinished: "unChecked",
      current: "unChecked",
    };
    return (
      <Box>
        <Icon
          size="l"
          color={stepStatus === "current" ? "white" : "white"}
          name={icons[stepStatus]}
        />
      </Box>
    );
  };

  return (
    <Container>
      <ScrollView
        testID="scrollViewShare"
        contentContainerStyle={styles.contentContainer}
        style={{ flex: 1 }}
      >
        <Box center>
          <Image
            resizeMode="contain"
            source={require("@images/share/share-image.png")}
            style={styles.imageBackGround}
          />
          <Box
            style={{ paddingVertical: spacing.l }}
            testID=""
          >
            <Text
              testID="textGiftForYoy"
              bold
              fontSize="xxl"
              color="primary"
              numberOfLines={2}
              style={{ textAlign: "center" }}
            >
              {I18n.t("SHARE_SCREEN.GIFTS_FOR_YOU_FOR_ME")}
            </Text>
          </Box>
        </Box>
        {/* Card: Mã giới thiệu của ban */}
        <Card>
          <Box center>
            <Text
              bold
              color="primary"
            >
              {I18n.t("SHARE_SCREEN.YOUR_REFERRAL_CODE")}
            </Text>
            <Box style={{ flexDirection: "row" }}>
              <Box>
                <Text
                  variant="h3"
                  color="secondary"
                  style={styles.textReferral}
                >
                  {referralCode}
                </Text>
              </Box>
              <Box style={{ paddingLeft: spacing.l }}>
                <TouchableOpacity
                  testID="btnCopy"
                  style={styles.textReferral}
                  onPress={() => showToast()}
                >
                  <Icon
                    name="copy"
                    size="l"
                    color="primary1"
                  />
                </TouchableOpacity>
              </Box>
            </Box>
            <Text
              fontSize="m"
              center
            >
              {I18n.t("SHARE_SCREEN.ADD_TO_PROMOTION")}
            </Text>
          </Box>
        </Card>

        {/* Card: Phần Thương giới thiệu */}

        {!_.isEmpty(dataResult?.data?.benefit?.content) ? (
          <Card>
            <Box center>
              <Text
                bold
                color="primary"
                fontSize="l"
              >
                {getTextWithLocale(titleBenefit)}
              </Text>
            </Box>
            {dataResult?.data?.benefit?.content.map((item, index) => {
              return (
                <Box
                  key={index}
                  style={styles.directionBox}
                >
                  <Box style={{ paddingRight: spacing.l }}>
                    <Text
                      bold
                      color="secondary1"
                      fontSize="xxxl"
                    >
                      {index + 1}.
                    </Text>
                  </Box>
                  <Box
                    flex
                    key={index}
                  >
                    <Text
                      bold
                      fontSize="l"
                    >
                      {getTextWithLocale(item?.title)}
                    </Text>
                    {item?.content?.map((data, index) => {
                      return (
                        <Box
                          style={styles.textContent}
                          key={index}
                        >
                          <Text fontSize="m">
                            {"•"} {getTextWithLocale(data?.title)}
                          </Text>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              );
            })}
          </Card>
        ) : null}

        {/* Card: Điều kiện */}

        {!_.isEmpty(dataResult?.data?.condition?.content) ? (
          <Card>
            <Box center>
              <Text
                bold
                color="primary"
                fontSize="l"
              >
                {getTextWithLocale(titleCondition)}
              </Text>
            </Box>
            <Box>
              {dataResult?.data?.condition?.content.map((item, index) => {
                return (
                  <Box
                    key={index}
                    style={[styles.directionBox]}
                  >
                    <Box>
                      <Image
                        source={mapKey[item.key]}
                        style={styles.image}
                      />
                    </Box>
                    <Box style={{ paddingLeft: spacing.l }}>
                      <Text bold>{getTextWithLocale(item.title)}</Text>
                      <Box
                        style={styles.textContent}
                        key={index}
                      >
                        {item?.content.map((data, index) => {
                          return (
                            <Box key={index}>
                              <Text fontSize="m">
                                {"•"} {getTextWithLocale(data?.title)}
                              </Text>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Box style={styles.directionBox}>
              <Box></Box>
            </Box>
          </Card>
        ) : null}

        {/* Card: Làm thế nào chia sẻ thành công  */}
        <Card>
          <Box center>
            <Text
              bold
              color="primary"
              fontSize="l"
            >
              {I18n.t("SHARE_SCREEN.TEXT_SHARE_SUCCESS")}
            </Text>
          </Box>

          <Box>
            <StepIndicator
              customStyles={{
                stepIndicatorSize: 20,
                currentStepIndicatorSize: 30,
                separatorStrokeWidth: 2,
                currentStepStrokeWidth: 3,
                stepStrokeWidth: 3,
                stepIndicatorLabelFontSize: 10,
                currentStepIndicatorLabelFontSize: 12,
                labelSize: 20,
                stepStrokeFinishedColor: colors.secondary1,
                stepStrokeUnFinishedColor: colors.secondary1,
                stepIndicatorLabelUnFinishedColor: colors.secondary1,
                separatorFinishedColor: colors.secondary1,
                separatorUnFinishedColor: colors.secondary1,
                stepIndicatorFinishedColor: colors.secondary1,
                stepIndicatorUnFinishedColor: colors.secondary1,
                stepIndicatorCurrentColor: colors.secondary1,
                stepIndicatorLabelCurrentColor: colors.secondary1,
                stepIndicatorLabelFinishedColor: colors.secondary1,
              }}
              labels={labels}
              direction="vertical"
              stepCount={3}
              currentPosition={3}
              renderLabel={({ label, currentPosition }) => {
                const description =
                  "SHARE_SCREEN" + "." + "DESCRIPTION_" + label;
                return (
                  <Box style={styles.boxProcedureText}>
                    <Box>
                      <Text
                        bold
                        fontSize="l"
                      >
                        {I18n.t("SHARE_SCREEN" + "." + label)}
                      </Text>
                    </Box>
                    <Text fontSize="m">{I18n.t(description)}</Text>
                    <Box></Box>
                  </Box>
                );
              }}
              renderStepIndicator={renderStepIndicator}
            />
          </Box>
        </Card>

        {/* Card: Tổng tiền thưởng đã nhận */}
        {dataResult?.data?.referralValue?.value ? (
          <Card>
            <Box center>
              <Text
                bold
                color="primary"
              >
                {I18n.t("SHARE_SCREEN.TOTAL_BONUS")}
              </Text>
              <Box style={{ flexDirection: "row" }}>
                <Box>
                  <Text
                    variant="h3"
                    color="secondary"
                    style={styles.textReferral}
                  >
                    {formatMoney(dataResult.data.referralValue.value)}{" "}
                    {currencyReferral}
                  </Text>
                </Box>
              </Box>
              <Text
                fontSize="m"
                center
              >
                {getTextWithLocale(noteReferral)}
              </Text>
            </Box>
          </Card>
        ) : null}

        {/* Card: Bạn bè đã giới thiệu */}
        {!_.isEmpty(dataResult?.data?.invitee?.list) ? (
          <Card>
            <Box center>
              <Text
                bold
                fontSize="l"
                color="primary"
              >
                {getTextWithLocale(titleInvite)}
              </Text>
            </Box>
            <Box>
              {dataResult?.data?.invitee?.list
                .slice(0, numberOfItemsToShow)
                .map((item, index) => {
                  return (
                    <Box key={index}>
                      <Box
                        row
                        style={{ paddingTop: spacing.xl }}
                      >
                        <Image
                          source={getAvatar(item.avatar)}
                          style={styles.image2}
                        />
                        <Box style={styles.textShare}>
                          <Text
                            bold
                            fontSize="l"
                          >
                            {item.name}
                          </Text>
                          <Box style={styles.boxJoinDay}>
                            <Text>
                              {I18n.t("SHARE_SCREEN.JOIN_DAY")}{" "}
                              {formatDate(item.date, "date")}
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                      <Divider
                        style={{ paddingTop: spacing.m }}
                        width={0.5}
                      />
                    </Box>
                  );
                })}
            </Box>
            <Box center>
              {numberOfItemsToShow < dataResult?.data?.invitee?.list.length && (
                <TouchableOpacity
                  testID="btnSeeMore"
                  onPress={showMoreItems}
                  style={{ paddingTop: spacing.l }}
                >
                  <Text
                    bold
                    fontSize="l"
                    color="primary"
                  >
                    {I18n.t("SHARE_SCREEN.SEE_MORE")}
                  </Text>
                </TouchableOpacity>
              )}
            </Box>
          </Card>
        ) : null}

        {/* Card FAQ */}
        <Card>
          <Box center>
            <Text
              bold
              color="primary"
              fontSize="l"
            >
              {I18n.t("SHARE_SCREEN.FAQ")}
            </Text>
          </Box>

          <Box style={styles.directionBox}>
            {/* Image */}
            <Box>
              <Text
                color="secondary1"
                bold
                fontSize="xxl"
              >
                {I18n.t("SHARE_SCREEN.TEXT_Q1")}
              </Text>
            </Box>
            <Box flex>
              <Box style={[styles.textStyle, { paddingHorizontal: spacing.l }]}>
                <Text bold>{I18n.t("SHARE_SCREEN.HOW_GET_REWARD")}</Text>
                <Box style={styles.textStyle}>
                  <Text fontSize="m">
                    {I18n.t("SHARE_SCREEN.DONE_GET_REWARD")}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      </ScrollView>
      {/* Footer */}
      <Box
        style={[
          styles.footerStyle,
          insets.bottom && { paddingBottom: insets.bottom },
        ]}
      >
        <Button
          testID="btnShare"
          onPress={_handleShare}
          size={"lg"}
          buttonStyle={styles.btnShare}
        >
          <Text
            bold
            color="white"
            style={styles.txtShare}
          >
            {I18n.t("SHARE_SCREEN.SHARE_REFERRAL_CODE")}
          </Text>
          <Icon
            name="share"
            size="l"
          />
        </Button>
      </Box>
    </Container>
  );
};
export default ShareScreen;
