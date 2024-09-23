import { useContext } from "react";
import { LocalizationContext } from "@src/libs/context";
import { Box, Text } from "@src/components";
import { FC } from "react";
import styles from "../styles";
import { IObjectText } from "libs/helper";
export interface IStatusCancelTask {
  cancelBy: IObjectText;
}
const StatusCancelTask: FC<IStatusCancelTask> = ({ cancelBy }) => {
  const I18n = useContext(LocalizationContext);

  if (!cancelBy) {
    return null;
  }
  return (
    <Box style={styles.boxCancel}>
      <Text
        fontSize="s"
        color="secondary"
        bold
      >
        {I18n.t("TASK_DETAIL.CANCELED")}
      </Text>
    </Box>
  );
};

export default StatusCancelTask;
