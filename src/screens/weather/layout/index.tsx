import React, { FunctionComponent, useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";

import { Box, ConditionView, Container, Image, Text } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import { fetchWeatherForecast } from "apis/weather";
import { weatherImages } from "libs/config";
import { DAY_OF_WEEK } from "libs/constants";
import { removeVietnameseTones } from "libs/helper";
import { RootState } from "redux/slice";

import ListWeatherOfDay from "../components/list-weather-of-day";
import ListWeatherOfHour from "../components/list-weather-of-hour";
import SkeletonWeather from "../components/skeleton-weather";
import styles from "./styles";

interface WeatherProps {
  navigation;
}

const WeatherScreen: FunctionComponent<WeatherProps> = ({ navigation }) => {
  const I18n = React.useContext(LocalizationContext);
  const { user } = useSelector((state: RootState) => state.app);
  const cityName = user?.workingPlaces[0]?.city;

  const [current, setCurrent] = useState<any>();
  const [listHour, setListHour] = useState<any>();
  const [forecastday, setForecastday] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getListHour = (hours) => {
    // Loại bỏ những giờ đã trôi qua
    const customHours = [];
    _.forEach(hours, (hour) => {
      if (moment().isBefore(moment(hour?.time))) {
        customHours.push(hour);
      }
    });
    setListHour(customHours);
  };

  const fetchData = async () => {
    setIsLoading(true);
    await fetchWeatherForecast({
      cityName: removeVietnameseTones(cityName),
      days: DAY_OF_WEEK,
    }).then((data) => {
      setCurrent(data?.current);
      setForecastday(data?.forecast?.forecastday);
      const hours = _.get(data, "forecast.forecastday[0].hour", []);
      getListHour(hours);
    });
    await setIsLoading(false);
  };

  useEffect(() => {
    navigation.setOptions({ title: cityName });
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <ImageBackground
        style={styles.imageBackground}
        blurRadius={50}
        source={require("@images/weather/bg.png")}
      >
        <SkeletonWeather />
      </ImageBackground>
    );
  }

  return (
    <Container
      headerShow={false}
      headerTitle={cityName}
    >
      <ImageBackground
        style={styles.imageBackground}
        blurRadius={50}
        source={require("@images/weather/bg.png")}
      >
        <ScrollView>
          <Box
            center
            style={styles.containerStyle}
          >
            <Box
              center
              style={styles.boxTempC}
            >
              <ConditionView
                condition={current?.condition?.text}
                viewTrue={
                  <Image
                    style={styles.image}
                    source={
                      weatherImages[current?.condition?.text]?.image || require("@images/weather/moderaterain.png")
                    }
                  />
                }
              />
              <ConditionView
                condition={current?.condition?.text}
                viewTrue={
                  <Text
                    bold
                    color="white"
                    fontSize="xxl"
                    style={styles.txtContent}
                  >
                    {weatherImages[current?.condition?.text]
                      ? I18n.t(weatherImages[current?.condition?.text]?.text)
                      : current?.condition?.text}
                  </Text>
                }
              />
              <ConditionView
                condition={current?.temp_c}
                viewTrue={
                  <Text
                    bold
                    color="white"
                    fontSize="xxl"
                    style={styles.txtTempC}
                  >
                    {current?.temp_c + "°C"}
                  </Text>
                }
              />
            </Box>
          </Box>
          <ListWeatherOfHour listHour={listHour} />
          <ListWeatherOfDay listDay={forecastday} />
        </ScrollView>
      </ImageBackground>
    </Container>
  );
};

export default WeatherScreen;
