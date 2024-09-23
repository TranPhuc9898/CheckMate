import React, {
  FunctionComponent,
  ComponentProps,
  useEffect,
  useState,
  useContext,
} from "react";
import { TouchableOpacity, View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { useIsFocused } from "@react-navigation/native";
import {
  Card,
  Box,
  Text,
  PriceItem,
  Button,
  Icon,
  Alert,
  SelectWeek,
} from "@src/components";
import { getTaskerReportAPI } from "apis/user";
import { getCurrency, IRespond, handleError } from "libs/helper";
import styles from "./styles";
import GoodReview from "../good-review";
import BadReview from "../bad-review";
import moment from "moment";

interface IReportDetail extends ComponentProps<typeof View> {
  navigation?: any;
  setLoading?: (isloading: boolean) => void;
}

const ReportDetailScreen: FunctionComponent<IReportDetail> = ({
  navigation,
  setLoading,
}) => {
  const I18n = useContext(LocalizationContext);
  const isFocused = useIsFocused();
  const defaulFromDate = moment().subtract(1, "week").startOf("isoWeek");
  const [incomeThisWeek, setIncomeThisWeek] = useState(0);
  const [tasksThisWeek, setTasksThisWeek] = useState(0);
  const [totalGoodRating, setTotalGoodRating] = useState(0);
  const [totalBadRating, setTotalBadRating] = useState(0);
  const [compareBadRating, setCompareBadRating] = useState(0);
  const [compareGoodRating, setCompareGoodRating] = useState(0);
  const [goodRating, setGoodRating] = useState([]);
  const [badRating, setBadRating] = useState([]);
  const [fromDate, setFromDate] = useState(defaulFromDate);
  const currency = getCurrency();

  const getTaskerReport = async (_fromDate = fromDate) => {
    setLoading(true);
    const respond: IRespond = await getTaskerReportAPI({ fromDate: _fromDate });
    setLoading(false);
    if (respond.isSuccess) {
      setIncomeThisWeek(respond?.data?.totalIncome || 0);
      setTasksThisWeek(respond?.data?.totalTaskDone || 0);
      setTotalBadRating(respond?.data?.totalBadRating || 0);
      setTotalGoodRating(respond?.data?.totalGoodRating || 0);
      setCompareBadRating(respond?.data?.compareBadRating || 0);
      setCompareGoodRating(respond?.data?.compareGoodRating || 0);
      setGoodRating(respond?.data?.goodRating?.review || []);
      setBadRating(respond?.data?.badRating?.review || []);
    } else {
      // Show lỗi và goBack khi onClosed Alert
      const onClosed = () => navigation.goBack();
      handleError(respond?.error, onClosed);
    }
  };

  const selectWeek = (_fromDate: any) => {
    setFromDate(_fromDate);
    getTaskerReport(_fromDate);
  };

  const compareRating = (compare) => {
    if (compare < 0) {
      return I18n.t("TAB_ACCOUNT.DECREASE_TASK", { task: Math.abs(compare) });
    }
    if (compare > 0) {
      return I18n.t("TAB_ACCOUNT.INCREASE_TASK", { task: compare });
    }
    return null;
  };

  useEffect(() => {
    getTaskerReport();
  }, []);

  return (
    <Box>
      <Card>
        <SelectWeek onSelectWeek={(_fromDate) => selectWeek(_fromDate)} />
        <Box style={styles.boxContainer}>
          <Box
            row
            center
            style={styles.boxIteam}
          >
            <Text>{I18n.t("TAB_ACCOUNT.COMPLETED_TASK")}</Text>
            <Box
              row
              center
            >
              <Text
                testID="taskSelectWeek"
                style={styles.priceStyle}
              >
                {tasksThisWeek}
              </Text>
              <Text
                style={styles.textTask}
                fontSize="s"
              >
                {I18n.t("TAB_ACCOUNT.TASK")}
              </Text>
            </Box>
          </Box>
          <Box
            row
            center
            style={styles.boxIteam}
          >
            <Text>{I18n.t("TAB_ACCOUNT.INCOME_THIS_WEEK")}</Text>
            <PriceItem
              cost={incomeThisWeek}
              testID={"incomeSelectWeek"}
              priceStyle={styles.priceStyle}
            />
          </Box>
        </Box>
        <Box style={styles.boxRating}>
          <Box
            row
            center
            style={styles.boxIteam}
          >
            <Text>5 {I18n.t("TAB_ACCOUNT.STAR")}</Text>
            <Box
              row
              center
            >
              <Text
                testID="totalGoodRating"
                style={styles.priceStyle}
              >
                {totalGoodRating}
              </Text>
              <Text
                style={styles.textTask}
                fontSize="s"
              >
                {I18n.t("TAB_ACCOUNT.TASK")}
              </Text>
            </Box>
          </Box>
          {compareRating(compareGoodRating) ? (
            <Text
              color="primary"
              bold
            >
              {compareRating(compareGoodRating)}
            </Text>
          ) : null}

          <Box
            row
            center
            style={styles.boxBlowRating}
          >
            <Text>{I18n.t("TAB_ACCOUNT.BELOW")}</Text>
            <Box
              row
              center
            >
              <Text
                testID="totalBadRating"
                style={styles.priceStyle}
              >
                {totalBadRating}
              </Text>
              <Text
                style={styles.textTask}
                fontSize="s"
              >
                {I18n.t("TAB_ACCOUNT.TASK")}
              </Text>
            </Box>
          </Box>
          {compareRating(compareBadRating) ? (
            <Text
              color="primary"
              bold
            >
              {compareRating(compareBadRating)}
            </Text>
          ) : null}
        </Box>
      </Card>
      <GoodReview goodRating={goodRating} />
      <BadReview badRating={badRating} />
    </Box>
  );
};

export default ReportDetailScreen;
