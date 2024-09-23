import { useContext } from "react";
import { Box, Card, Icon, Text, Image } from "@src/components";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import _ from "lodash";

const BRewardsearch = ({}) => {
  const I18n = useContext(LocalizationContext);

  return (
    <Box center style={styles.containerEmptyData}>
      <Image source={require("assets/images/benefit/search-empty.png")} />
      <Text style = {styles.txtNoteEmptyData}>{I18n.t("BREWARD.SEARCH")}</Text>
    </Box>
  );
};

export default BRewardsearch;
