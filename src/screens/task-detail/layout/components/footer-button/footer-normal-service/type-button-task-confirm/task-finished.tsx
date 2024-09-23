/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-25 13:49:20
 * @modify date 2022-10-25 13:49:20
 * @desc [Render button]
 */

import React, { FC } from "react";
import { Button, Text } from "@src/components";
import { borderRadius, colors } from "libs/theme";
import doneTaskAPI, { IParamDoneTask } from "apis/tasks/done-task";
import { setLoading } from "redux/slice/app-slice";
import { getUserIdGlobal, handleError, IRespond } from "libs/helper";
import { LocalizationContext } from "libs/context";
import { store } from "redux/store";
import styles from "screens/task-detail/layout/styles";
interface IButtonTaskFinished {
  taskId: string;
  navigation: any;
}

const ButtonTaskFinished: FC<IButtonTaskFinished> = ({
  taskId,
  navigation,
}) => {
  const I18n = React.useContext(LocalizationContext);

  // Func done task
  const _onDoneTask = async () => {
    // Init param doneTask
    const param: IParamDoneTask = {
      taskId: taskId,
      userId: getUserIdGlobal(),
    };
    // Show loading
    await store.dispatch(setLoading(true));
    // Call api done task
    const result: IRespond = await doneTaskAPI(param);
    // Show loading
    await store.dispatch(setLoading(false));
    // Success
    if (result?.isSuccess) {
      return navigation.popToTop();
    }
    // Throw error
    return handleError(result?.error);
  };

  return (
    <Button
      testID="btnDoneTask"
      size="lg"
      buttonStyle={styles.containerBtnDone}
      onPress={_onDoneTask}
    >
      <Text
        bold
        color="white"
      >
        {I18n.t("TASK_DETAIL.FINISH").toUpperCase()}
      </Text>
    </Button>
  );
};

export default ButtonTaskFinished;
