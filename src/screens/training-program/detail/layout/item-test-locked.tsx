import * as React from "react";
import { LocalizationContext } from "@src/libs/context";
import { Box, Card, Text, Icon, Image } from "@src/components";
import styles from "./styles";

interface ItemProps {
  data: any;
}

const Item = ({ data }: ItemProps) => {
  const I18n = React.useContext(LocalizationContext);

  return (
    <Box>
      <Card>
        <Box row>
          <Box
            flex
            style={styles.leftContent}
          >
            <Box>
              <Text
                fontSize="xl"
                bold
                style={styles.txtLocked}
              >
                {I18n.t("TRAINING_INPUT.TEST")}
              </Text>
              <Text style={[styles.txtDescription, styles.txtLocked]}>
                {I18n.t("TRAINING_INPUT.TEST_DESCRIPTION")}
              </Text>
            </Box>
          </Box>
          <Box center>
            <Image
              style={styles.image}
              source={require("@src/assets/images/training/test.png")}
            />
          </Box>
        </Box>
      </Card>
      <Box
        center
        style={styles.lockContainer}
      >
        <Box
          center
          style={styles.wrapLock}
          testID="iconLock"
        >
          <Icon
            width={40}
            height={40}
            name="lock"
            color="grey0"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Item;
