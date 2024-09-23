import React from "react";
import { LocalizationContext } from "@src/libs/context";
import { TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import { Box, Icon, Image, Text } from "@src/components";
import styles from "../layout/styles";
import { colors } from "libs/theme";
import { formatMoney, getTextWithLocale, navigateTo } from "libs/helper";

interface IMemberInforItem {
  navigation?: any;
  data?: any;
  isLoading?: boolean;
  // handleLoadMore?: any;
}

const MemberInforItem: React.FC<IMemberInforItem> = ({
  navigation,
  data,
  isLoading,
  // handleLoadMore,
}) => {
  const I18n = React.useContext(LocalizationContext);

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!isLoading) {
      return null;
    }
    return (
      <ActivityIndicator
        color={colors.primary}
        size="small"
        style={styles.loadingStyle}
      />
    );
  };

  // Render item bReward
  const _renderItem = ({ item, index }: { item: any; index: any }) => {
    return (
      <Box
        style={styles.boxSlide}
        testID={`rewardSearch${index}`}
      >
        <TouchableOpacity
          key={index}
          testID={"itemReward_" + index}
          style={styles.slideItem}
          onPress={() => navigateTo("BRewardDetail", { rewardId: item._id })}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.imageItem}
          />
          <Box
            flex
            style={styles.boxContent}
          >
            <Text
              bold
              numberOfLines={3}
            >
              {getTextWithLocale(item.title)}
            </Text>
            {/* <Text
              fontSize="m"
              color="grey1"
              style={styles.txtBranchName}
            >
              {getTextWithLocale(item?.brandInfo?.text)}
            </Text> */}
            <Box
              row
              style={styles.boxPoint}
            >
              <Box
                row
                center
              >
                <Icon
                  style={styles.iconPoint}
                  name={"point"}
                  size="l"
                  color="secondary"
                />
                <Text
                  fontWeight="m"
                  color="secondary"
                >
                  {formatMoney(item?.point)}
                </Text>
                {item?.originalPoint ? (
                  <Text
                    style={styles.linePoint}
                    fontSize="m"
                  >
                    {formatMoney(item?.originalPoint)}
                  </Text>
                ) : null}
              </Box>
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
    );
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      // onEndReachedThreshold={0.1}
      renderItem={_renderItem}
      // onEndReached={handleLoadMore}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(item, index) => `${item.toString()}-${index}`}
    />
  );
};

export default MemberInforItem;
