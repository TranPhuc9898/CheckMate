import React, { ComponentProps, FunctionComponent } from "react";
import { FlatList, View } from "react-native";
import _ from "lodash";

import { Box, ConditionView, Image, SizedBox, Text } from "@src/components";
import { weatherImages } from "libs/config";
import { LocalizationContext } from "libs/context";
import { formatDate } from "libs/helper";
import { spacing } from "libs/theme";

import styles from "./styles";

interface WeatherProps {
  listHour: any;
}

const WeatherScreen: FunctionComponent<WeatherProps> = ({ listHour = [] }) => {
  const I18n = React.useContext(LocalizationContext);
  if (_.isEmpty(listHour)) {
    return null;
  }

  const _renderItem = ({ item }: { item: any; index: number }) => {
    return (
      <Box
        center
        style={styles.boxItem}
      >
        <Text color="white">{formatDate(item?.time, "time")}</Text>
        <ConditionView
          condition={item?.condition?.text}
          viewTrue={
            <Image
              style={styles.image}
              source={weatherImages[item?.condition?.text]?.image || require("@images/weather/moderaterain.png")}
            />
          }
        />
        <Text
          color="white"
          fontSize="m"
        >
          {item?.temp_c + "°"}
        </Text>
      </Box>
    );
  };

  return (
    <Box>
      <Text
        color="white"
        bold
        fontSize="l"
        style={styles.txtByHour}
      >
        {I18n.t("WEATHER.BY_HOUR")}
      </Text>
      <FlatList
        horizontal
        testID="scrollListHour"
        data={listHour}
        renderItem={_renderItem}
        keyExtractor={(item, index) => `${item.toString()}-${index}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <SizedBox width={spacing.l} />}
      />
    </Box>
  );
};

export default WeatherScreen;
