import {
  FunctionComponent,
  ComponentProps,
  useEffect,
  useState,
  useContext,
} from "react";
import { View, ScrollView } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Card, Box, Text, PriceItem, Button } from "@src/components";
import {
  getCurrency,
  IRespond,
  handleError,
  getIsoCodeGlobal,
} from "libs/helper";
import { getSettingTopupAPI } from "@src/apis/settings";
import topUpCreditAPI from "apis/top-up-credit";

import styles from "./styles";
import MaskInput, { createNumberMask } from "react-native-mask-input";
import { placeholderMoney } from "libs/config";
const SIZE_ICON = 64;

interface ITopUp extends ComponentProps<typeof View> {
  setLoading?: (isloading: boolean) => void;
  navigation?: any;
  user: {
    name: string;
    TCBankNumber: string;
  };
}

const TopUpScreen: FunctionComponent<ITopUp> = ({
  setLoading,
  user,
  navigation,
}) => {
  const I18n = useContext(LocalizationContext);

  const [amount, setAmount] = useState();
  const [minMoneyDeposit, setMinMoneyDeposit] = useState();

  const onChangeText = (masked, unmasked) => {
    setAmount(unmasked);
  };

  const getDataTopUp = async () => {
    setLoading(true);
    const respond: IRespond = await topUpCreditAPI({ amount });
    setLoading(false);

    if (respond.isSuccess) {
      return navigation.navigate("TopupDetail", {
        QRCodeUrl: respond?.data?.data,
        amount: amount,
      });
    }
    handleError(respond?.error);
  };

  const getSettingTopup = async () => {
    setLoading(true);
    const respond: IRespond = await getSettingTopupAPI();

    setLoading(false);
    if (respond.isSuccess) {
      setMinMoneyDeposit(respond?.data?.minMoneyDeposit);
    } else {
      // Show lỗi và goBack khi onClosed Alert
      const onClosed = () => navigation.goBack();
      handleError(respond?.error, onClosed);
    }
  };

  useEffect(() => {
    getSettingTopup();
  }, []);

  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}>
      <Card>
        <Box style={styles.boxTitle}>
          <Text
            color="primary"
            fontSize="xl"
            bold
            style={styles.textAmount}
          >
            {I18n.t("TAB_ACCOUNT.AMOUNT")}
          </Text>
          <MaskInput
            mask={createNumberMask({
              prefix: [getCurrency(2)],
              delimiter: ",",
              precision: 0,
            })}
            value={amount ? amount : ""}
            maxLength={10}
            placeholder={placeholderMoney.get(getIsoCodeGlobal())}
            onChangeText={onChangeText}
            style={styles.input}
            keyboardType="numeric"
          />
          <Box
            row
            center
          >
            <Text
              style={styles.textNote}
              fontSize="m"
            >
              {I18n.t("TOPUP.MIN_MONEY")}:
            </Text>
            <PriceItem
              priceStyle={styles.priceStyle}
              cost={minMoneyDeposit}
            />
          </Box>
        </Box>
        <Box style={styles.boxButton}>
          <Button
            disabled={!Boolean(amount)}
            testID="btnNext"
            title={I18n.t("TAB_ACCOUNT.NEXT")}
            onPress={() => getDataTopUp()}
          />
        </Box>
      </Card>
    </ScrollView>
  );
};

export default TopUpScreen;
