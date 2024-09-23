/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-15 10:26:24
 * @modify date 2022-10-15 10:26:24
 * @desc [Render button task waiting asker confirm]
 */

import React, { FC } from "react";
import { Alert, Box, Button, Icon, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import ButtonFAQ from "../../button-faq";
import { setLoading } from "redux/slice/app-slice";
import { getUserIdGlobal, handleError, IRespond } from "libs/helper";
import drawTaskAPI, { IParamsDrawTask } from "apis/tasks/draw-task";
import ButtonTaskPosted from "./task-posted";
import { store } from "redux/store";
import { resetLazyLoadState } from "screens/tab-home-new-tasks/slice";
import { statusTask } from "libs/config";
import { spacing } from "libs/theme";
const SIZE_ICON = 60;
interface IButtonTaskWaiting {
  taskId: string;
  navigation: any;
  acceptedTasker?: any;
}

const ButtonTaskWaiting: FC<IButtonTaskWaiting> = ({
  taskId,
  navigation,
  acceptedTasker,
}) => {
  const I18n = React.useContext(LocalizationContext);
  const userIdGlobal = getUserIdGlobal();

  const isMyTask = Boolean(
    acceptedTasker?.find(
      (tasker) =>
        tasker?.taskerId === userIdGlobal || tasker?.companyId === userIdGlobal
    )
  );

  // Handle draw task
  const _onDrawTask = async () => {
    // Init param drawTask
    const params: IParamsDrawTask = {
      taskId: taskId,
      userId: userIdGlobal,
    };
    // Show loading
    await store.dispatch(setLoading(true));
    // Call api get cancel policy
    const result: IRespond = await drawTaskAPI(params);
    // Hide loading
    await store.dispatch(setLoading(false));
    if (!result.isSuccess) {
      return handleError(result?.error);
    }
    // Save data to state
    return Alert.alert.open({
      title: "DIALOG.TITLE_INFORMATION",
      message: (
        <Box
          testID="drawTaskSuccess"
          center
        >
          <Text>{I18n.t("TASK_DETAIL.DESCRIPTION_CANCEL_TASK")}</Text>
        </Box>
      ),
      actions: [
        {
          testID: "btnClose",
          text: "DIALOG.BUTTON_CLOSE",
          type: "close",
        },
      ],
      onClosed: () => {
        store.dispatch(resetLazyLoadState());
        navigation.popToTop();
      },
    });
  };

  // Show alert confirm
  const _onWithdrawTask = () => {
    Alert.alert.open({
      title: "TASK_DETAIL.WITHDRAW_TASK",
      message: (
        <Box>
          <Text>{I18n.t("TASK_DETAIL.MESSAGE_ALERT_FAQ_WAITING")}</Text>
          <Box style={{ paddingTop: spacing.m }}>
            <Text>{I18n.t("TASK_DETAIL.POP_UP_DRAW_TASK_TXT")}</Text>
          </Box>
        </Box>
      ),
      actions: [
        {
          text: "DIALOG.BUTTON_ACCEPT",
          onPress: _onDrawTask,
          style: "cancel",
          testID: "btnConfirmDrawTask",
        },
        {
          text: "DIALOG.BUTTON_CLOSE",
          style: "ok",
        },
      ],
    });
  };

  if (!isMyTask) {
    return (
      <ButtonTaskPosted
        taskId={taskId}
        navigation={navigation}
      />
    );
  }
  return (
    <>
      {/* FAQ */}
      <ButtonFAQ status={statusTask.waiting} />
      {/* End FAQ */}

      {/* Button with draw from task */}
      <Button
        testID="btnDrawTask"
        size="lg"
        title={I18n.t("TASK_DETAIL.WITHDRAW_TASK")}
        onPress={_onWithdrawTask}
      />
      {/* End button with draw from task */}
    </>
  );
};

export default ButtonTaskWaiting;
