import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import _ from "lodash";

import { getListBenefitByTaskerAPI } from "@src/apis/user";
import { Box, Card, Container, Image, Text, TransitionView, ZoomImage } from "@src/components";
import { trackingCleverTapScreenView } from "@src/libs/tracking/track-clever-tap";
import ErrorScreen from "@src/screens/error/layout/index";
import HeaderReward from "components/header-reward";
import { useI18n } from "hooks/translation";
import {
  BENEFIT_BCARE,
  BENEFIT_BREWARD,
  BENEFIT_COMMUNITY,
  BENEFIT_MONTHLY_REWARD,
  BENEFIT_TRAINING_PREMIUM,
  BENEFIT_TRAINING_PROGRAM,
} from "libs/constants";
import { IRespond, navigateTo } from "libs/helper";
import { spacing } from "libs/theme";

import MonthlyReward from "./monthly-reward";
import SkeletonBenefit from "./skeleton-benefit";
import styles from "./styles";

const LIST_BENEFIT = [
  {
    name: BENEFIT_COMMUNITY,
    title: "TAB_BENEFIT.COMMUNITY",
    content: "TAB_BENEFIT.COMMUNITY_CONTENT",
    image: require("@images/benefit/community-benefit.png"),
    navigateTo: "Community",
  },
  {
    name: BENEFIT_BREWARD,
    title: "TAB_BENEFIT.BREWARD",
    content: "TAB_BENEFIT.BREWARD_CONTENT",
    image: require("@images/benefit/bReward-benefit.png"),
    navigateTo: "BReward",
  },
  {
    name: BENEFIT_TRAINING_PROGRAM,
    title: "TAB_BENEFIT.TRAINING",
    content: "TAB_BENEFIT.TRAINING_CONTENT",
    image: require("@images/active-account/step-2.png"),
    navigateTo: "TrainingProgramList",
  },
  {
    name: BENEFIT_TRAINING_PREMIUM,
    title: "TAB_ACCOUNT.PREMIUM",
    content: "TAB_BENEFIT.PREMIUM_CONTENT",
    image: require("@images/premium-benefit.png"),
    navigateTo: "TrainingPremium",
  },
  {
    name: BENEFIT_BCARE,
    title: "TAB_BENEFIT.BCARE",
    content: "TAB_BENEFIT.BCARE_CONTENT",
    image: require("@images/benefit/bCare-benefit.png"),
    navigateTo: "BCareDetail",
  },
];

const BenefitScreen = ({ navigation }) => {
  const { t } = useI18n();
  const [listBenefit, setListBenefit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isShowMonthlyReward, setIsShowMonthlyReward] = useState(false);

  const getListBenefit = async () => {
    setLoading(true);
    const respond: IRespond = await getListBenefitByTaskerAPI();
    setLoading(false);
    // Error
    if (!respond.isSuccess) {
      setError(true);
      setListBenefit([]);
      return;
    }
    // success
    if (respond.isSuccess) {
      let listBenefit = respond?.data?.listBenefit || [];
      // Kiểm tra có thưởng tháng không
      const monthlyReward = listBenefit.find((obj) => obj.name === BENEFIT_MONTHLY_REWARD);
      // Nếu có -> set isShowMonthlyReward
      setIsShowMonthlyReward(Boolean(monthlyReward));
      // Bỏ thưởng tháng ra khỏi danh sách
      listBenefit = listBenefit.filter((item) => item.name !== BENEFIT_MONTHLY_REWARD);
      // Lấy thôgn tin Benefit được cho phép hiển thị
      listBenefit = listBenefit.map((item1) => {
        // Tìm danh sách benefit được hiển thị
        const benefitObject = LIST_BENEFIT.find((item2) => item2.name === item1.name);
        // Nếu có -> set thông tin
        if (benefitObject) {
          return { ...item1, ...benefitObject };
        }
        return item1;
      });
      // Lưu thông tin benefit
      setListBenefit(listBenefit);
    }
  };

  useEffect(() => {
    getListBenefit();
    trackingCleverTapScreenView("Benefit");
  }, []);

  const renderItem = (item, index) => {
    // Hiển thị UI cho Tasker đạt điều kiện traning premium
    if (item?.isQualify && item?.name === BENEFIT_TRAINING_PREMIUM) {
      return (
        <TransitionView
          index={index}
          duration={1500}
        >
          <ImageBackground
            source={require("assets/images/benefit/background-traning-premium.png")}
            style={styles.wrapPremium}
          >
            <TouchableOpacity
              testID={item?.navigateTo}
              onPress={() => navigateTo(item?.navigateTo)}
            >
              <Box
                center
                style={styles.boxPremium}
              >
                <ZoomImage
                  imageSource={item?.image}
                  imageStyle={styles.image}
                />
                <Box
                  center
                  style={styles.boxTitle}
                >
                  <Text
                    bold
                    style={styles.txtPremium}
                    color="secondary"
                    testID="txtTrainingNow"
                  >
                    {t("TRAINING_PREMIUM.TITLE_TASKER_PREMIUM")}
                  </Text>
                  <Text
                    center
                    fontSize="m"
                    color="secondary"
                    testID="txtPremium"
                  >
                    {t("TRAINING_PREMIUM.LABEL_START_NOW")}
                  </Text>
                </Box>
              </Box>
            </TouchableOpacity>
          </ImageBackground>
        </TransitionView>
      );
    }
    return (
      <TransitionView
        index={index}
        duration={1500}
      >
        <TouchableOpacity
          testID={item?.navigateTo}
          onPress={() => navigateTo(item?.navigateTo)}
        >
          <Box
            center
            style={styles.boxItemReward}
          >
            <Image
              source={item?.image}
              style={styles.image}
            />
            <Box
              center
              style={styles.boxTitle}
            >
              <Text
                bold
                numberOfLines={1}
                style={styles.txtTitle}
              >
                {t(item?.title)}
              </Text>
              <Text
                center
                numberOfLines={4}
                style={styles.txtDescription}
              >
                {t(item?.content)}
              </Text>
            </Box>
          </Box>
        </TouchableOpacity>
      </TransitionView>
    );
  };

  const _renderBenefit = () => {
    if (loading) {
      return <SkeletonBenefit />;
    }

    // Throw error
    if (error) {
      return (
        <ErrorScreen
          onPress={() => {
            setError(false);
            getListBenefit();
          }}
        />
      );
    }

    if (_.isEmpty(listBenefit)) {
      return (
        <Card>
          <Box
            style={styles.boxEmpty}
            center
          >
            <Image
              source={require("@images/empty-data-benefit.png")}
              style={styles.imageEmpty}
            />
            <Text style={styles.txtEmpty}>{t("TAB_BENEFIT.EMPTY_DATA")}</Text>
          </Box>
        </Card>
      );
    }

    return (
      <FlatGrid
        ListHeaderComponent={isShowMonthlyReward ? <MonthlyReward navigation={navigation} /> : null}
        data={listBenefit}
        renderItem={({ item, index }) => renderItem(item, index)}
        itemDimension={Dimensions.get("window").width / 2 - spacing.xxl * 2}
        style={styles.styleFlatGrid}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <Container headerShow={false}>
      <HeaderReward
        title={t("HOME.TAB_BENEFIT")}
        navigation={navigation}
        hideHeadBack={true}
        headerStyle={styles.headerStyle}
        isGift={true}
      />
      <_renderBenefit />
    </Container>
  );
};

export default BenefitScreen;
