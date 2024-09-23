import React, {
  FunctionComponent,
  ComponentProps,
  useEffect,
  useState,
  useContext,
} from "react";
import { View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { CardItem, Box, Text, PriceItem } from "@src/components";
import { getCurrency, IRespond, handleError } from "libs/helper";
import { getTaskerIncomeAPI } from "apis/user";
import styles from "./styles";

interface IIncome extends ComponentProps<typeof View> {
  navigation?: any;
  user?: any;
  setLoading?: (isloading: boolean) => void;
}

const IncomeScreen: FunctionComponent<IIncome> = ({
  setLoading,
  navigation,
  user,
}) => {
  const I18n = useContext(LocalizationContext);
  const [incomeThisMonth, setIncomeThisMonth] = useState(0);
  const [isError, setIsError] = useState(false);
  const currency = getCurrency();

  const getTaskerIncome = async () => {
    setLoading(true);
    const respond: IRespond = await getTaskerIncomeAPI();
    setLoading(false);
    if (respond.isSuccess) {
      setIncomeThisMonth(respond?.data?.totalIncome);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  useEffect(() => {
    Boolean(!user?.isEmployee) && getTaskerIncome();
  }, [user?.isEmployee]);

  return (
    <CardItem
      testID={"IncomeDetail"}
      iconName="right"
      title={I18n.t("TAB_ACCOUNT.HISTORY_INCOME")}
      onPress={() => navigation.navigate("IncomeDetail")}
    >
      <Box
        row
        center
        style={styles.boxIteam}
      >
        <Text>{I18n.t("TAB_ACCOUNT.INCOME_IN_MONTH")}</Text>
        <PriceItem
          loading={isError}
          testID="incomeThisMonth"
          cost={incomeThisMonth}
          priceStyle={styles.priceStyle}
        />
      </Box>
    </CardItem>
  );
};

export default IncomeScreen;
