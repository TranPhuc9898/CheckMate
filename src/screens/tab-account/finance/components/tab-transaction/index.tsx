import {
  FunctionComponent,
  ComponentProps,
  useEffect,
  useState,
  useContext,
} from "react";
import { ScrollView, View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Box, CardItem, Divider, Icon, PriceItem, Text } from "@src/components";
import {
  formatDate,
  getCurrency,
  getTextWithLocale,
  IRespond,
} from "libs/helper";
import { getFinancialTransactionsAPI } from "apis/user";
import { store } from "redux/store";
import { setLoading } from "redux/slice/app-slice";
import { colors } from "libs/theme";
import { TRANSACTION_TYPE_D } from "libs/constants";
import styles from "./styles";
import _ from "lodash";

interface ITransactionHistory extends ComponentProps<typeof View> {
  navigation?: any;
}

const TabTransaction: FunctionComponent<ITransactionHistory> = ({
  navigation,
}) => {
  const I18n = useContext(LocalizationContext);
  const [financialTransactions, setFinancialTransactions] = useState([]);

  const fetchFinancialTransactions = async () => {
    await store.dispatch(setLoading(true));
    const result: IRespond = await getFinancialTransactionsAPI({ limit: 5 });
    await store.dispatch(setLoading(false));
    setFinancialTransactions(result?.data || []);
  };

  useEffect(() => {
    fetchFinancialTransactions();
  }, []);

  const _RenderItem = ({ index, data, color }) => {
    const { amount, type, createdAt, _id, reason, text } = data;
    // Get currency
    const currency = getCurrency();
    // Forrmat date
    const createdAtText = formatDate(createdAt);
    // Get title by locale
    const title = text || getTextWithLocale(reason);
    const colorTheme =
      type === TRANSACTION_TYPE_D ? colors.success : colors.grey1;
    return (
      <Box
        key={_id}
        row
        center
        style={[
          styles.containerItem,
          { backgroundColor: index % 2 !== 0 ? colors.grey5 : colors.white },
        ]}
      >
        <Box
          center
          style={[
            styles.containerIcon,
            {
                backgroundColor: color,
            },
          ]}
        >
          <Icon name={type === TRANSACTION_TYPE_D ? "topUp" : "withdraw"} />
        </Box>
        <Box style={styles.boxItem}>
          <Text
            fontSize="l"
            bold
            testID={`transactionTitle-${index}`}
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text
            color="grey0"
            fontSize="m"
            style={styles.textReason}
          >
            {createdAtText}
          </Text>
        </Box>
        <Box
          row
          center
        >
          <PriceItem
            type={type}
            testID={`transactionHistory-${index}`}
            cost={amount}
            currencyStyle={{
              color: colors.grey1,
            }}
            priceStyle={{
              ...styles.priceStyle,
              color: colorTheme,
            }}
          />
        </Box>
      </Box>
    );
  };

  if (_.isEmpty(financialTransactions)) {
    return (
      <Box
        center
        margin="l"
      >
        <Text color="grey0">{I18n.t("TAB_ACCOUNT.EMPTY_TRANSACTION")}</Text>
      </Box>
    );
  }

  return (
    <Box
      flex
      style={styles.container}
    >
      <CardItem
        iconName="right"
        title={I18n.t("TAB_ACCOUNT.LABEL_TRANSACTION_TAB")}
        onPress={() => navigation.navigate("TransactionHistory")}
        testID={"TransactionHistory"}
        style={styles.cardStyle}
        titleStyle={styles.titleStyle}
        headerStyle={styles.headerStyle}
      >
        <Box>
          <Divider
            width={1}
            style={styles.boxDivider}
          />
        </Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          {financialTransactions.map((data, index) => (
            <_RenderItem
              key={"transaction" + index}
              data={data}
              index={index}
              color={
                data?.type === TRANSACTION_TYPE_D
                  ? colors.primary
                  : colors.secondary
              }
            />
          ))}
        </ScrollView>
      </CardItem>
    </Box>
  );
};

export default TabTransaction;
