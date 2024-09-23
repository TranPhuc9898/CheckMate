/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-15 10:26:24
 * @modify date 2022-10-15 10:26:24
 * @desc [Render button task posted]
 */

import { Alert, SwipeButton } from "@src/components";
import { statusTask } from "libs/config";
import { LocalizationContext } from "libs/context";
import { acceptTask } from "libs/helper";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import { store } from "redux/store";
import { resetLazyLoadState } from "screens/tab-home-new-tasks/slice";

interface IButtonTaskPosted {
  taskId: string;
  navigation: any;
  date?: any
}

const ButtonTaskPosted: FC<IButtonTaskPosted> = ({
  taskId,
  navigation,
  date,
}) => {
  const I18n = React.useContext(LocalizationContext);
  const { user } = useSelector((state: RootState) => state.app);

  /**
   * Nhận việc công ty và cá nhân
   * - Nếu là công ty -> truyền thêm Id nhân viên vào
   */
  const _onAcceptTask = async (employeeId?: string) => {
    // Call api accept task
    const result = await acceptTask(taskId, employeeId, () => {
      navigation.popToTop();
    });

    // Check accept task false
    if (!result) {
      return;
    }

    // If task auto choose tasker navigate to Chat
    if (result?.status === statusTask.confirmed) {
      // delete objectAlert.actions;
      // objectAlert.onClosed = () => {
      store.dispatch(resetLazyLoadState());
      // };
      navigation.popToTop();
      navigation.navigate("TabHome", {
        screen: "TabMyTask",
        params: { dateOfFilter: date },
      });
      navigation.navigate("Chat", { taskId: taskId });
      return;
      // objectAlert.message = [{ text: "TASK_DETAIL.ACCEPTED_SUCCESS" }];
    }
    // If task have option chooseTasker navigate
    const objectAlert = {
      title: "DIALOG.TITLE_INFORMATION",
      message: [{ text: "TASK_DETAIL.ACCEPTED_TASK_WAITING_SUCCESS" }],
      actions: [
        {
          testID: "btnClose",
          text: "DIALOG.BUTTON_CLOSE",
        },
      ],
      onClosed: () => {
        store.dispatch(resetLazyLoadState());
        navigation.popToTop();
        navigation.navigate("TabHome", {
          screen: "TabNewTask",
        });
      },
    };
    return Alert.alert.open(objectAlert, true);
  };

  /**
   * Điều hướng qua trang phân việc hoặc nhận việc luôn
   */
  const _handleAcceptTask = async () => {
    // Kiểm tra user là Quản lý và không phải nhân viên => Tới trang phân việc
    if (user?.isCompany && !user?.isEmployee) {
      return navigation.navigate("AssignedToEmployees", {
        onAcceptTask: _onAcceptTask,
      });
    }
    // Nhận việc
    return _onAcceptTask();
  };

  return (
    <SwipeButton
      title={I18n.t("TASK_DETAIL.BUTTON_SLIDE_TO_CONFIRM")}
      onSwipeSuccess={_handleAcceptTask}
    />
  );
};

export default ButtonTaskPosted;
