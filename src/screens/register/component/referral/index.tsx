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
  import FastImage from "react-native-fast-image";
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
  import { colors, spacing } from "libs/theme";
  import Share from "react-native-share";
  
  import _ from "lodash";
  
  const ReferralScreen = () => {
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
  
  
  
    const _showReferralPolicy = async () => {
      // Show loading
      await store.dispatch(setLoading(true));
      // Get referral policy
      const result: IRespond = await getReferralPolicyAPI();
      // Hide loading
      await store.dispatch(setLoading(false));
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
  
      </Container>
    );
  };
  export default ReferralScreen;
  