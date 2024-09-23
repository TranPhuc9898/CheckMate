import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { ConditionView, Image, Text } from "@src/components";
import { fetchWeatherForecast } from "apis/weather";
import { weatherImages } from "libs/config";
import { DAY_OF_WEEK } from "libs/constants";
import { navigateTo, removeVietnameseTones } from "libs/helper";
import { spacing } from "libs/theme";
import { RootState } from "redux/slice";

const RightButtonWeather = () => {
  const [current, setCurrent] = useState<any>();
  const { user } = useSelector((state: RootState) => state.app);
  const cityName = user?.workingPlaces[0]?.city;

  useEffect(() => {
    fetchWeatherForecast({
      cityName: removeVietnameseTones(cityName),
      days: DAY_OF_WEEK,
    }).then((data) => {
      setCurrent(data?.current);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToWeatherScreen = () => {
    navigateTo("WeatherScreen");
  };

  if (!current?.condition?.text && !current?.temp_c) return null;

  return (
    <TouchableOpacity
      onPress={goToWeatherScreen}
      style={styles.container}
    >
      <ConditionView
        condition={current?.condition?.text}
        viewTrue={
          <Image
            style={styles.image}
            source={weatherImages[current?.condition?.text]?.image || require("@images/weather/moderaterain.png")}
          />
        }
      />
      <ConditionView
        condition={current?.temp_c}
        viewTrue={
          <Text
            bold
            color="white"
          >
            {current?.temp_c + "°C"}
          </Text>
        }
      />
    </TouchableOpacity>
  );
};

export default RightButtonWeather;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginRight: spacing.s,
    width: spacing.xxl,
    height: spacing.xxl,
  },
});
