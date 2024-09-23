/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-21 11:24:47
 * @modify date 2022-10-21 11:24:47
 * @desc [Render footer button task confirmed]
 */
import { Alert, Box, Icon, Text } from "@src/components";
import { colors, spacing } from "libs/theme";
import { FC, useContext } from "react";
import ContentModalCall from "screens/task-detail/layout/components/content-modal-call";
import ButtonFAQ from "screens/task-detail/layout/components/button-faq";
import styles from "screens/task-detail/layout/styles";
import { IFooterButtonLaundry } from ".";
import { getUserIdGlobal } from "libs/helper";
import { TouchableOpacity } from "react-native";
import { LocalizationContext } from "libs/context";
import { statusTask } from "libs/config";

import ButtonTaskWaitCollect from "./task-wait-collect";
import ButtonTaskWaitReturn from "./task-wait-return";

const ButtonTaskConfirmed: FC<IFooterButtonLaundry> = (props) => {
  const {
    navigation,
    openModalCancelTask,
    taskId,
    detail,
    phone,
    acceptedTasker,
  } = props;
  const I18n = useContext(LocalizationContext);

  const myTask = acceptedTasker?.find(
    (tasker) =>
      tasker?.taskerId === getUserIdGlobal() ||
      tasker?.companyId === getUserIdGlobal()
  );
  const isShowCallAsker = Boolean(myTask);

  // Chỉ những user thoả điều kiện mới có thể chat và huỷ việc
  const isShowCancel = (() => {
    // Đã nhận đồ rồi thì không được phép huỷ việc
    if (detail?.isReceived) return false;

    // Trường hợp Tasker bình thường nhận việc, không có company
    if (myTask && !myTask?.companyId) return true;

    // Đối với task được nhận bởi company thì chỉ có company mới có thể cancel task
    if (myTask?.companyId === getUserIdGlobal()) return true;

    return false;
  })();

  // Chỉ những user thoả điều kiện mới có thể chat
  const isShowChat = (() => {
    // Trường hợp Tasker bình thường nhận việc, không có company
    if (myTask && !myTask?.companyId) return true;

    // Đối với task được nhận bởi company thì chỉ có company mới có thể chat với khách hàng
    if (myTask?.companyId === getUserIdGlobal()) return true;

    return false;
  })();

  const _onCall = () => {
    return Alert.alert.open({
      title: "TASK_DETAIL.TITLE_MODAL_CALL",
      message: <ContentModalCall phone={phone} />,
      actions: null,
    });
  };

  const _onChat = () => {
    navigation.navigate("Chat", { taskId: taskId });
  };

  // Define list option
  const option = [
    {
      title: "TASK_DETAIL.BUTTON_CHAT",
      icon: "chat",
      onPress: _onChat,
      backgroundColor: colors.secondary,
      color: "white",
      isShow: isShowChat,
    },
    {
      title: "TASK_DETAIL.BUTTON_CALL",
      icon: "call",
      onPress: _onCall,
      backgroundColor: colors.secondary,
      color: "white",
      isShow: Boolean(isShowCallAsker),
    },
    {
      title: "TASK_DETAIL.BUTTON_CANCEL",
      icon: "cancel",
      onPress: openModalCancelTask,
      backgroundColor: colors.white,
      color: "secondary",
      isShow: isShowCancel,
    },
  ];

  // Render item button
  const _ItemButtonOption = ({
    title,
    icon,
    onPress,
    backgroundColor,
    color,
    isShow,
  }) => {
    if (isShow) {
      return (
        <TouchableOpacity
          testID={"btn_" + icon}
          key={title}
          style={[
            styles.btnOptionFooter,
            { backgroundColor: backgroundColor, borderColor: colors[color] },
          ]}
          onPress={onPress}
        >
          <Box center>
            <Icon
              name={icon}
              color={color}
              size="l"
            />
            <Text
              bold
              center
              style={{ color: colors[color], paddingTop: spacing.m }}
              fontSize="m"
            >
              {I18n.t(title)}
            </Text>
          </Box>
        </TouchableOpacity>
      );
    }
  };

  return (
    <Box flex>
      {/* FAQ */}
      <ButtonFAQ status={statusTask.confirmed} />
      {/* End FAQ */}

      {/* Option */}
      <Box
        row
        style={styles.containerOption}
      >
        {option.map((item) => _ItemButtonOption(item))}
      </Box>
      {/* End option */}

      {/* Button with draw from task */}
      {detail?.isReceived ? (
        <ButtonTaskWaitReturn
          taskId={taskId}
          navigation={navigation}
        />
      ) : (
        <ButtonTaskWaitCollect
          taskId={taskId}
          detail={detail}
          navigation={navigation}
        />
      )}
      {/* End button with draw from task */}
    </Box>
  );
};

export default ButtonTaskConfirmed;
