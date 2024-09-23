import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import _ from "lodash";
import { MyRewardItem } from "screens/bReward/components/my-reward-item";

import { Box, Image, Text } from "@src/components";
import getNewGiftAPI, { IParamsGetMyRewards } from "apis/benefit/get-my-rewards";
import { getUserIdGlobal, handleError, IRespond } from "libs/helper";
import { spacing } from "libs/theme";

import SkeletonMyReward from "../skeleton";
import styles from "./styles";

const NewGIftScreen = ({ navigation }) => {
  const [dataNewGift, setDataNewGift] = useState();
  const [loading, setLoading] = useState(false);

  // Init data bReward
  const _initData = async () => {
    // Params api
    const params: IParamsGetMyRewards = {
      taskerId: getUserIdGlobal(),
    };
    // Show loading
    _.isEmpty(dataNewGift) ? setLoading(true) : null;
    // Call api get new gift
    const result: IRespond = await getNewGiftAPI(params);
    // Hide loading
    setLoading(false);
    // Check result success
    if (result.isSuccess) {
      return setDataNewGift(result.data);
    }
    // Handle error
    return handleError(result?.error);
  };

  useEffect(() => {
    // Init data new gift
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      _initData();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  // Render item bReward
  const _renderItem = ({ item, index }) => {
    return (
      <MyRewardItem
        testID={"itemNewGift" + index}
        testIDTitle="txtNewGift"
        item={item}
      />
    );
  };

  const itemSeparatorComponent = useCallback(() => {
    return <Box style={{ height: spacing.l }} />;
  }, []);

  const _renderEmptyGift = () => {
    return (
      <Box
        flex
        center
        style={styles.emptyContainer}
      >
        <Image
          source={require("assets/images/empty-gift.png")}
          style={styles.imageEmpty}
        />
        <Text
          fontSize="m"
          color="grey1"
        >
          {/* {I18n.t("TAB_BENEFIT.LIST_INCENTIVE_EMPTY")} */}
        </Text>
      </Box>
    );
  };

  if (loading && _.isEmpty(dataNewGift)) {
    return <SkeletonMyReward />;
  }
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={dataNewGift}
      renderItem={_renderItem}
      ListEmptyComponent={_renderEmptyGift}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={itemSeparatorComponent}
    />
  );
};

export default NewGIftScreen;