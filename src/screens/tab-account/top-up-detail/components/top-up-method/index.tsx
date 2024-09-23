import React, {
  FunctionComponent,
  ComponentProps,
  useContext,
} from "react";
import { View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Card, Box, Icon, Text, Button } from "@src/components";
import styles from "./styles";

interface ITopUpMethod extends ComponentProps<typeof View> {
  navigation?: any;
}

const TopUpMethodScreen: FunctionComponent<ITopUpMethod> = ({navigation}) => {
  const I18n = useContext(LocalizationContext);
  return (
    <Card style={styles.boxContainer}>
      <Box margin="l">
        <Text
          fontSize="xl"
          bold
          color="primary"
        >
          {I18n.t("TOPUP.METHOD")}
        </Text>
      </Box>
      <Box row>
        <Box style={styles.boxMethod}>
          <Icon
            name="save"
            color="black"
          />
          <Text
            center
            style={styles.textMethod}
          >
            {I18n.t("TOPUP.SAVE_IMAGE")}
          </Text>
        </Box>
        <Box style={styles.boxIconNext}>
          <Icon
            size="m"
            name="right"
            color="black"
          />
        </Box>
        <Box style={styles.boxMethod}>
          <Icon
            name="phone"
            color="black"
          />
          <Text
            center
            style={styles.textMethod}
          >
            {I18n.t("TOPUP.OPEN_BANK_APP")}
          </Text>
        </Box>
        <Box style={styles.boxIconNext}>
          <Icon
            size="m"
            name="right"
            color="black"
          />
        </Box>
        <Box style={styles.boxMethod}>
          <Icon
            name="qrCode"
            color="black"
          />
          <Text
            center
            style={styles.textMethod}
          >
            {I18n.t("TOPUP.SCAN")}
          </Text>
        </Box>
        <Box style={styles.boxIconNext}>
          <Icon
            size="m"
            name="right"
            color="black"
          />
        </Box>
        <Box style={styles.boxMethod}>
          <Icon
            name="image"
            color="black"
          />
          <Text
            center
            style={styles.textMethod}
          >
            {I18n.t("TOPUP.SELECT_PHOTO")}
          </Text>
        </Box>
      </Box>
      <Button
        buttonStyle={styles.buttonStyle}
        color="primary"
        title={I18n.t("TOPUP.BUTTON_DONE")}
        onPress={() => navigation.pop(2)}
      />
    </Card>
  );
};

export default TopUpMethodScreen;
