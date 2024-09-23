import {
  FunctionComponent,
  ComponentProps,
  useEffect,
  useState,
  useContext,
} from "react";
import { View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { CardItem, Box, Text, SelectMonth } from "@src/components";
import { getTaskHistoryAPI } from "apis/user";
import { IRespond, handleError } from "libs/helper";
import styles from "./styles";
import moment from "moment";
import _ from "lodash";
import TaskItem from "./components/task-item";

interface IReportDetail extends ComponentProps<typeof View> {
  navigation?: any;
  setLoading?: (isloading: boolean) => void;
}

const ReportDetailScreen: FunctionComponent<IReportDetail> = ({
  navigation,
  setLoading,
}) => {
  const I18n = useContext(LocalizationContext);
  const defaulFromDate = moment().startOf("month");
  const defaulToDate = moment().endOf("month");
  const [rangeDate, setRangeDate] = useState({
    fromDate: defaulFromDate,
    toDate: defaulToDate,
  });
  const [tasks, setTasks] = useState([]);

  // Get data
  const getTaskHistory = async (_rangeDate = rangeDate) => {
    setLoading(true);
    const respond: IRespond = await getTaskHistoryAPI(_rangeDate);
    setLoading(false);
    if (respond.isSuccess) {
      setTasks(respond?.data?.tasks || []);
    } else {
      // Show lỗi và goBack khi onClosed Alert
      const onClosed = () => navigation.goBack();
      handleError(respond?.error, onClosed);
    }
  };

  // Select month
  const onSelectMonth = (valueRangeDate: any) => {
    setRangeDate(valueRangeDate);
    getTaskHistory(valueRangeDate);
  };

  useEffect(() => {
    getTaskHistory();
  }, []);

  const _renderContent = () => {
    if (_.isEmpty(tasks)) {
      return (
        <Box
          center
          style={styles.boxEmptyData}
        >
          <Text fontSize="m">{I18n.t("TAB_ACCOUNT.EMPTY_TASK_IN_MONTH")}</Text>
        </Box>
      );
    }
    return tasks.map((item, index) => (
      <TaskItem
        key={"taskHistory_" + index}
        item={item}
        index={index}
      />
    ));
  };

  return (
    <CardItem
      style={styles.boxContainer}
      titleStyle={styles.titleStyle}
      title={I18n.t("TAB_ACCOUNT.TASK_HISTORY")}
    >
      {/* Header */}
      <Box style={styles.wrapHeader}>
        <SelectMonth onSelectMonth={onSelectMonth} />
      </Box>
      {/* End header */}

      {/* Content */}
      {_renderContent()}
      {/* Content */}
    </CardItem>
  );
};

export default ReportDetailScreen;
