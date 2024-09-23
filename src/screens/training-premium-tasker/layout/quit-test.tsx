import * as React from "react";
import { Box, Button } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import styles from "./styles";

interface QuitTestProps {
  quitTest?: () => void;
}

const QuitTest = (props: QuitTestProps) => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <Box
      row
      style={styles.boxButtonQuit}
    >
      <Button
        testID="btnQuitTest"
        onPress={() => props.quitTest()}
        title={I18n.t("TRAINING_INPUT.QUIT_TEST")}
        size="sm"
      />
    </Box>
  );
};

export default QuitTest;
