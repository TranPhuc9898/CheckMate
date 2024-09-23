import { Box, LottieView, Text } from "components";
import { colors } from "libs/theme";
import { FC } from "react";
import { statusStep, typeStep } from "screens/procedure-active-account/layout";
import styles from "../layout/styles";

interface IHeaderStep {
  status: string;
  permission: string;
  numberOfStep: number;
  showOnlyActiveAccount?: boolean;
}

const HeaderStep: FC<IHeaderStep> = ({ permission, status, numberOfStep, showOnlyActiveAccount }) => {
  if (showOnlyActiveAccount) {
    return null;
  }

  if (status === typeStep.pass) {
    return (
      <Box center>
        <Box
          center
          style={[
            styles.containerHeader,
            {
              backgroundColor: colors.white,
            },
          ]}
        >
          <LottieView
            source={require("assets/lottie/tick.json")}
            style={styles.lottieTick}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box center>
      <Box
        center
        style={[
          styles.containerHeader,
          {
            backgroundColor:
              permission === statusStep.open ? colors.primary : colors.grey4,
          },
        ]}
      >
        <Text
          center
          variant="h2"
          color={permission === statusStep.open ? "white" : "grey2"}
        >
          {numberOfStep}
        </Text>
      </Box>
    </Box>
  );
};
export default HeaderStep;
