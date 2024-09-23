import { Avatar, Box, Card, Divider, Icon, Text } from "components";
import styles from "../../styles";
import { Dimensions, TouchableOpacity } from "react-native";
import _ from "lodash";
import { spacing } from "libs/theme";
import { useContext } from "react";
import { LocalizationContext } from "libs/context";
import { navigateTo } from "libs/helper";

const SIZE_AVATAR = Dimensions.get("window").width / 5;
const SIZE_AVATAR_TOP_1 = Dimensions.get("window").width / 3.5;

interface ITopLeaderBoard {
  listTop: any[];
}

const typeRankChange = {
  up: "UP",
  down: "DOWN"
}

const TopLeaderBoard = ({ listTop }) => {
  if (_.isEmpty(listTop)) {
    return null;
  }
  const I18n = useContext(LocalizationContext);

  // Check is current rank
  const _checkMyRank = (isCurrent) => {
    if (isCurrent) {
      return true;
    }
    return false;
  };

  // Check rank change
  const _checkRankChange = (rankChange) => {
    if (rankChange === typeRankChange.up) {
      return (
        <Icon
          size="m"
          name="dropUp"
          color="success"
        />
      );
    }
    if (rankChange === typeRankChange.down) {
      return (
        <Icon
          size="m"
          name="dropDown"
          color="error"
        />
      );
    }
    return null;
  };

  const _renderItem = (item: any) => {
    if (_.isEmpty(item)) {
      return null;
    }
    return (
      <Box
        flex
        alignCenter
        style={styles.wrapTop}
        key={"top_" + item?.rank}
      >
        <Text
          center
          variant="h3"
        >
          {item?.rank}
        </Text>
        {_checkRankChange(item?.rankChange)}
        <Box
          style={
            _checkMyRank(item?.isCurrent)
              ? styles.wrapMyAvatar
              : styles.wrapAvatar
          }
        >
          <Avatar
            avatar={item?.avatar}
            size={item?.rank === 1 ? SIZE_AVATAR_TOP_1 : SIZE_AVATAR}
            resizeMode={"cover"}
          />
        </Box>
        <Box style={styles.wrapInfoTop}>
          <Text
            center
            fontSize="m"
            fontWeight={_checkMyRank(item?.isCurrent) ? "l" : "s"}
            color={_checkMyRank(item?.isCurrent) ? "secondary" : "black"}
          >
            {item?.name}
          </Text>
          <Divider
            width={1}
            style={styles.dividerStyle}
          />
          <Text
            center
            fontSize="m"
            fontWeight={_checkMyRank(item?.isCurrent) ? "l" : "s"}
            color={_checkMyRank(item?.isCurrent) ? "secondary" : "black"}
          >
            {item?.point}
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      {/* TODO: Đợi api đổi sang webview */}
      {/* Calculate score */}
      {/* <TouchableOpacity onPress={() => navigateTo("CalculateScoreLeaderBoard")}>
        <Box row alignCenter style={styles.wrapCalculate}>
          <Icon
            name="warning"
            color="secondary"
            size="m"
          />
          <Text
            fontSize="m"
            color="secondary"
            fontWeight="m"
            style={styles.txtCalculate}>{I18n.t("JOURNEY.TITLE_BUTTON_RANK_SCORE")}</Text>
        </Box>
      </TouchableOpacity> */}
      {/* End calculate score */}

      {/* Top member */}
      <Card>
        <Box
          row
          between
        >
          {_renderItem(listTop[1])}
          {_renderItem(listTop[0])}
          {_renderItem(listTop[2])}
        </Box>
      </Card>
      {/* End top member */}
    </Box>
  );
};
export default TopLeaderBoard;
