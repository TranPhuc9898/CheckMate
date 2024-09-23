import { useContext } from "react";
import {
  Box,
  CardItem,
  Text,
  Image,
  MarkDown,
  TransitionView,
} from "components";
import { getTextWithLocale, navigateTo } from "libs/helper";
import { LocalizationContext } from "libs/context";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import styles from "./styles";
import _ from "lodash";

const JourneyAndLeaderBoard = () => {
  const { journeyInfo } = useSelector((state: RootState) => state?.app?.user);
  const I18n = useContext(LocalizationContext);

  // Nếu chưa đạt hạng thì k hiển thị
  if (_.isEmpty(journeyInfo)) {
    return null;
  }

  // Hiển thị chi tiết thưởng
  const _renderReward = () => {
    if (_.isEmpty(journeyInfo?.reward)) {
      return null;
    }
    return journeyInfo?.reward.map((item, index) => (
      <Box key={"reward_" + index}>
        <MarkDown
          text={getTextWithLocale(item?.text)}
          textStyle={styles.markDownStyle}
        />
      </Box>
    ));
  };

  return (
    <TransitionView
      index={3}
      duration={1000}
    >
      <CardItem
        iconName="right"
        title={I18n.t("JOURNEY.TITLE")}
        testID="btnJourneyAndLeaderBoard"
        onPress={() => navigateTo("JourneyAndLeaderBoard")}
      >
        <Box
          row
          style={styles.boxContainer}
        >
          {/* Box: Info Journey */}
          <Box
            flex
            justifyContentCenter
          >
            <Box>
              <Text
                bold
                color="secondary"
                testID={`txtJourneyTitle_${journeyInfo?.title.en}`}
              >
                {getTextWithLocale(journeyInfo?.title)}
                <Text>{" - "}</Text>
                <Text
                  bold
                  testID={`txtJourneyText_${journeyInfo?.text.en}`}
                >
                  {getTextWithLocale(journeyInfo?.text)}
                </Text>
              </Text>
            </Box>
            {/* TODO: Đợi chốt */}
            {/* {_renderReward()} */}
          </Box>
          <Box style={styles.wrapImage}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{ uri: journeyInfo?.icon }}
            />
          </Box>
        </Box>
      </CardItem>
    </TransitionView>
  );
};

export default JourneyAndLeaderBoard;
