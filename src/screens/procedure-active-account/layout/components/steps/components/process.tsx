import { colors } from "libs/theme";
import styles from "../layout/styles";
import { FC, useContext } from "react";
import { Box, Text } from "components";
import { LocalizationContext } from "libs/context";
import { statusStep, typeStep } from "screens/procedure-active-account/layout";

interface IProcess {
  status: string;
  permission: string;
  percent: number;
  currentStep: number;
  totalStep: number;
}

const Process: FC<IProcess> = ({ percent, status, permission, currentStep, totalStep }) => {
  const I18n = useContext(LocalizationContext);

  const _checkColor = (colorsDefault: any) => {
    if (status === typeStep.pass) {
      return "success";
    }
    if (permission === statusStep.open) {
      return "primary";
    }
    return colorsDefault;
  }

  return (
    <Box
      flex
      style={styles.boxContent}
    >
      <Box
        row
        between
      >
        <Text
          fontSize="m"
          fontWeight="m"
          color={permission === statusStep.open ? "black" : "grey1"}
        >
          {I18n.t("PROCEDURE_ACTIVE_ACCOUNT.TEXT_SUCCESS")}{" "}
          <Text
            fontSize="m"
            fontWeight="m"
            color={_checkColor("grey1")}
          >
            {percent || 0}%
          </Text>
        </Text>
        <Text
          fontSize="m"
          fontWeight="m"
          color={_checkColor("grey1")}
        >
          {currentStep}{" "}
          <Text
            fontWeight="m"
            fontSize="m"
            color="grey2"
          >
            /{totalStep}
          </Text>
        </Text>
      </Box>
      <Box
        style={[
          styles.lineBackground,
          {
            backgroundColor:
              permission === statusStep.open ? colors.primary3 : colors.grey2,
          },
        ]}
      >
        <Box
          style={[
            styles.lineProcess,
            {
              width: percent + "%" || 0,
              backgroundColor: colors[_checkColor("primary3")],
            },
          ]}
        />
      </Box>
    </Box>
  );
};
export default Process;
