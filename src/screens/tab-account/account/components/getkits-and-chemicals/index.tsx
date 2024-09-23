import { Box, CardItem, Text } from "components";
import { LocalizationContext } from "libs/context";
import { navigateTo } from "libs/helper";
import { useContext } from "react";

const KitsAndChemicals = () => {
  const I18n = useContext(LocalizationContext);
  return (
    <CardItem
      testID="btnKitsAndChemicals"
      iconName="right"
      title={I18n.t("KIT_CHEMICALS.TITLE")}
      onPress={() => navigateTo("KitsAndChemicals")}
    >
      <Box>
        <Text>{I18n.t("KIT_CHEMICALS.TITLE")}</Text>
      </Box>
    </CardItem>
  );
};

export default KitsAndChemicals;
