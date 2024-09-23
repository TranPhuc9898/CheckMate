import * as React from "react";
import _ from "lodash";

import { LocalizationContext } from "@src/libs/context";
import { Box, Card, Text, Image } from "@src/components";
import styles from "./styles";

interface ItemProps {}

const CommingSoon = (props: ItemProps) => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <Card flex>
      <Box flex center>
        <Image style={styles.comingSoon} source={require("assets/images/force.png")}/>
        <Text>{I18n.t("TOPUP.COMING_SOON")}</Text>
      </Box>
    </Card>
  );
};

export default CommingSoon;
