import {
  FunctionComponent,
  ComponentProps,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import { View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import {
  Card,
  Box,
  Text,
  PriceItem,
  Button,
  Alert,
  Divider,
} from "@src/components";
import {
  getCurrency,
  formatMoney,
  IRespond,
  handleError,
  getIsoCodeGlobal,
  openUrl,
  getCountry,
  getFontFamilyByLocale,
} from "libs/helper";
import { getTaskerMoneyDetailAPI, createWeeklyPayoutAPI } from "apis/user";
import { getSettingPayoutAPI } from "@src/apis/settings";
import styles, { COLOR_PLACEHOLDER, COLOR_SELECTION } from "./styles";
import MaskInput, { createNumberMask } from "react-native-mask-input";
import Confirmation from "../confirmation";
import Success from "../success";
import UnableWithDraw from "../unable-withdraw";
import SkeletonWithdraw from "./skeleton";
import { EN, ID, INDONESIA, TH, THAILAND, VI, VIETNAM } from "libs/constants";

// Flag check spam, ko cho gọi API tiếp theo nếu đang trong quá trình xử lý
let withdrawing = false;

interface IWithdraw extends ComponentProps<typeof View> {
  setLoading?: (isloading: boolean) => void;
  navigation?: any;
  user: {
    name: string;
    TCBankNumber: string;
  };
  linkSupport?: string;
}

// Số đơn vị làm tròn
const ROUNDING_UNIT = 1000;
const ROUNDING_UNIT_TH = 1;
// Số đơn vị làm tròn hiển thị ở sau text input
const ROUNDING_UNIT_TEXT = ",000";
const ROUNDING_UNIT_TEXT_TH = "";
// Số lượng ký tự có thể nhập vào text input
const MAX_LENGTH_INPUT = 7;
const MAX_LENGTH_INPUT_WITHOUT_PREFIX = 6;
// Số hiển thị sẳn trong text input
const PLACEHOLDER = "1";
// Đơn vị làm tròn ở cuối khi nhập số tiền. Ví dụ: Làm tròn tới 1000: 1000 -> 1000*1000
const roundingUnit = new Map([
  [VIETNAM, ROUNDING_UNIT],
  [THAILAND, ROUNDING_UNIT_TH],
  [INDONESIA, ROUNDING_UNIT],
]);
// Đơn vị làm tròn hiển thị ở sau text input. Ví dụ: Làm tròn tới 1000: ***000đ
const roundingUnitText = new Map([
  [VIETNAM, ROUNDING_UNIT_TEXT],
  [THAILAND, ROUNDING_UNIT_TEXT_TH],
  [INDONESIA, ROUNDING_UNIT_TEXT],
]);
// Hiển thị đơn vị phía trước theo Ngôn ngữ
const prefix = new Map([
  [VI, []],
  [ID, [getCurrency(2)]],
  [EN, [getCurrency(2)]],
  [TH, []],
]);
// Độ dài được nhập theo Ngôn ngữ
const maxLength = new Map([
  [VI, MAX_LENGTH_INPUT_WITHOUT_PREFIX],
  [ID, MAX_LENGTH_INPUT],
  [EN, MAX_LENGTH_INPUT],
  [TH, MAX_LENGTH_INPUT_WITHOUT_PREFIX],
]);
// Đơn vị hiển thị phía sau theo Ngôn ngữ
const currencyBehind = new Map([
  [VI, getCountry()?.currency?.sign],
  [ID, null],
  [EN, null],
  [TH, getCountry()?.currency?.sign],
]);

const WithdrawScreen: FunctionComponent<IWithdraw> = ({
  setLoading,
  user,
  navigation,
  linkSupport,
}) => {
  const I18n = useContext(LocalizationContext);
  const [mainAccount, setMainAccount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [minimumMoneyAccount, setMinimumMoneyAccount] = useState(0);
  const [minPayout, setMinPayout] = useState(0);
  const [maxPayout, setMaxPayout] = useState(0);
  const [loadingPage, setLoadingPage] = useState(true);
  const inputRef = useRef(null);
  const currency = getCurrency();

  const onChangeText = (masked, unmasked) => {
    setAmount(unmasked);
  };

  const throwError = (error: any) => {
    // Show lỗi và goBack khi onClosed Alert
    const onClosed = () => navigation.goBack();
    handleError(error, onClosed);
  };

  const getTaskerMoney = async () => {
    // setLoading(true);
    const respond: IRespond = await getTaskerMoneyDetailAPI();
    // setLoading(false);
    if (respond.isSuccess) {
      setMaxPayout(respond?.data?.maxPayout);
      setMainAccount(respond?.data?.FMainAccount);
      return;
    }
    throwError(respond?.error);
  };

  const getSettingPayout = async () => {
    // setLoading(true);
    const respond: IRespond = await getSettingPayoutAPI();
    // setLoading(false);
    if (respond.isSuccess) {
      setMinimumMoneyAccount(respond?.data?.minimumMoneyAccount);
      setMinPayout(respond?.data?.minPayout);
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 500);
      return;
    }
    throwError(respond?.error);
  };

  const createWeeklyPayout = async () => {
    // Đang xử lý rút tiền
    if (withdrawing) {
      return;
    }
    // Flag check spam, ko cho gọi API tiếp theo nếu đang trong quá trình xử lý
    withdrawing = true;
    // Show loading
    await setLoading(true);
    // Tính amount theo số làm tròn
    let newAmount = Math.floor(amount * roundingUnit.get(getIsoCodeGlobal()));
    const result: IRespond = await createWeeklyPayoutAPI({
      amount: Number(newAmount),
    });
    // Hide loading
    await setLoading(false);
    // Xử lý rút tiền xong
    withdrawing = false;
    // error
    if (result?.error) {
      return handleError(result?.error);
    }
    // success
    return Alert.alert.open({
      title: "DIALOG.TITLE_INFORMATION",
      onClosed: () => {
        navigation.goBack();
        navigation.navigate("TabPayout");
      },
      message: (
        <Success
          amount={newAmount}
          user={user}
        />
      ),
    });
  };

  useEffect(() => {
    // set flag check spam API
    withdrawing = false;

    const _initData = async () => {
      setLoadingPage(true);
      await getTaskerMoney();
      await getSettingPayout();
      setLoadingPage(false);
    };
    _initData();
  }, []);

  const onConfirmation = () => {
    // Check amount empty
    if (!Boolean(amount)) {
      return;
    }
    // Tính amount theo số làm tròn
    let newAmount = Math.floor(amount * roundingUnit.get(getIsoCodeGlobal()));
    // Check TCBankNumber empty
    if (!Boolean(user?.TCBankNumber)) {
      return Alert.alert.open({
        title: "DIALOG.TITLE_ERROR",
        message: "WITHDRAW.ERROR_TCBANK_NUMBER",
        actions: [
          {
            text: "DIALOG.BUTTON_UPDATE",
            style: "ok",
            onPress: () => {
              openUrl(linkSupport);
            },
          },
        ],
      });
    }
    // Tiền bạn nhập không nằm trong khoảng cho phép rút
    if (minPayout > Math.floor(newAmount) || newAmount > maxPayout) {
      // Show alert error
      return Alert.alert.open({
        message: "WITHDRAW.ERROR_SCOPE_OF_MONEY",
        actions: [
          {
            text: "DIALOG.BUTTON_CLOSE",
            onPress: () => {
              Alert?.alert?.close();
              inputRef?.current?.focus();
            },
          },
        ],
      });
    }
    // Show alert confirm
    return Alert.alert.open({
      title: "TAB_ACCOUNT.CONFIRMATION",
      message: (
        <Confirmation
          amount={newAmount}
          user={user}
        />
      ),
      actions: [
        {
          text: "DIALOG.BUTTON_ACCEPT",
          style: "ok",
          onPress: () => {
            Alert.alert?.close();
            createWeeklyPayout();
          },
        },
        { text: "DIALOG.BUTTON_CLOSE", style: "cancel" },
      ],
    });
  };

  const _renderValidAmount = () => {
    if (!maxPayout || !minPayout) {
      return null;
    }
    return (
      <Text>
        {I18n.t("WITHDRAW.VALID_AMOUNT", {
          minCost: formatMoney(minPayout),
          maxCost: formatMoney(maxPayout),
          currency: currency?.sign,
        })}
      </Text>
    );
  };

  const RenderMinimumMoneyAccount = () => {
    if (!minimumMoneyAccount) {
      return null;
    }
    return (
      <Text
        fontSize="m"
        color="secondary"
        style={styles.textAmount}
      >
        {I18n.t("WITHDRAW.NOTE", {
          amount: formatMoney(minimumMoneyAccount),
          currency: currency?.sign,
        })}
      </Text>
    );
  };

  if (loadingPage) {
    return <SkeletonWithdraw />;
  }

  // Kiểm tra số tiền trong tài khoản chính có đủ để rút hay không
  if (!loadingPage && Boolean(mainAccount < minimumMoneyAccount + minPayout)) {
    return (
      <UnableWithDraw
        mainAccount={mainAccount}
        minimumMoneyAccount={minimumMoneyAccount}
        minPayout={minPayout}
      />
    );
  }

  return (
    <Card>
      <Box style={styles.boxTitle}>
        <Text
          color="primary"
          fontSize="xl"
          bold
          center
          style={styles.textAmount}
        >
          {I18n.t("TAB_ACCOUNT.AMOUNT")}
        </Text>
        <Box
          row
          alignCenter
          style={styles.input}
        >
          <MaskInput
            ref={inputRef}
            testID="amountWithdraw"
            mask={createNumberMask({
              prefix: prefix.get(I18n.locale),
              delimiter: ",",
              precision: 0,
            })}
            value={amount ? amount.toString() : ""}
            maxLength={maxLength.get(I18n.locale)}
            placeholder={PLACEHOLDER}
            placeholderTextColor={COLOR_PLACEHOLDER}
            selectionColor={COLOR_SELECTION}
            onChangeText={onChangeText}
            style={[
              styles.inputText,
              { fontFamily: getFontFamilyByLocale().normal },
            ]}
            keyboardType="numeric"
            showObfuscatedValue={true}
            selectTextOnFocus={true}
          />
          <Text
            fontSize="xxl"
            color={amount ? "black" : "grey2"}
          >
            {roundingUnitText.get(getIsoCodeGlobal())}
            <Text color="grey1">{currencyBehind.get(I18n.locale)}</Text>
          </Text>
        </Box>
      </Box>
      <Box
        row
        between
        style={styles.containerMainAccount}
      >
        <Box row>
          <Text>{I18n.t("TAB_ACCOUNT.MAIN_ACCOUNT")}:</Text>
        </Box>
        <PriceItem
          cost={mainAccount}
          priceStyle={styles.priceStyle}
          currencyStyle={styles.currencyStyle}
          style={styles.boxPrice}
        />
      </Box>
      <Divider />
      <Box style={styles.boxNote}>
        {_renderValidAmount()}
        <RenderMinimumMoneyAccount />
      </Box>

      <Box style={styles.boxButton}>
        <Button
          disabled={!Boolean(amount)}
          testID="btnNext"
          title={I18n.t("TAB_ACCOUNT.NEXT")}
          onPress={onConfirmation}
        />
      </Box>
    </Card>
  );
};

export default WithdrawScreen;
