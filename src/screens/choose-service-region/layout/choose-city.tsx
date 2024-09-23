/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-11 15:01:38
 * @modify date 2022-10-11 15:01:38
 * @desc [Choose working place]
 */
import React from "react";
import { TouchableOpacity } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { isEmpty } from "lodash";

import { Box, ComingSoon, Image, Text } from "@src/components";
import { useI18n } from "hooks/translation";
import { getTextWithLocale } from "libs/helper";
import { colors } from "libs/theme";

import styles from "./styles";

interface IChooseCity {
  data?: any;
  value?: any;
  step?: any;
  setStep?: any;
  citySelected?: any;
  setCitySelected?: any;
  setChooseService?: any;
  setDistrictSelected?: any;
}

const ChooseCity: React.FC<IChooseCity> = ({
  data,
  step,
  value,
  setStep,
  citySelected,
  setCitySelected,
  setChooseService,
  setDistrictSelected,
}) => {
  const { t } = useI18n();

  const _renderItem = (item) => {
    return (
      <TouchableOpacity
        testID={"city_" + item.code}
        onPress={() => {
          setCitySelected(item);
          item?.name !== citySelected?.name && setDistrictSelected([]);
          setChooseService([]);
          setStep(step + 1);
        }}
        style={[styles.boxItem, value === item.name ? { backgroundColor: colors.primary3 } : styles.isStyleInActive]}
      >
        <Box flex>
          <Text fontSize="m">{getTextWithLocale(item.text)}</Text>
        </Box>
      </TouchableOpacity>
    );
  };

  const _renderContent = () => {
    if (isEmpty(data)) {
      return (
        <Box
          flex
          style={styles.container}
        >
          <ComingSoon />
        </Box>
      );
    }
    return (
      <FlatGrid
        data={data}
        renderItem={({ item }) => _renderItem(item)}
      />
    );
  };

  return (
    <Box
      flex
      style={styles.container}
    >
      <Box
        center
        style={styles.boxTitle}
      >
        <Text
          bold
          color="primary"
          fontSize="xl"
          center
          testID="titleChooseCity"
        >
          {t("REGISTER_CHOOSE_WORKING_PLACE_CITY.CHOOSE_CITY")}
        </Text>
        <Image
          source={require("@images/active-account/background-map.png")}
          style={styles.imageMap}
        />
      </Box>
      {_renderContent()}
    </Box>
  );
};
export default ChooseCity;
