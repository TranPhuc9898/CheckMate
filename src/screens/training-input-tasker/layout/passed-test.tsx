import { Box, Button, Card, Container, Image, Text } from "components";
import { LocalizationContext } from "libs/context";
import { popToTop } from "libs/helper";
import { useContext } from "react";
import styles from "./styles";

const PassedTest = () => {
  const I18n = useContext(LocalizationContext);

  return (
    <Container>
      <Card flex>
        <Box flex center>
          <Image
            source={require("assets/images/training/pass.png")}
            style={styles.backgroundProfile}
          />
          <Text style={styles.text}>{I18n.t("TRAINING_INPUT.FINISH_TEST_SUCCESS")}</Text>
        </Box>
        <Button
          title={I18n.t("DIALOG.BUTTON_CLOSE")}
          onPress={popToTop}
        />
      </Card>
    </Container>
  );
};

export default PassedTest;
