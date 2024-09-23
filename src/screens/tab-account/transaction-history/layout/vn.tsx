import {
  useEffect,
  useState,
  useContext,
  ComponentProps,
  FunctionComponent,
} from "react";

import { ScrollView, View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import {
  SelectMonth,
  Card,
  Box,
  Text,
  Container,
  ItemTransaction,
  Divider,
} from "@src/components";
import { IRespond, formatDate, capitalizedFirstStr } from "@src/libs/helper";
import { getFinancialTransactionsAPI } from "apis/user";
import styles from "./styles";
import moment from "moment";
import { colors, spacing } from "libs/theme";
import _ from "lodash";
import { TRANSACTION_TYPE_D } from "libs/constants";
interface ITransactionHistory extends ComponentProps<typeof View> {
  navigation?: any;
  setLoading?: (isloading: boolean) => void;
}

const TransactionHistoryScreen: FunctionComponent<ITransactionHistory> = ({
  navigation,
  setLoading,
}) => {
  const I18n = useContext(LocalizationContext);
  const defaultFromDate = moment().startOf("month");
  const defaultToDate = moment().endOf("month");
  const [month, setMonth] = useState(formatDate(moment(), "month"));
  const [rangeDate, setRangeDate] = useState({
    fromDate: defaultFromDate,
    toDate: defaultToDate,
  });

  const [financialTransactions, setFinancialTransactions] = useState([]);

  const fetchFinancialTransactions = async (_rangeDate = rangeDate) => {
    setLoading(true);
    // Call api get financial transactions
    const result: IRespond = await getFinancialTransactionsAPI(_rangeDate);
    setLoading(false);
    // Set financial transactions
    setFinancialTransactions(result?.data || []);
  };

  const onSelectMonth = (valueRangeDate: any, valueMonth: string) => {
    // Set range date
    setRangeDate(valueRangeDate);
    setMonth(valueMonth);
    fetchFinancialTransactions(valueRangeDate);
  };

  useEffect(() => {
    fetchFinancialTransactions();
  }, []);

  /**
   * @description function group transaction by date with title is date
   * @param {Array} financialTransactions
   * @returns {Array} groupTransaction
   */
  const _renderTransaction = (financialTransactions: any) => {
    // Check empty transaction
    if (_.isEmpty(financialTransactions)) {
      return (
        <Box
          center
          style={styles.boxEmptyData}
        >
          <Text fontSize="m">
            {I18n.t("TAB_ACCOUNT.EMPTY_TRANSACTION_IN_MONTH")}
          </Text>
        </Box>
      );
    }
    // Group transaction by date
    const groupTransaction = _.groupBy(financialTransactions, (item) => {
      return formatDate(item.date, "date");
    });
    // Render transaction
    return Object.keys(groupTransaction).map((key) => (
      <Box
        key={key}
        style={{
          marginTop: spacing.l,
        }}
      >
        <Text
          style={styles.boxMonth}
          color="grey0"
        >
          {key}
        </Text>
        {groupTransaction[key].map((data, index) => (
          <ItemTransaction
            testID={`detailTransaction-${index}`}
            data={data}
            key={`${key}_${index}`}
            containerStyle={[
              styles.containerItem,
              {
                backgroundColor:
                  index % 2 === 0 ? colors.background : colors.grey5,
              },
            ]}
            icon={data?.type === TRANSACTION_TYPE_D ? "topUp" : "withdraw"}
            iconColor={data?.type === TRANSACTION_TYPE_D ? "primary1" : "secondary1"}
            isShowDate={true}
            color={data?.type === TRANSACTION_TYPE_D ? colors.success : colors.grey1}
            dateStyle={styles.dateStyle}
          />
        ))}
        <Divider style={styles.dividerStyle} />
      </Box>
    ));
  };

  return (
    <Container>
      <ScrollView>
        <Card style={styles.cardStyle}>
          <Box style={styles.boxMonth}>
            <SelectMonth onSelectMonth={onSelectMonth} />
            <Text
              color="primary"
              fontSize="xl"
              numberOfLines={2}
              bold
            >
              {capitalizedFirstStr(month)}
            </Text>
            <Divider style={styles.dividerStyle} />
          </Box>
          {/* Render transaction */}
          {_renderTransaction(financialTransactions)}
          {/* End render transaction */}
        </Card>
      </ScrollView>
    </Container>
  );
};

export default TransactionHistoryScreen;
