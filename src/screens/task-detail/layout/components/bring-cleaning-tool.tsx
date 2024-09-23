/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show list cleaning tools]
 */

import { FC, useContext } from "react";
import { Alert, Box, Button, Icon, Text } from "@src/components";
import styles from "../styles";
import { LocalizationContext } from "libs/context";
import { getTextWithLocale, IObjectText } from "libs/helper";
import { isEmpty } from "lodash";

interface IBringCleaningTool {
  listOfToolsForTasker?: IObjectText;
}

const BringCleaningTool: FC<IBringCleaningTool> = ({
  listOfToolsForTasker,
}) => {
  const I18n = useContext(LocalizationContext);

  // Không có danh sách dụng cụ cần mang theo thì khôgn hiển thị
  if (isEmpty(listOfToolsForTasker)) {
    return null;
  }

  const listTool = getTextWithLocale(listOfToolsForTasker).split(";");
  const _openModal = () => {
    Alert.alert.open({
      title: "TASK_DETAIL.TITLE_LIST_CLEANING_TOOL",
      message: (
        <Box>
          {listTool.map((e, index) => (
            <Text key={index}>- {e}</Text>
          ))}
        </Box>
      ),
    });
  };

  return (
    <Box
      row
      alignCenter
      style={styles.lineMarginTop}
    >
      <Box
        row
        alignCenter
      >
        <Icon
          name="bringTools"
          color="secondary"
        />
      </Box>
      <Box
        flex
        style={styles.btnDetail}
      >
        <Text>{I18n.t("TASK_DETAIL.REQUIREMENTS_BRING_TO_TOOLS")}</Text>
      </Box>
      <Button
        size="sm"
        onPress={_openModal}
      >
        <Text
          bold
          fontSize="m"
          color="white"
          style={styles.btnDetail}
        >
          {I18n.t("TASK_DETAIL.BUTTON_SEE_LIST")}
        </Text>
      </Button>
    </Box>
  );
};

export default BringCleaningTool;
