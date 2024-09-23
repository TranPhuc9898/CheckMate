import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import _ from "lodash";
import { LocalizationContext } from "@src/libs/context";
import { Box, Icon, Image, Text } from "@src/components";
import styles, { SLIDER_WIDTH, ITEM_WIDTH } from "../layout/styles";
import { getTextWithLocale, formatMoney } from "libs/helper";
import { bReward } from "hooks/bReward";

interface ICarouselReward {
  navigation?: any;
  data?: any;
  title?: string;
  type?: string;
}

const CarouselReward: React.FC<ICarouselReward> = ({
  navigation,
  data,
  title,
  type,
}) => {
  const I18n = React.useContext(LocalizationContext);
  const ref = useRef(null);
  const { redeemGift } = bReward();

  if (_.isEmpty(data)) {
    return null;
  }

  // Render item bReward
  const _renderItem = ({ item, index }) => {
    return (
      <Box
        style={styles.slide}
        key={index}
      >
        <TouchableOpacity
          testID={`txtReward${index}`}
          onPress={() =>
            navigation.navigate("BRewardDetail", {
              rewardId: item._id,
              title: getTextWithLocale(item.title),
            })
          }
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />
          <Box
            margin="l"
            key={index}
          >
            <Box style={styles.boxBody}>
              <Text
                fontSize="l"
                fontWeight="m"
                numberOfLines={2}
              >
                {getTextWithLocale(item.title)}
              </Text>
              <Text
                fontSize="l"
                color="grey1"
                numberOfLines={1}
                style={styles.txtBranchName}
              >
                {getTextWithLocale(item?.brandText)}
              </Text>
            </Box>
            <Box
              row
              center
              style={styles.boxPoint}
            >
              <Box row>
                <Box row>
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
                </Box>

                <Box center>
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
              {item?.isShowRedeem ? (
                <TouchableOpacity
                  style={styles.btnRedemNow}
                  onPress={() => {
                    redeemGift(item._id, item.point);
                  }}
                >
                  <Text
                    bold
                    fontSize="m"
                    color="white"
                  >
                    {I18n.t("BREWARD.REDEM_NOW")}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
    );
  };
  return (
    <Box>
      <Box
        center
        row
        style={styles.wrapViewMore}
      >
        <Text
          variant="h3"
          style={styles.txtLabelType}
        >
          {title}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ListReward", { title: title, type: type })
          }
        >
          <Text color="secondary">{I18n.t("BREWARD.VIEW_MORE")}</Text>
        </TouchableOpacity>
      </Box>
      <Carousel
        ref={ref}
        data={data}
        renderItem={_renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        layout={"default"}
        activeSlideAlignment={"start"}
        containerCustomStyle={styles.containerCarousel}
        hasParallaxImages={true}
      />
    </Box>
  );
};

export default CarouselReward;
