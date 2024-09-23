/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-21 11:24:47
 * @modify date 2022-10-21 11:24:47
 * @desc [Render footer button task confirmed]
 */
import { Alert, Box, Icon, Text } from "@src/components";
import styles from "../../../styles";
import ButtonFAQ from "../../button-faq";
import { colors, spacing } from "libs/theme";
import ActionButtonTaskConfirmed from "./type-button-task-confirm";
import ContentModalCall from "../../content-modal-call";
import { FC, useContext } from "react";
import { LocalizationContext } from "libs/context";
import { TouchableOpacity } from "react-native";
import { services, statusTask } from "libs/config";

interface IButtonTaskConfirmed {
  date: Date;
  phone: string;
  taskId: string;
  navigation: any;
  duration: number;
  isStarted: boolean;
  isMember?: boolean;
  serviceName: string;
  isEmployee?: boolean;
  openModalCancelTask: () => void;
}

const ButtonTaskConfirmed: FC<IButtonTaskConfirmed> = ({
  date,
  phone,
  taskId,
  duration,
  isMember,
  isStarted,
  isEmployee,
  navigation,
  serviceName,
  openModalCancelTask,
}) => {
  const I18n = useContext(LocalizationContext);

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

  // Chỉ những user thoả điều kiện mới có thể chat
  // const isShowChat = (() => {
  //   if (isMember) {
  //     return false;
  //   }
  //   return true;
  // })();

  // Chỉ những user thoả điều kiện mới có thể call cho KH
  // const isShowCallAsker = (() => {
  //   if (isMember) {
  //     return false;
  //   }
  //   return true;
  // })();

  // Define list option
  const option = [
    {
      title: "TASK_DETAIL.BUTTON_CHAT",
      icon: "chat",
      onPress: _onChat,
      backgroundColor: colors.secondary,
      color: "white",
      isShow: !isMember,
    },
    {
      title: "TASK_DETAIL.BUTTON_CALL",
      icon: "call",
      onPress: _onCall,
      backgroundColor: colors.secondary,
      color: "white",
      isShow: !isMember,
    },
    {
      title: "TASK_DETAIL.BUTTON_CANCEL",
      icon: "cancel",
      onPress: openModalCancelTask,
      backgroundColor: colors.white,
      color: "secondary",
      isShow: !isMember,
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
      <ActionButtonTaskConfirmed
        taskId={taskId}
        date={date}
        isStarted={isStarted}
        duration={duration}
        navigation={navigation}
      />
      {/* End button with draw from task */}
    </Box>
  );
};

export default ButtonTaskConfirmed;
