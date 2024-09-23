import { useContext, useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import getDataJourneyAPI from "apis/journey/get-journey-by-tasker";
import { IRespond, checkAnimationDisable, getIsoCodeGlobal, handleError, navigateTo } from "libs/helper";
import { setIsShowModalSeeMoreJourney, setLoading } from "redux/slice/app-slice";
import CardLevel from "./components/card-level";
import { store } from "redux/store";
import styles from "./styles";
import _ from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { Box, Button, Icon, Text } from "components";
import { LocalizationContext } from "libs/context";
import { JOURNEY_URL_TH, JOURNEY_URL_VN, THAILAND, VIETNAM } from "libs/constants";

export const statusJourney = {
  passed: "PASSED",
  lock: "LOCKED",
  processing: "PROCESSING",
};

const urlByCountry = new Map([
  [VIETNAM, JOURNEY_URL_VN],
  [THAILAND, JOURNEY_URL_TH],
]);

const JourneyScreen = () => {
  const [dataJourney, setDataJourney] = useState({ levels: [] });
  const { isShowModalSeeMoreJourney } = useSelector((state: RootState) => state.app);
  const I18n = useContext(LocalizationContext);

  const scrollRef = useRef<FlatList>(null);

  const _initDataJourney = async () => {
    // Show loading
    await store.dispatch(setLoading(true));
    // Get data journey from API
    const result: IRespond = await getDataJourneyAPI();
    // Hide loading
    await store.dispatch(setLoading(false));
    if (result.isSuccess) {
      return setDataJourney(result.data);
    }
    return handleError(result.error);
  };

  const _scrollToIndex = () => {
    // Nếu không có data level thì return
    if (_.isEmpty(dataJourney?.levels)) {
      return;
    }
    // Tìm vị trí hiện tại của Tasker
    // TODO: Đổi processing thành passed
    const currentIndex = dataJourney?.levels.findIndex((item) => item?.status === statusJourney.passed);
    if (currentIndex === -1) {
      return;
    }
    // Scroll tới vị trí hiện tại
    setTimeout(() => {
      scrollRef?.current?.scrollToIndex({
        animated: !checkAnimationDisable(),
        index: currentIndex,
      });
    }, 100);
  }

  useEffect(() => {
    // Init data journey
    _initDataJourney();
  }, []);

  useEffect(() => {
    // Scroll to my level
    _scrollToIndex();
  }, [dataJourney]);

  const _renderHeader = () => {
    // Lấy URL thông tin thêm Journey
    const urlWeb = urlByCountry.get(getIsoCodeGlobal()) || null;
    // Nếu không có URL hoặc isShowModalSeeMoreJourney = false => K hiển thị nút xem thêm
    if (!isShowModalSeeMoreJourney || !urlWeb) {
      return null;
    }
    return (
      <Box row style={styles.wrapHeader}>
        <Icon
          name="warning"
          color="secondary"
        />
        <Box flex style={styles.wrapContentHeader}>
          <Box>
            <Text bold color="secondary" style={styles.txtTitleHeader}>{I18n.t("JOURNEY.LEARN_MORE")}</Text>
            <Text style={styles.txtTitleHeader}>{I18n.t("JOURNEY.DESCRIPTION_LEARN_MORE")}</Text>
          </Box>
          <Box flex row style={styles.wrapFooter}>
            <Button
              size="md"
              titleStyle={styles.txtBtn}
              buttonStyle={styles.btnStyle}
              title={I18n.t("DIALOG.BUTTON_SKIP")}
              onPress={() => store.dispatch(setIsShowModalSeeMoreJourney(false))}
            />
            <Button
              size="md"
              title={I18n.t("DIALOG.BUTTON_SEE_MORE")}
              onPress={() => navigateTo("WebviewDetail", { url: urlWeb, title: I18n.t("JOURNEY.TITLE_DETAIL_JOURNEY") })}
            />
          </Box>
        </Box>
      </Box>
    )
  };

  return (
    <FlatList
      testID="JOURNEY_SCROLL"
      ref={scrollRef}
      renderItem={({ item }) => <CardLevel item={item} initDataJourney={_initDataJourney} />}
      data={dataJourney?.levels}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => ("level_" + index)}
      contentContainerStyle={styles.containerContentFlatList}
      ListHeaderComponent={_renderHeader}
      onScrollToIndexFailed={info => {
        // Nếu chưa scroll đc thì đợi 500ms
        const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(() => {
          // Nếu vẫn không có data thì return
          if (_.isEmpty(dataJourney?.levels)) {
            return;
          }
          // Scroll tới index
          scrollRef.current?.scrollToIndex({
            index: info.index, animated: !checkAnimationDisable()
          });
        });
      }}
    />
  );
};

export default JourneyScreen;
