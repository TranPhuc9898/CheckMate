import React, { useLayoutEffect, useState } from "react";
import { Box, Container, Text, Card, Image } from "components";
// Libs
import { LocalizationContext } from "libs/context";
import { IRespond, getTextWithLocale } from "libs/helper";
import { spacing } from "libs/theme";
import ConfettiCannon from "react-native-confetti-cannon";
import _ from "lodash";
import SkeletonRewardDetail from "./skeleton-reward-detail";
// Styles
import styles from "./styles";
// Redux
import { store } from "redux/store";
import { viewMonthlyReward } from "../slice";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
//  API
import getMonthlyRewardAPI from "apis/reward/get-monthly-reward";
import { getMonthlyReward } from "screens/monthly-reward/slice";

const MonthlyRewardDetail = (props: any) => {
  const I18n = React.useContext(LocalizationContext);
  // Lấy rewardId từ Props nofitication sang
  const rewardId = props?.route?.params?.rewardId;
  const monthlyReward = useSelector(
    (state: RootState) => state.getMonthlyReward
  );
  // Show Skeleton
  const [isShowLoading, setShowLoading] = useState(true);
  const [textDescription, setTextDescription] = useState<any>("");
  // Function to call  API
  const fetchData = async () => {
    // API viewMonthlyReward
    await store.dispatch(viewMonthlyReward);
    let description = monthlyReward?.data?.description;
    // Nếu không có Description thì call API
    if (!description) {
      // Call Again API
      const respond: IRespond = await getMonthlyRewardAPI(rewardId);
      if (respond?.isSuccess) {
        description = respond.data?.description;
      }
    }
    setTextDescription(description);
  };

  useLayoutEffect(() => {
    // Call api
    fetchData();
    return () => {
      store.dispatch(getMonthlyReward());
    };
  }, [monthlyReward?.data?.rewardId]);

  // Show skeleton when call api and textDescription empty
  if (isShowLoading && _.isEmpty(textDescription))
    return <SkeletonRewardDetail />;

  const _renderItem = () => {
    return (
      <Card flex>
        <ConfettiCannon
          count={200}
          origin={{ x: 0, y: -10 }}
        />
        <Box flex>
          {/* Header Content */}
          <Box
            center
            flex
          >
            <Image
              source={require("@images/reward.png")}
              style={styles.image}
            />
          </Box>
          {/* Body Content */}
          <Box flex>
            <Box center>
              <Text
                fontWeight="xl"
                color="primary"
              >
                {I18n.t("MONTHLY_REWARD.CONGRATULATIONS")}
              </Text>
            </Box>
            <Box style={{ paddingTop: spacing.xxxl }}>
              <Text
                fontSize="l"
                color="primary"
                style={{ textAlign: "center" }}
                testID="textNewversionText"
              >
                {getTextWithLocale(textDescription)}
              </Text>
            </Box>
          </Box>
          {/* End content */}
        </Box>
      </Card>
      // </Box>
    );
  };
  return <Container>{_renderItem()}</Container>;
};

export default MonthlyRewardDetail;
