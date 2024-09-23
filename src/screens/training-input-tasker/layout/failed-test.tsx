import * as React from "react";
import { Box, Button, Image, Text } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import styles from "./styles";
import { callSupport, getIsoCodeGlobal } from "libs/helper";
import { store } from "redux/store";
import { phoneSupportRecruitment } from "libs/config";

interface FaildTestProps {}

const FailedTest = (props: FaildTestProps) => {
  const I18n = React.useContext(LocalizationContext);
  // Get phone number from setting system
  const taskerSupportPhone = store.getState().app?.settingSystem?.supports?.phoneRecruitment || phoneSupportRecruitment[getIsoCodeGlobal()];
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
          {I18n.t("TRAINING_INPUT.FAILD")}
        </Text>
      </Box>
      <Button
        onPress={() => callSupport(taskerSupportPhone)}
        title={I18n.t("DIALOG.BUTTON_CALL_SUPPORT")}
      />
    </Box>
  );
};

export default FailedTest;
