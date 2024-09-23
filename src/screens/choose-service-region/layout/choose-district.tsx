import React from "react";
import { FlatGrid } from "react-native-super-grid";
import _ from "lodash";

import { Box, CheckBox, Text, TransitionView } from "@src/components";
import { useI18n } from "hooks/translation";
import { getTextWithLocale } from "libs/helper";
import { colors, spacing } from "libs/theme";

import NextStep from "./next-step";
import styles from "./styles";

const RegisterChooseDistrict: React.FC<{
  citySelected?: any;
  setDistrictSelected?: any;
  districtSelected?: any;
  step?: any;
  setStep?: any;
}> = ({ citySelected, setDistrictSelected, step, setStep, districtSelected }) => {
  const { t } = useI18n();
  // Initialize useState
  const [district, setDistrict] = React.useState<{}[]>(districtSelected || []);

  // Handle choose city
  const handleChooseDistrict = (item: any) => {
    const newDistrict = [...district];

    // Check item has exist
    const districtIndex = _.findIndex(district, (element: string) => element === item);
    // if item is exist, replace item
    if (districtIndex !== -1) {
      newDistrict.splice(districtIndex, 1);
    } else {
      // Data not exist, push new item to array
      newDistrict.push(item);
    }

    setDistrict(newDistrict);
    setDistrictSelected(newDistrict);
  };

  // Render item FlatList
  const _renderItem = ({ item }) => {
    const picked = _.find(district, (element: string) => element === item.name);
    const checkDisabled = () => {
      if (district.length < 3) {
        return false;
      }
      if (picked) {
        return false;
      }
      return true;
    };
    return (
      <Box style={[styles.boxItemCheckbox, picked ? { backgroundColor: colors.primary3 } : styles.isStyleInActive]}>
        <CheckBox
          testID={"district_" + item.name}
          title={getTextWithLocale(item?.text)}
          checked={Boolean(picked)}
          onPress={() => handleChooseDistrict(item.name)}
          textStyle={{ fontWeight: "normal" }}
          disabled={checkDisabled()}
          containerStyle={[picked ? { backgroundColor: colors.primary3 } : {}]}
          size={18}
        />
      </Box>
    );
  };

  return (
    <TransitionView
      duration={1000}
      animation="fadeIn"
      style={{ flex: 1 }}
    >
      <Box flex>
        <Box
          center
          style={styles.boxTitle}
        >
          <Text
            bold
            color="primary"
            fontSize="xl"
            center
          >
            {t("REGISTER_CHOOSE_WORKING_PLACE_DISTRICT.CHOOSE_DISTRICT")}
          </Text>
        </Box>
        <FlatGrid
          data={citySelected?.districts}
          renderItem={_renderItem}
          keyExtractor={(item, index) => "district_" + item?.name}
          style={{ marginBottom: spacing.m }}
          showsVerticalScrollIndicator={false}
        />
        {/* <Box
          center
          style={styles.boxBottom}
        >
          <Text fontSize="m">
            {t("REGISTER_CHOOSE_WORKING_PLACE_DISTRICT.LIMIT_DISTRICT")}
          </Text>
        </Box> */}
        <NextStep
          step={step}
          setStep={setStep}
          disabled={_.isEmpty(district)}
        />
      </Box>
    </TransitionView>
  );
};
export default RegisterChooseDistrict;
