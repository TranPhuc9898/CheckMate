import React, { useEffect, useRef, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import _ from "lodash";

import { Box, ComingSoon, Container, Icon, RewardIcon, Text } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import getListBRewardsHomePage from "apis/benefit/get-reward-home-page";
import { useAnimation } from "hooks/animation";
import { COMING_SOON } from "libs/constants";
import { getTextWithLocale, handleError, IRespond } from "libs/helper";
import { getNumberOfGift, setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";

import CarouselReward from "../components/carousel-reward";
import ListCategories from "../components/list-categories";
import { ToolBarReward } from "../components/tool-bar-reward";
import { resetIncentiveState } from "../slice";
import styles from "./styles";

// Đế chạy animation lần đầu tiên
let isShowAnimation = true;

const INPUT_RANGE = Array.from({ length: 500 }, (x, i) => i);
const OUTPUT_RANGE = INPUT_RANGE.map((e) => e * -1);

let HEIGHT_TOOL_BAR_DEFAULT = 0;

const HEIGHT_HEADER = 45;

const BRewardScreen = ({ navigation }) => {
  const I18n = React.useContext(LocalizationContext);
  const [dataReward, setDataReward] = useState([]);
  const [isComingSoon, setIsComingSoon] = useState(false);

  const [heightToolBar, setHeightToolBar] = useState(HEIGHT_TOOL_BAR_DEFAULT);
  const scrollY = useRef(new Animated.Value(0)).current;

  const translateYHeader = scrollY.interpolate({
    inputRange: INPUT_RANGE,
    outputRange: OUTPUT_RANGE,
    extrapolate: "clamp",
  });

  const _initData = async () => {
    if (isShowAnimation) {
      await store.dispatch(setLoading(true));
    }
    // call API get number of gift
    store.dispatch(getNumberOfGift());

    // Call api get task detail
    const result: IRespond = await getListBRewardsHomePage();

    isShowAnimation && store.dispatch(setLoading(false));

    if (result?.isSuccess) {
      // Save data to state
      setDataReward(result?.data);
      if (isShowAnimation) {
        useAnimation("linear");
      }
      isShowAnimation = false;
      return;
    }
    // Kiểm tra lỗi COMING_SOON
    if (result?.error?.code === COMING_SOON) {
      return setIsComingSoon(true);
    }
    return handleError(result?.error);
  };

  const getHeightToolBar = (height: number) => {
    if (!HEIGHT_TOOL_BAR_DEFAULT) {
      HEIGHT_TOOL_BAR_DEFAULT = height;
      setHeightToolBar(height);
    }
  };

  useEffect(() => {
    // lần 2 vào lại trang được set lại
    isShowAnimation = true;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Reset get data when destroy
      _initData();
      return () => {
        store.dispatch(resetIncentiveState());
      };
    }, [])
  );

  const _renderContent = () => {
    // Hiển thị sắp ra mắt
    if (isComingSoon) {
      return <ComingSoon />;
    }
    return (
      <Box flex>
        <Animated.View
          style={[
            styles.wrapInput,
            {
              marginTop: heightToolBar,
              height: HEIGHT_HEADER,
              transform: [{ translateY: translateYHeader }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.boxInput}
            testID="btnRewardSearch"
            onPress={() => navigation.navigate("bRewardSearch")}
          >
            <Icon
              name={"search"}
              size="l"
              color="grey2"
            />
            <Text
              color="grey1"
              style={styles.txtSearch}
            >
              {I18n.t("TAB_BENEFIT.SEARCH_VOUCHER")}
            </Text>
          </TouchableOpacity>

          <Box style={styles.boxIcon}>
            <RewardIcon />
          </Box>
        </Animated.View>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.containerContentScroll, { paddingTop: heightToolBar + HEIGHT_HEADER }]}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        >
          <ListCategories navigation={navigation} />
          {!_.isEmpty(dataReward)
            ? dataReward.map((data, index) => (
                <Box key={index}>
                  <CarouselReward
                    navigation={navigation}
                    data={data?.rewards || []}
                    type={data?.type}
                    title={getTextWithLocale(data?.text)}
                  />
                </Box>
              ))
            : null}
        </Animated.ScrollView>
      </Box>
    );
  };

  return (
    <>
      <ToolBarReward
        getHeight={getHeightToolBar}
        scrollY={scrollY}
        heightHeader={HEIGHT_HEADER}
      />
      <Container
        headerShow={false}
        style={styles.containerStyle}
      >
        {_renderContent()}
      </Container>
    </>
  );
};

export default BRewardScreen;
