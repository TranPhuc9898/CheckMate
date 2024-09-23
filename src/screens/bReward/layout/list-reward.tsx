import React, { useEffect, useMemo, useState } from "react";
import { LocalizationContext } from "@src/libs/context";
import { Box, Card, Container, Image, Text, Icon } from "@src/components";
import styles from "./styles";
import { store } from "redux/store";
import { onGetListRewards, resetIncentiveState } from "../slice";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { setLoading } from "redux/slice/app-slice";
import HeaderReward from "components/header-reward";
import ListReward from "../components/list-reward";
import Skeleton from "./skeleton";
import _ from "lodash";
import { useAnimation } from "hooks/animation";

const BRewardScreen = ({ navigation, route }) => {
  const I18n = React.useContext(LocalizationContext);
  const { incentivesData } = useSelector(
    (state: RootState) => state.userReward
  );
  const title = route?.params?.title;
  const type = route?.params?.type;
  const categoryName = route?.params?.categoryName;
  const [isLoadingData, setLoadingData] = useState(false);

  const _initData = async () => {
    setLoadingData(true);
    // Init data rewards
    await store.dispatch(
      onGetListRewards({ type: type, categoryName: categoryName })
    );
    setLoadingData(false);
    useAnimation("spring");
  };

  useEffect(() => {
    _initData();
    return () => {
      store.dispatch(resetIncentiveState());
    };
  }, []);

  const _getIncentiveData = async () => {
    await store.dispatch(
      onGetListRewards({ type: type, categoryName: categoryName })
    );
    setLoadingData(false);
  };

  const _handleLoadMore = () => {
    setLoadingData(true);
    // check wait for get data in complete, if get data api is complete, isLoadingData = false
    if (!isLoadingData) {
      // start get data
      _getIncentiveData();
    }
  };

  const _renderContent = useMemo(() => {
    if (isLoadingData) {
      return <Skeleton />;
    }
    if (_.isEmpty(incentivesData) && !isLoadingData) {
      return (
        <Card flex>
          <Box
            flex
            center
          >
            <Image
              source={require("assets/images/empty-gift.png")}
              style={{
                width: 100,
                height: 100,
              }}
            />
            <Text
              fontSize="m"
              color="grey1"
            >
              {I18n.t("TAB_BENEFIT.LIST_INCENTIVE_EMPTY")}
            </Text>
          </Box>
        </Card>
      );
    }
    return (
      <Box flex>
        <ListReward
          data={incentivesData}
          handleLoadMore={_handleLoadMore}
        />
      </Box>
    );
  }, [isLoadingData, incentivesData]);

  return (
    <Container
      headerShow={false}
      style={styles.containerStyle}
    >
      <HeaderReward
        navigation={navigation}
        headerStyle={styles.headerStyle}
        giftStyle={styles.giftStyle}
        title={title}
        isHideRightIcon={true}
      />
      {_renderContent}
    </Container>
  );
};

export default BRewardScreen;
