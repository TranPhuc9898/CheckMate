/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show list task]
 */

import { FC, useContext } from "react";
import { Alert, Box, Button, Icon, Text } from "@src/components";
import styles from "../styles";
import { LocalizationContext } from "libs/context";
import {
  capitalizedFirstStr,
  getLocaleGlobal,
  getTextWithLocale,
} from "libs/helper";
import { isEmpty } from "lodash";

interface IListTask {
  overviews?: any;
  details?: any;
}

const ListTask: FC<IListTask> = ({ overviews, details }) => {
  const I18n = useContext(LocalizationContext);

  const overview = overviews.find((e) => e.name === getLocaleGlobal()) || [];

  const _openModal = () => {
    Alert.alert.open({
      title: "TASK_DETAIL.LIST_OF_TASK",
      message: (
        <Box>
          <Text bold>{I18n.t("TASK_DETAIL.OVERVIEW")}</Text>
          <Box margin="s">
            {overview?.value?.map((e, index) => (
              <Text key={index}>- {e}</Text>
            ))}
          </Box>
          {details?.map((e, index) => (
            <Box key={index}>
              <Text bold>
                {capitalizedFirstStr(getTextWithLocale(e?.text))}
              </Text>
              <Box margin="s">
                <Text>- {getTextWithLocale(e?.workToDo[0])}</Text>
              </Box>
            </Box>
          ))}
        </Box>
      ),
    });
  };

  if (isEmpty(overviews) && isEmpty(details)) {
    return null;
  }

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
          name="listTask"
          color="secondary"
          size="l"
        />
      </Box>
      <Box
        flex
        style={styles.btnDetail}
      >
        <Text>{I18n.t("TASK_DETAIL.LIST_OF_TASK")}</Text>
      </Box>
      <Button
        size="sm"
        onPress={_openModal}
      >
        <Text
          color="white"
          bold
          fontSize="m"
          style={styles.btnDetail}
        >
          {I18n.t("TASK_DETAIL.BUTTON_SEE_LIST")}
        </Text>
      </Button>
    </Box>
  );
};

export default ListTask;
