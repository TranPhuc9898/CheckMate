import React, {
  FunctionComponent,
  ComponentProps,
  useEffect,
  useState,
  useContext,
} from "react";
import { TouchableOpacity, View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { CardItem, Box, Text, PriceItem, Icon } from "@src/components";
import { getCurrency, IRespond } from "libs/helper";
import { getTaskerIncomeAPI } from "apis/user";
import styles from "./styles";

interface IIncome extends ComponentProps<typeof View> {
  navigation?: any;
  setLoading?: (isloading: boolean) => void;
}

const IncomeScreen: FunctionComponent<IIncome> = ({
  setLoading,
  navigation,
}) => {
  const I18n = useContext(LocalizationContext);
  const [incomeThisMonth, setIncomeThisMonth] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [hideIncome, setHideIncome] = useState(true);
  const currency = getCurrency();

  const getTaskerIncome = async () => {
    setLoading(true);
    const result: IRespond = await getTaskerIncomeAPI();
    setLoading(false);
    setIncomeThisMonth(result?.data?.totalIncome || 0);
  };

  const getTotalIncome = async () => {
    setHideIncome(false);
    setLoading(true);
    const result: IRespond = await getTaskerIncomeAPI({ getAllTime: true });
    setLoading(false);
    setIncomeTotal(result?.data?.totalIncome || 0);
  };

  useEffect(() => {
    getTaskerIncome();
  }, []);

  return (
    <CardItem title={I18n.t("TAB_ACCOUNT.INCOME")}>
      <Box
        row
        center
        style={styles.boxIteam}
      >
        <Text>{I18n.t("TAB_ACCOUNT.INCOME_TOTAL")}</Text>
        {hideIncome ? (
          <TouchableOpacity
            style={styles.btnShowIncome}
            testID="seeIncome"
            onPress={getTotalIncome}
          >
            <Text bold>******</Text>
            <Icon
              style={styles.iconShowIncome}
              name="eyeSlash"
              color="grey0"
              size="m"
            />
          </TouchableOpacity>
        ) : (
          <PriceItem
            testID="totalIncome"
            cost={incomeTotal}
            priceStyle={styles.priceStyle}
          />
        )}
      </Box>
      <Box
        row
        center
        style={styles.boxIteam}
      >
        <Text>{I18n.t("TAB_ACCOUNT.INCOME_IN_MONTH")}</Text>
        <PriceItem
          testID="incomeThisMonth"
          cost={incomeThisMonth}
          priceStyle={styles.priceStyle}
        />
      </Box>
    </CardItem>
  );
};

export default IncomeScreen;
