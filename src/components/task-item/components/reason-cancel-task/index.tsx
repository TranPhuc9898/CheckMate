import { useContext } from "react";
import { LocalizationContext } from "@src/libs/context";
import { Box, Text } from "@src/components";
import { getTextWithLocale, IObjectText } from "libs/helper";
import { FC } from "react";
import styles from "../styles";
export interface IReasonCancelTask {
  cancelBy: IObjectText;
  reason: any;
}

const ReasonCancelTask: FC<IReasonCancelTask> = ({ cancelBy, reason }) => {
  const I18n = useContext(LocalizationContext);

  if (!cancelBy) {
    return null;
  }

  const _renderReason = () => {
    if (!reason) {
      return null;
    }
    return (
      <Box row>
        <Text fontSize="m">
          {I18n.t("TASK_DETAIL.CANCELED_REASON")}
          {": "}
        </Text>
        <Text fontSize="m">{getTextWithLocale(reason)}</Text>
      </Box>
    );
  };

  return (
    <Box>
      <Box style={styles.bottomCancel}>
        <Text fontSize="m">{getTextWithLocale(cancelBy)}</Text>
        {_renderReason()}
      </Box>
    </Box>
  );
};

export default ReasonCancelTask;
