import * as React from "react";
import { Box, Button, Alert, Text } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import styles from "./styles";

interface InstructionTrainingInputProps {
  content?: string;
  onStart?: () => void;
}

const InstructionTrainingInput = (props: InstructionTrainingInputProps) => {
  const I18n = React.useContext(LocalizationContext);

  const _onStart = () => {
    Alert.alert.open({
      message: "TRAINING_INPUT.ACCEPT_TEST_CONFIRMATION",
      actions: [
        {
          testID: "btnConfirmStartTraining",
          text: "DIALOG.BUTTON_ACCEPT",
          style: "ok",
          onPress: () => {
            Alert.alert.close();
            props.onStart();
          },
        },
        {
          text: "DIALOG.BUTTON_CLOSE",
          style: "cancel",
        },
      ],
    });
  };

  return (
    <Box
      flex
      style={styles.boxButton}
    >
      <Box flex>
        <Text
          center
          variant="h3"
          color="primary"
        >
          {props.content}
        </Text>
        <Text style={styles.txtInstruction}>
          {I18n.t("TRAINING_INPUT.INSTRUCTION_PASS_TEST")}
        </Text>
      </Box>
      <Box>
        <Button
          testID="btnStartTraining"
          onPress={() => _onStart()}
          title={I18n.t("TRAINING_INPUT.START")}
        />
      </Box>
    </Box>
  );
};

export default InstructionTrainingInput;
