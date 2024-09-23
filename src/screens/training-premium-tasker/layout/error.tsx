import * as React from "react";
import { Box, Button, Text } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import styles from "./styles";

interface InstructiontrainingPremiumProps {
  reload?: () => void;
}

const InstructiontrainingPremium = (props: InstructiontrainingPremiumProps) => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <Box
      flex
      style={styles.boxButton}
    >
      <Text style={styles.txtInstruction}>
        {I18n.t("TRAINING_INPUT.ERROR")}
      </Text>
      <Button
        onPress={() => props.reload()}
        title={I18n.t("TRAINING_INPUT.RELOAD")}
      />
    </Box>
  );
};

export default InstructiontrainingPremium;
