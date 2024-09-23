import React, {
  useEffect,
  useState,
  FunctionComponent,
  ComponentProps,
  useContext,
} from "react";
import _ from "lodash";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Card, Box, Text, PriceItem } from "@src/components";
import {
  getCurrency,
  getTextWithLocale,
  IRespond,
  handleError,
} from "libs/helper";
import { getSettingTopupAPI } from "@src/apis/settings";
import Clipboard from "@react-native-community/clipboard";
import Toast from "react-native-simple-toast";
import styles from "./styles";

interface ITopUp extends ComponentProps<typeof View> {
  user: {
    name: string;
    TCBankNumber: string;
    workingPlaces: any;
  };
  setLoading?: (isloading: boolean) => void;
}

const TopUpScreen: FunctionComponent<ITopUp> = ({ user, setLoading }) => {
  const I18n = useContext(LocalizationContext);
  const currency = getCurrency();
  const [depositIntruction, setDepositIntruction] = useState([]);
  const [minMoneyDeposit, setMinMoneyDeposit] = useState(0);

  const getSettingTopup = async () => {
    setLoading(true);
    const respond: IRespond = await getSettingTopupAPI();

    setLoading(false);
    if (respond.isSuccess) {
      setDepositIntruction(respond?.data?.depositIntruction);
      setMinMoneyDeposit(respond?.data?.minMoneyDeposit);
    } else {
      handleError(respond?.error);
    }
  };

  const onCopy = (value: any) => {
    Toast.showWithGravity(
      I18n.t("TAB_ACCOUNT.LABEL_COPY"),
      Toast.SHORT,
      Toast.BOTTOM
    );
    //save to Clipboard
    Clipboard.setString(value.toString());
  };

  useEffect(() => {
    getSettingTopup();
  }, []);

  if (!depositIntruction || depositIntruction.length === 0)
    return (
      <Card flex>
        <Box
          center
          flex
        >
          <Text
            bold
            fontSize="xl"
          >
            {I18n.t("TOPUP.COMING_SOON")}
          </Text>
        </Box>
      </Card>
    );

  let depositIntructionByCity = depositIntruction[0];
  const city = _.get(user, "workingPlaces[0].city", null);
  const findDepositIntruction = depositIntruction.find((e) => {
    return e?.city === city;
  });
  if (findDepositIntruction) depositIntructionByCity = findDepositIntruction;

  const bankName = getTextWithLocale(depositIntructionByCity?.bankName);
  const bankDepartment = getTextWithLocale(
    depositIntructionByCity?.bankDepartment
  );
  const accountHolder = depositIntructionByCity?.accountHolder;
  const accountNumber = depositIntructionByCity?.accountNumber;

  return (
    <ScrollView>
      <Card>
      {/* Box: Số tiền nạp tối thiểu */}
      <Box style={styles.box}>
          <Text bold>{I18n.t("TOPUP.MIN_COST_TOPUP")}</Text>
          <Box>
            <PriceItem
              cost={minMoneyDeposit}
              currencyStyle={styles.currencyStyle}
              priceStyle={styles.priceStyle}
            />
          </Box>
        </Box>
        <Box>
          <Text style={styles.txtText2}>
            {I18n.t("TOPUP.INSTRUCTTION_NOTE")}
          </Text>
        </Box>
        <Box>
          <Text style={styles.txtText2}>{I18n.t("TOPUP.BANK_TRANFER")}</Text>
        </Box>
        <Box >
    
            <Text
            style={styles.txtText}
            bold
          >
            {bankName}
          </Text>

        </Box>
        <Box>
          <Text
            style={styles.txtText}
            bold
            testID="labelBankDepartment"
          >
            {bankDepartment}
          </Text>
        </Box>
        <Box>
          <Text style={styles.txtText2}>
            {I18n.t("TOPUP.BANK_INFO_ACCOUNT_HOLDER")}
          </Text>
        </Box>
        <Box>
          <Text
            style={styles.txtText}
            bold
            testID="labelAccountHolder"
          >
            {accountHolder}
          </Text>
        </Box>
        <Box>
          <Text style={styles.txtText2}>
            {I18n.t("TOPUP.BANK_INFO_ACCOUNT_NUMBER")}
          </Text>
        </Box>
        <TouchableOpacity
          onLongPress={() => onCopy(accountNumber)}
          style={{ paddingHorizontal: 16 }}
        >
          <Text
            style={styles.txtText}
            bold
            testID="labelAccountNumber"
          >
            {accountNumber}
          </Text>
        </TouchableOpacity>
        <Box>
          <Text style={styles.txtText2}>
            {I18n.t("TOPUP.BANK_INFO_TRANFER_CONTENT")}
          </Text>
        </Box>
        <Box>
          <Text
            style={styles.txtText}
            bold
            testID="labelContentSyntax"
          >
            {I18n.t("TOPUP.BANK_INFO_CONTENT_SYNTAX")}
          </Text>
        </Box>
        <Box>
          <Text style={styles.txtText2}>{I18n.t("TOPUP.LBL_EX_DEPOSITE")}</Text>
        </Box>
        <Box>
          <Text style={styles.txtText2}>
            {I18n.t("TOPUP.NOTE_DEPOSIT_MONEY")}
          </Text>
        </Box>
      </Card>
    </ScrollView>
  );
};

export default TopUpScreen;
