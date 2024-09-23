import {
  FunctionComponent,
  ComponentProps,
  useEffect,
  useState,
  useContext,
} from "react";
import { View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { DefaultTheme, useIsFocused } from "@react-navigation/native";
import { Box, Text, PriceItem, Button, Icon, Alert } from "@src/components";
import { getTaskerMoneyDetailAPI } from "apis/user";
import { getCurrency, IRespond, handleError } from "libs/helper";
import styles from "./styles";
import { colors } from "libs/theme";
import LinearGradient from "react-native-linear-gradient";
interface IMainFinance extends ComponentProps<typeof View> {
  navigation?: any;
  setLoading?: (isloading: boolean) => void;
  setMoneyOfTasker?: (moneyOfTasker: any) => void;
}

const MainFinanceScreen: FunctionComponent<IMainFinance> = ({
  navigation,
}) => {
  const I18n = useContext(LocalizationContext);
  const [mainAccount, setMainAccount] = useState(0);
  const [promotionAccount, setPromotionAccount] = useState(0);
  // const [holdingAmount, setHoldingAmount] = useState(0);
  const [waitingPayout, setWaitingPayout] = useState(0);

  const isFocused = useIsFocused();
  const currency = getCurrency();

  const fetchData = async () => {
    const respond: IRespond = await getTaskerMoneyDetailAPI();
    if (respond.isSuccess) {
      setMainAccount(respond?.data?.FMainAccount);
      setPromotionAccount(respond?.data?.PromotionAccount);
      setWaitingPayout(respond?.data?.waitingPayout);
    } else {
      // Show lỗi và goBack khi onClosed Alert
      const onClosed = () => navigation.goBack();
      handleError(respond?.error, onClosed);
    }
  };

  const onWithdraw = () => {
    if (waitingPayout > 0) {
      return Alert.alert.open({
        title: "DIALOG.TITLE_INFORMATION",
        message: (
          <Box center>
            <Text>
              {I18n.t("TAB_ACCOUNT.ERROR_ON_HOLD_ACCOUNT_WHEN_WITHDRAW")}
            </Text>
          </Box>
        ),
        actions: [{ text: "DIALOG.BUTTON_CLOSE", style: "ok" }],
      });
    }
    return navigation.navigate("Withdraw");
  };

  useEffect(() => {
    isFocused && fetchData();
  }, [isFocused]);

  return (
    <Box
      style={styles.container}
    >
      <LinearGradient
        colors={["#8691db", "#ededf2", DefaultTheme.colors.background]}
        style={styles.linearGradient}
      ></LinearGradient>
      <Box
        center
        style={styles.boxContainer}
      >
        <Text
          variant="h3"
          color="grey0"
        >
          {I18n.t("TAB_ACCOUNT.MAIN_ACCOUNT")}
        </Text>
        <Box
          row
          center
          style={styles.boxMainAccount}
        >
          <PriceItem
            cost={mainAccount}
            priceStyle={styles.mainAccountStyle}
            currencyStyle={styles.currencyStyle}
          />
        </Box>
      </Box>
      <Box
        row
        style={styles.boxButton}
      >
        <Box
          flex
          style={styles.containerBtn}
        >
          <Button
            size="md"
            testID="Topup"
            color={colors.primary}
            containerStyle={styles.btnStyle}
            onPress={() => navigation.navigate("Topup")}
          >
            <Box
              row
              center
            >
              <Icon
                name="topUp"
                size="xl"
              />
              <Text
                color="white"
                style={styles.btnText}
              >
                {I18n.t("TAB_ACCOUNT.TOPUP")}
              </Text>
            </Box>
          </Button>
        </Box>
        <Box
          flex
          style={styles.containerBtn}
        >
          <Button
            testID="Withdraw"
            size="md"
            containerStyle={styles.btnStyle}
            title={I18n.t("TAB_ACCOUNT.WITHDRAW")}
            onPress={() => onWithdraw()}
          >
            <Box
              row
              center
            >
              <Icon
                name="withdraw"
                size="xl"
              />
              <Text
                color="white"
                style={styles.btnText}
              >
                {I18n.t("TAB_ACCOUNT.WITHDRAW")}
              </Text>
            </Box>
          </Button>
        </Box>
      </Box>
      <Box
        row
        center
        style={styles.boxPromotionAccount}
      >
        <Text>{I18n.t("TAB_ACCOUNT.PROMOTION_ACCOUNT")}</Text>
        <PriceItem
          cost={promotionAccount}
          priceStyle={styles.promotionAccountStyle}
          currencyStyle={styles.promotionAccountStyle}
        />
      </Box>
    </Box>
  );
};

export default MainFinanceScreen;
