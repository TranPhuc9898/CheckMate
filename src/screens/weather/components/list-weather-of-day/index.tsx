import React, { FunctionComponent } from "react";
import _ from "lodash";

import { Box, ConditionView, Image, Text } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import { weatherImages } from "libs/config";
import { formatDate, upperCaseFirstText } from "libs/helper";

import styles from "./styles";

interface WeatherProps {
  listDay: any;
}

const WeatherScreen: FunctionComponent<WeatherProps> = ({ listDay = [] }) => {
  const I18n = React.useContext(LocalizationContext);
  if (_.isEmpty(listDay)) {
    return null;
  }
  return (
    <Box style={styles.container}>
      <Text
        color="white"
        bold
        fontSize="l"
        style={styles.txtByDate}
      >
        {I18n.t("WEATHER.BY_DATE")}
      </Text>
      {listDay.map((item, index) => (
        <Box
          row
          center
          style={styles.boxItem}
          key={index}
        >
          <Box style={styles.boxContent}>
            <Text color="white">{upperCaseFirstText(formatDate(item?.date, "dateAndWeekday"))}</Text>

            <ConditionView
              condition={item?.day?.condition?.text}
              viewTrue={
                <Text
                  color="white"
                  fontSize="m"
                  style={styles.txtContent}
                  numberOfLines={3}
                >
                  {weatherImages[item?.day?.condition?.text]
                    ? I18n.t(weatherImages[item?.day?.condition?.text]?.text)
                    : item?.day?.condition?.text}
                </Text>
              }
            />
          </Box>
          <Box
            center
            style={styles.boxTemC}
          >
            <ConditionView
              condition={item?.day?.condition?.text}
              viewTrue={
                <Image
                  style={styles.image}
                  source={
                    weatherImages[item?.day?.condition?.text]?.image || require("@images/weather/moderaterain.png")
                  }
                />
              }
            />
            <Text color="white">{item?.day?.mintemp_c + "°" + " - " + item?.day?.maxtemp_c + "°"}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default WeatherScreen;
