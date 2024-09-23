import { FlatList } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Avatar, Box, Card, ComingSoon, Icon, Image, Text } from "components";
import getLeaderBoardAPI from "apis/journey/get-leader-board";
import TopLeaderBoard from "./components/top-member";
import HeaderLeaderBoard from "./components/header";
import { IRespond, handleError } from "libs/helper";
import { setLoading } from "redux/slice/app-slice";
import { LocalizationContext } from "libs/context";
import { store } from "redux/store";
import styles from "./styles";
import { COMING_SOON } from "libs/constants";

const SIZE_AVATAR = 40;
const statusRankChange = {
  up: "UP",
  down: "DOWN"
}

const LeaderBoardScreen = () => {
  const I18n = useContext(LocalizationContext);
  const [dataLeaderBoard, setDataLeaderBoard] = useState(null);
  const [isComingSoon, setIsComingSoon] = useState(false);

  const _initDataLeaderBoard = async () => {
    // Show loading
    await store.dispatch(setLoading(true));
    // Get data leader board
    const respond: IRespond = await getLeaderBoardAPI();
    // Hide loading
    await store.dispatch(setLoading(false));
    // Save list leader board to state
    if (respond?.isSuccess) {
      return setDataLeaderBoard(respond.data);
    }
    // Kiểm tra lỗi COMING_SOON
    if (respond?.error?.code === COMING_SOON) {
      return setIsComingSoon(true);
    }
    // Handle error
    return handleError(respond?.error);
  };

  // Check rank change
  const _checkRankChange = (rankChange) => {
    if (rankChange === statusRankChange.up) {
      return (
        <Icon
          size="s"
          name="dropUp"
          color="success"
        />
      );
    }
    if (rankChange === statusRankChange.down) {
      return (
        <Icon
          size="s"
          name="dropDown"
          color="error"
        />
      );
    }
    return null;
  };

  useEffect(() => {
    // Get data leader board
    _initDataLeaderBoard();
  }, []);

  const _renderItem = ({ item, index }) => {
    return (
      <Card key={"top_member" + index} style={item?.isCurrent ? styles.wrapMyRankItem : null}>
        <Box
          row
          alignCenter
          between
        >
          <Box
            row
            alignCenter
          >
            <Box center>
              <Text bold color={item?.isCurrent ? "secondary" : "black"}>{item?.rank}</Text>
              {_checkRankChange(item?.rankChange)}
            </Box>
            <Box style={styles.wrapAvtMember}>
              <Avatar
                resizeMode="cover"
                size={SIZE_AVATAR}
                avatar={item?.avatar}
              />
            </Box>
            <Text
              fontSize="m"
              color={item?.isCurrent ? "secondary" : "black"}
              style={item?.isCurrent ? styles.txtActive : null}
            >
              {item?.name}
            </Text>
          </Box>
          <Text
            bold
            fontSize="m"
            color={item?.isCurrent ? "secondary" : "black"}
          >
            {item?.point}
          </Text>
        </Box>
      </Card>
    );
  };

  const _renderEmptyLeaderBoard = () => {
    return (
      <Box flex center style={styles.containerEmpty}>
        <Box>
        <Image
          source={require("assets/images/leaderboard-empty.png")}
          style={styles.imageEmpty}
        />
        </Box>
        <Text center style={styles.txtEmpty}>{I18n.t("JOURNEY.LEADER_BOARD_EMPTY")}</Text>
      </Box>
    )
  };

  // Hiển thị sắp ra mắt
  if (isComingSoon) {
    return <ComingSoon />
  }

  return (
    <Box flex>
      {/* Header leader board */}
      <HeaderLeaderBoard
        icon={dataLeaderBoard?.currentRank?.icon}
        text={dataLeaderBoard?.currentRank?.text}
        title={dataLeaderBoard?.currentRank?.title}
        cityName={dataLeaderBoard?.currentRank?.cityName}
      />
      {/* End header leader board */}

      {/* List member */}
      <FlatList
        testID="scrollLeaderBoard"
        renderItem={_renderItem}
        data={dataLeaderBoard?.member}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={<TopLeaderBoard listTop={dataLeaderBoard?.top} />}
        ListEmptyComponent={_renderEmptyLeaderBoard}
      />
      {/* End list member */}
    </Box>
  );
};

export default LeaderBoardScreen;
