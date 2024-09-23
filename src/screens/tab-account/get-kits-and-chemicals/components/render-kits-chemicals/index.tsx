import { Box, Card, Image, Text } from "components";
import { LocalizationContext } from "libs/context";
import { formatMoney, getCountry, getCurrency, navigateTo } from "libs/helper";
import { spacing } from "libs/theme";
import React, { useContext } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface IRenderKitsChemicals {
  data?: any;
}
const { width, height } = Dimensions.get("window");
const RenderKitsChemicals: React.FC<IRenderKitsChemicals> = ({ data }) => {
  const I18n = useContext(LocalizationContext);
  const country = getCountry();
  //Render Item Kits
  const renderKits = ({ item, index }: { item: any; index: number }) => {
    return (
      <Card>
        <TouchableOpacity
          onPress={() => {
            // navigate và params:item
            navigateTo("KitsAndChemicalsDetail", item);
          }}
        >
          <Box row>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
            />
            <Box
              style={{ paddingLeft: spacing.l }}
              flex
            >
              <Text bold>{item.name?.vi}</Text>
              <Box style={{ paddingTop: spacing.l }}>
                <Text fontSize="l">
                  {I18n.t("KIT_CHEMICALS.KITS_AND_CHEMICALS_AMOUNT")}:
                  {item.amount}
                </Text>
                <Text fontSize="l">
                  {I18n.t("KIT_CHEMICALS.KITS_AND_CHEMICALS_PRICE")}:{" "}
                   {formatMoney(item.price)} {country?.currency?.code}
                </Text>
                <Text fontSize="l">
                  {I18n.t("KIT_CHEMICALS.KITS_AND_CHEMICALS_MONEY")}:{" "}
                   {formatMoney(item.price)} {country?.currency?.code}
                </Text>
              </Box>
            </Box>
          </Box>
        </TouchableOpacity>
      </Card>
    );
  };
  return (
    <Box style={styles.container}>
      <FlatList
        testID="getKitAndChemicals"
        data={data}
        renderItem={renderKits}
        keyExtractor={(item, index) => `${item.toString()}-${index}`}
      />
    </Box>
  );
};

export default RenderKitsChemicals;

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.l,
  },
  image: {
    width: Math.round((2 * width) / 5),
    height: Math.round((2 * width) / 5),
    borderRadius: 10,
  },
});
