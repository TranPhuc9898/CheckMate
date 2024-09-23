import {
  useEffect,
  useState,
  FunctionComponent,
  ComponentProps,
  useContext,
} from "react";
import _ from "lodash";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import {
  Card,
  Box,
  Text,
  PriceItem,
  Icon,
  Alert,
  Image,
} from "@src/components";
import {
  getTextWithLocale,
  IRespond,
  handleError,
  formatMoney,
} from "libs/helper";
import { getSettingTopupAPI } from "@src/apis/settings";
import Clipboard from "@react-native-community/clipboard";
import Toast from "react-native-simple-toast";
import styles from "./styles";
import { spacing, colors } from "libs/theme";
import StepIndicator from "react-native-step-indicator";
import { isAndroid, requestStoragePermission } from "libs/helper";
import Accordion from "react-native-collapsible/Accordion";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import ReactNativeBlobUtil from "react-native-blob-util";
import { store } from "redux/store";
import { setLoading } from "redux/slice/app-slice";

interface ITopUp extends ComponentProps<typeof View> {
  user: {
    name: string;
    TCBankNumber: string;
    workingPlaces: any;
  };
  route?: any;
}

const TopUpScreen: FunctionComponent<ITopUp> = ({ user, route }) => {
  const I18n = useContext(LocalizationContext);
  const [depositIntruction, setDepositIntruction] = useState([]);
  const [minMoneyDeposit, setMinMoneyDeposit] = useState(0);
  const [activeSection, setActiveSection] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const labels = [
    I18n.t("TOPUP.STEP_1"),
    I18n.t("TOPUP.STEP_2"),
    I18n.t("TOPUP.STEP_3"),
    I18n.t("TOPUP.STEP_4", {
      money: formatMoney(minMoneyDeposit),
    }),
  ];

  const CONTENT = [
    {
      title: I18n.t("TOPUP.QR_NOTE"),
    },
  ];

  const getSettingTopup = async () => {
    // Set loading
    setShowLoading(true);
    await store.dispatch(setLoading(true));
    const respond: IRespond = await getSettingTopupAPI();
    // Hide loading
    await store.dispatch(setLoading(false));
    setShowLoading(false);
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

  // Nếu loading thì không hiển thị
  if (showLoading) {
    return null;
  }

  if (_.isEmpty(depositIntruction))
    return (
      <Card flex>
        <Box
          flex
          center
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
  const urlQRCode = _.get(depositIntructionByCity, "urlQRCode", null);
  // const url
  const findDepositIntruction = depositIntruction.find((e) => {
    return e?.city === city;
  });
  if (findDepositIntruction) depositIntructionByCity = findDepositIntruction;
  // Split
  const bank = getTextWithLocale(depositIntructionByCity?.bankName);
  const splitBank = bank.split(" ");
  const bankName = splitBank[splitBank.length - 1];
  const bankDepartment = getTextWithLocale(
    depositIntructionByCity?.bankDepartment
  );
  const accountHolder = depositIntructionByCity?.accountHolder;
  const accountNumber = depositIntructionByCity?.accountNumber;

  const handleDownload = async () => {
    // No image link, do nothing
    if (!urlQRCode) {
      return null;
    }

    // if device is android you have to ensure you have permission
    if (isAndroid) {
      const granted = await requestStoragePermission(I18n);
      if (!granted) {
        return Alert.alert.open({
          title: "PERMISSION.WRITE_EXTERNAL_STORAGE_TITLE",
          message: "PERMISSION.WRITE_EXTERNAL_STORAGE_CONTENT",
        });
      }
    }

    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: "png",
    })
      .fetch("GET", urlQRCode)
      .then((res) => {
        CameraRoll.save(res.data, { type: "photo" })
          .then(() => {
            // Alert save image success
            Toast.showWithGravity(
              I18n.t("TOPUP.SAVE_IMAGE_SUCCESS"),
              Toast.SHORT,
              Toast.BOTTOM
            );
          })
          .catch((err) => {
            // Save image error
            Toast.showWithGravity(err, Toast.SHORT, Toast.BOTTOM);
          })
          .finally(() => {});
      })
      .catch((error) => {
        // Save image error
        Toast.showWithGravity(error, Toast.SHORT, Toast.BOTTOM);
      });
  };

  const _renderHeader = (section, i, isActive) => {
    return (
      <Box style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
        <Icon
          color="grey2"
          name={isActive ? "icDown" : "icUp"}
          size="m"
        />
      </Box>
    );
  };

  const _renderContent = () => {
    return (
      <Box>
        <StepIndicator
          customStyles={{
            labelAlign: "flex-start",
            stepIndicatorCurrentColor: colors.primary,
            stepIndicatorUnFinishedColor: colors.primary,
            stepStrokeCurrentColor: colors.primary,
            separatorUnFinishedColor: colors.primary,
            currentStepStrokeWidth: 0,
            currentStepIndicatorSize: 30,
            stepIndicatorLabelCurrentColor: colors.white,
            stepIndicatorLabelUnFinishedColor: colors.white,
          }}
          labels={labels}
          direction="vertical"
          stepCount={labels.length}
          renderLabel={({ label, position }) => {
            return (
              <Box
                style={[
                  styles.boxText,
                  position === 0 ? { marginTop: spacing.xxl } : {},
                ]}
              >
                <Text>{label}</Text>
              </Box>
            );
          }}
        />
      </Box>
    );
  };

  const QRCode = () => {
    if (!urlQRCode) return null;
    return (
      <Card>
        <Box center>
          <Text
            color="primary"
            bold
            fontSize="xl"
            style={styles.txtQRCode}
          >
            {I18n.t("TOPUP.QR_CODE")}
          </Text>
          <Box style={styles.boxQRCode}>
            <Image
              source={{
                uri: urlQRCode,
              }}
              style={styles.QRCode}
            />
          </Box>
          <TouchableOpacity
            testID="btnDowQRCode"
            style={styles.btnSave}
            onPress={() => handleDownload()}
          >
            <Box center>
              <Icon
                name="saveImage"
                color="primary"
                size="xxxl"
              />
              <Text style={styles.txtSave}>{I18n.t("TOPUP.SAVE_IMAGE")}</Text>
            </Box>
          </TouchableOpacity>
        </Box>
        <ContactInformation />

        <Box style={styles.containerHeader}>
          <Accordion
            activeSections={activeSection}
            sections={CONTENT}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            duration={400}
            onChange={(active) => setActiveSection(active)}
          />
        </Box>
      </Card>
    );
  };

  const ContactInformation = () => {
    return (
      <Box style={styles.containerContact}>
        <Box>
          <Text testID="labelContentSyntax">{I18n.t("TOPUP.NOTE_LABEL")}</Text>
        </Box>
        <Box flex>
          <Text
            style={styles.txtTextContactInformation}
            color="primary"
            testID="labelContentSyntax"
            bold
          >
            {I18n.t("TOPUP.BANK_INFO_CONTENT_SYNTAX")}
          </Text>
          <Text
            style={styles.txtTextContactInformation}
            color="primary"
            bold
          >
            {I18n.t("TOPUP.LBL_EX_DEPOSITE")}
          </Text>
        </Box>
      </Box>
    );
  };

  const BankInfo = () => {
    return (
      <Card>
        <Box center>
          <Text
            color="primary"
            bold
            fontSize="xl"
            style={styles.txtQRCode}
          >
            {I18n.t("TOPUP.TOPUP_TO_BANK")}
          </Text>
          <Image
            source={require("assets/images/active-account/topup.png")}
            style={styles.QRCode}
          />
        </Box>

        {/* Box: Chuyển khoản qua ngân hàng */}
        <Box
          row
          style={styles.wrapContent}
        >
          <Box>
            <Text
              testID="labelContentTransfer"
              // fontSize="m"
            >
              {I18n.t("TOPUP.BANK_TRANFER")}
            </Text>
          </Box>
          <Box flex>
            <Text
              bold
              color="primary"
              style={styles.txtContent}
            >
              {bankName}
              {" - "}
              {bankDepartment}
            </Text>
          </Box>
        </Box>

        {/* Box: Chuyển khoản qua ngân hàng */}
        <Box
          row
          style={styles.wrapContent}
        >
          <Box>
            <Text testID="labelInfoAccount">
              {I18n.t("TOPUP.BANK_INFO_ACCOUNT_HOLDER")}
            </Text>
          </Box>
          <Box flex>
            <Text
              bold
              color="primary"
              style={styles.txtContent}
            >
              {accountHolder}
            </Text>
          </Box>
        </Box>

        {/* Box: Chuyển khoản qua ngân hàng */}
        <Box
          row
          style={styles.wrapContent}
        >
          <Box>
            <Text testID="labelBankInfo">
              {I18n.t("TOPUP.BANK_INFO_ACCOUNT_NUMBER")}
            </Text>
          </Box>
          <Box
            row
            flex
            style={{ justifyContent: "flex-end" }}
          >
            <TouchableOpacity
              onPress={() => onCopy(accountNumber)}
              style={{ justifyContent: "center" }}
            >
              <Box row>
                <Text
                  color="primary"
                  bold
                  style={styles.txtContent}
                  testID="labelAccountNumber"
                >
                  {accountNumber}
                </Text>
                <Icon
                  style={styles.iconCopy}
                  name="copy"
                  color="secondary"
                />
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>

        {/* Box: Chuyển khoản qua ngân hàng */}
        <Box
          row
          style={styles.wrapContent}
        >
          <Box>
            <Text testID="labelMinCost">{I18n.t("TOPUP.MIN_COST_TOPUP")}</Text>
          </Box>
          <Box flex>
            <PriceItem
              cost={minMoneyDeposit}
              currencyStyle={styles.currencyStyle}
              priceStyle={styles.priceStyle}
            />
          </Box>
        </Box>

        <Box
          row
          style={styles.wrapContent}
        >
          <Box>
            <Text testID="labelNote">{I18n.t("TOPUP.NOTE_LABEL")}</Text>
          </Box>
          <Box flex>
            <Text
              numberOfLines={1}
              color="primary"
              style={styles.txtTextContact}
              testID="labelContentSyntax"
              bold
            >
              {I18n.t("TOPUP.BANK_INFO_CONTENT_SYNTAX")}
            </Text>
            <Text
              style={styles.txtTextContactInformation}
              color="primary"
              bold
              numberOfLines={1}
            >
              {I18n.t("TOPUP.LBL_EX_DEPOSITE")}
            </Text>
          </Box>
        </Box>
      </Card>
    );
  };

  return (
    <ScrollView testID="scrollTopUp">
      <QRCode />
      <BankInfo />

      {/* Card: Lưu ý */}
      <Card>
        <Box center>
          <Text
            bold
            fontSize="l"
          >
            {I18n.t("TOPUP.NOTE")}
          </Text>
        </Box>
        <Box>
          <Text style={styles.txtText2}>
            {I18n.t("TOPUP.INSTRUCTTION_NOTE")}
          </Text>
        </Box>
        <Box>
          <Text
            style={styles.txtText2}
            testID="txtDepositMoney"
          >
            {I18n.t("TOPUP.NOTE_DEPOSIT_MONEY")}
          </Text>
        </Box>
      </Card>
    </ScrollView>
  );
};

export default TopUpScreen;
