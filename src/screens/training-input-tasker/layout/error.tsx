import * as React from "react";
import { Box, Button, Image, Text } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import styles from "./styles";

interface InstructionTrainingInputProps {
  reload?: () => void;
}

const InstructionTrainingInput = (props: InstructionTrainingInputProps) => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <Box
      flex
      style={styles.boxButton}
    >
      <Box
        flex
        center
      >
        <Image
          source={require("@src/assets/images/task/warning-task.png")}
          style={styles.imageError}
        />
        <Text
          center
          style={styles.txtInstruction}
        >
          {I18n.t("TRAINING_INPUT.ERROR")}
        </Text>
      </Box>
      <Button
        onPress={() => props.reload()}
        title={I18n.t("TRAINING_INPUT.RELOAD")}
      />
    </Box>
  );
};

export default InstructionTrainingInput;
