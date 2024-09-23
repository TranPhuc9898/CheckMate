import React, {
  FunctionComponent,
  ComponentProps,
  useEffect,
  useState,
  useContext,
} from "react";
import { View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import {
  CardItem,
  Box,
  Text,
  PriceItem,
  TransitionView,
} from "@src/components";
import { getWeeklyReportAPI } from "apis/user";
import { getCurrency, IRespond } from "libs/helper";
import styles from "./styles";

interface IWeeklyReport extends ComponentProps<typeof View> {
  navigation?: any;
  user?: any;
  setLoading?: (isloading: boolean) => void;
}

const WeeklyReportScreen: FunctionComponent<IWeeklyReport> = ({
  navigation,
  setLoading,
  user,
}) => {
  const I18n = useContext(LocalizationContext);
  const [incomeThisWeek, setIncomeThisWeek] = useState(0);
  const [tasksThisWeek, setTasksThisWeek] = useState(0);
  const [isError, setIsError] = useState(false);
  const currency = getCurrency();

  const getWeeklyReport = async () => {
    setLoading(true);
    const respond: IRespond = await getWeeklyReportAPI();
    setLoading(false);
    if (respond.isSuccess) {
      setIncomeThisWeek(respond?.data?.totalIncome);
      setTasksThisWeek(respond?.data?.totalTaskDone);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    Boolean(!user?.isEmployee) && getWeeklyReport();
  }, [user?.isEmployee]);

  return (
    <TransitionView
      index={5}
      duration={1000}
    >
      <CardItem
        testID="WeeklyReport"
        iconName="right"
        title={I18n.t("TAB_ACCOUNT.WEEKLY_REPORT")}
        onPress={() => navigation.navigate("WeeklyReport")}
      >
        <Box
          row
          center
          style={styles.boxIteam}
        >
          <Text>{I18n.t("TAB_ACCOUNT.INCOME_THIS_WEEK")}</Text>
          <PriceItem
            loading={isError}
            testID="incomeThisWeek"
            cost={incomeThisWeek}
            priceStyle={styles.priceStyle}
          />
        </Box>
        <Box
          row
          center
          style={styles.boxIteam}
        >
          <Text>{I18n.t("TAB_ACCOUNT.COMPLETED_TASK")}</Text>
          <Text
            testID="tasksThisWeek"
            style={styles.priceStyle}
          >
            {tasksThisWeek}
          </Text>
        </Box>
      </CardItem>
    </TransitionView>
  );
};

export default WeeklyReportScreen;
