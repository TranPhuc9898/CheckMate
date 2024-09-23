import { Box, Divider, Icon, Text } from "components";
import { colors } from "libs/theme";
import styles from "../styles";
import { useContext } from "react";
import { LocalizationContext } from "libs/context";
import { services, statusTask } from "libs/config";
import _ from "lodash";
const SERVICES_SHOW_NUMBER_OF_TASKER  = [services.deepCleaning];

interface INumberTaskerAcceptedTask {
  detail?: any
  status: string;
  acceptedTasker?: any;
  serviceName: string;
}

const NumberTaskerAcceptedTask = ({
  status,
  detail,
  acceptedTasker = [],
  serviceName
}: INumberTaskerAcceptedTask) => {
  const I18n = useContext(LocalizationContext);

  // Nếu là task có thể có nhiều người làm cùng 1 lúc thì hiển thị số người nhận khi task posted và waiting
  // Nếu là task bình thường, chỉ hiển thị số người nhận khi task waiting
  if ((_.isEmpty(acceptedTasker) || status !== statusTask.waiting) && (SERVICES_SHOW_NUMBER_OF_TASKER.indexOf(serviceName) < 0 || status === statusTask.confirmed)) {
    return null;
  }

  // Hiển thị số người đang nhận công việc
  const _renderNumberOfTasker = () => {
    // Kiểm tra nếu có số người nhận việc nhiều hơn 1
    const numberOfTasker = detail?.numberOfTaskersDeepCleaning || detail?.numberOfTaskers;
    if (numberOfTasker) {
      return (
        <Text bold>{acceptedTasker.length}/{numberOfTasker}</Text>
      )
    }
    // Nếu không có thì hiển thị số người đang chờ
    return (
      <Text bold>{acceptedTasker.length}</Text>
    )
  };

  return (
    <Box style={styles.marginTopLarge}>
      <Divider color={colors.grey0} />
      <Box
        row
        alignCenter
        style={styles.containerRequirement}
      >
        <Icon
          name={"diner"}
          color="secondary"
        />
        <Box
          flex
          style={styles.boxContent}
        >
          <Text
            testID="numberOfTaskers"
            numberOfLines={1}
          >
            {I18n.t("TASK_DETAIL.NUMBER_ACCEPTED_TASK")}
            {_renderNumberOfTasker()}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
export default NumberTaskerAcceptedTask;
