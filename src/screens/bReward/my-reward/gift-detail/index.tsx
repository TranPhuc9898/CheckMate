import { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { LocalizationContext } from "libs/context";
import {
  Box,
  Card,
  Container,
  Divider,
  Icon,
  Image,
  MarkDown,
  Text,
} from "@src/components";
import {
  formatDate,
  getTextWithLocale,
  handleError,
  IObjectText,
  IRespond,
  openUrl,
} from "libs/helper";
import getMyRewardDetailAPI, {
  IParamsGetMyRewardDetail,
} from "apis/benefit/get-my-reward-detail";
// REDUX
import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";
// LIB
import Toast from "react-native-simple-toast";
import Clipboard from "@react-native-community/clipboard";
import _ from "lodash";
import QRCode from "react-native-qrcode-svg";
// STYLES
import styles, { HEIGHT_BAR_CODE } from "./styles";
import RenderSocialReward from "screens/bReward/bReward-detail/bReward-social";
import RenderStoreReward from "screens/bReward/bReward-detail/bReward-store";

interface IDataReward {
  _id: string;
  title: IObjectText;
  content: IObjectText;
  note?: IObjectText;
  image?: string;
  startDate?: Date;
  endDate?: Date;
  point?: number;
  brandInfo?: any;
  barCode?: any;
  promotionCode?: any;
  social?: any;
  office?: any;
  expired?: Date;
}
const GiftDetail = ({ route }) => {
  const I18n = useContext(LocalizationContext);
  const [dataReward, setDataReward] = useState<IDataReward>();
  // Function Copy
  const onCopy = (value: any) => {
    Toast.showWithGravity(
      I18n.t("TAB_ACCOUNT.LABEL_COPY"),
      Toast.SHORT,
      Toast.BOTTOM
    );
    //save to Clipboard
    Clipboard.setString(value.toString());
  };

  // Get data my reward detail
  const initData = async () => {
    const params: IParamsGetMyRewardDetail = {
      id: route?.params?.rewardId,
    };
    // Show loading
    await store.dispatch(setLoading(true));
    // Call api get task detail
    const result: IRespond = await getMyRewardDetailAPI(params);
    // Hide loading
    await store.dispatch(setLoading(false));
    if (result?.isSuccess) {
      // Save data to state
      return setDataReward(result?.data);
    }
    return handleError(result?.error);
  };

  useEffect(() => {
    // Init data
    initData();
  }, []);

  const showBarCode = () => {
    // Partner have barCode
    if (dataReward?.barCode) {
      return (
        <Box center>
          <Image
            style={styles.barCode}
            resizeMode={"contain"}
            source={{ uri: dataReward?.barCode }}
          />
        </Box>
      );
    }
    // Partner have not barCode
    if (dataReward?.promotionCode) {
      return (
        <Box center>
          <QRCode
            size={HEIGHT_BAR_CODE}
            value={dataReward?.promotionCode}
          />
        </Box>
      );
    }
    return null;
  };

  const _RenderContent = () => {
    if (_.isEmpty(dataReward)) {
      return (
        <Box center>
          <Text color="grey1">{I18n.t("TAB_BENEFIT.DETAIL_REWARD_EMPTY")}</Text>
        </Box>
      );
    }
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        testID="scrollGiftDetail"
        contentContainerStyle={styles.containerContent}
      >
        <Card
          flex
          style={styles.containerCard}
        >
          <Box style={styles.containerImage}>
            <Image
              source={{
                uri: dataReward?.image,
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </Box>
          <Box
            row
            alignCenter
            style={styles.boxTitle}
          >
            <Image
              source={{ uri: dataReward?.brandInfo?.image }}
              resizeMode="contain"
              style={styles.imageBrand}
            />
            <Box
              flex
              style={styles.boxTextTitle}
            >
              <Text
                variant="h3"
                // style={styles.txtTitle2}
              >
                {getTextWithLocale(dataReward?.title)}
              </Text>
            </Box>
          </Box>
          {/* Sao chéo mã */}
          <Box
            center
            style={styles.boxQR}
          >
            {/* Mã QR */}
            {showBarCode()}
            {dataReward?.promotionCode ? (
              <Box
                row
                style={styles.boxQR}
              >
                <Text
                  variant="h2"
                  color="primary"
                  testID="txtPromotionCode"
                >
                  {dataReward?.promotionCode}
                </Text>
                <TouchableOpacity
                  onPress={() => onCopy(dataReward?.promotionCode)}
                  style={styles.boxIconCopy}
                >
                  <Icon
                    size="l"
                    name="copy"
                    color="secondary"
                  />
                </TouchableOpacity>
              </Box>
            ) : null}
            {/* Ngày hết hạn */}
            <Box
              row
              style={styles.boxDate}
            >
              <Text color="grey1">{I18n.t("BREWARD.EXPIRED_DATE")}: </Text>
              <Text color="grey1">
                {formatDate(dataReward?.expired, "date")}
              </Text>
            </Box>
          </Box>

          {/*  */}
          <Divider
            width={1}
            style={styles.divider}
          />
          <Box margin="l">
            <Text variant="h3">{I18n.t("TAB_BENEFIT.LABEL_REWARD_INFO")}</Text>
            <MarkDown
              text={getTextWithLocale(dataReward?.content).replace(/"/g, "")}
              textStyle={styles.txtMarkDown}
            />
            <Text
              variant="h3"
              style={styles.txtCondition}
            >
              {I18n.t("TAB_BENEFIT.LABEL_CONDITION")}
            </Text>
            <MarkDown
              text={getTextWithLocale(dataReward?.note).replace(/"/g, "")}
              textStyle={styles.txtMarkDown}
            />
          </Box>
        </Card>
        <Box>
          {/* Box social */}
          <RenderSocialReward data={dataReward} />
          <RenderStoreReward dataStore={dataReward?.office} />
          {dataReward?.social?.android || dataReward?.social?.ios ? (
            <Card>
              <Text bold>{I18n.t("BREWARD.DOW")}</Text>
              <Box
                row
                style={styles.boxDow}
              >
                {dataReward?.social?.ios ? (
                  <TouchableOpacity
                    onPress={() => openUrl(dataReward?.social?.ios)}
                    style={styles.boxIos}
                  >
                    <Image
                      source={require("assets/images/ios.png")}
                      style={styles.imageIos}
                    />
                    <Box style={styles.boxText}>
                      <Text style={styles.textIos}>
                        {I18n.t("BREWARD.DOW_IOS")}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                ) : null}
                {dataReward?.social?.android ? (
                  <TouchableOpacity
                    onPress={() => openUrl(dataReward?.social?.android)}
                    style={styles.boxIos}
                  >
                    <Image
                      source={require("assets/images/android.png")}
                      style={styles.imageIos}
                    />
                    <Box style={styles.boxText}>
                      <Text style={styles.textIos}>
                        {I18n.t("BREWARD.DOW_ANDROID")}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                ) : null}
              </Box>
            </Card>
          ) : null}
        </Box>
      </ScrollView>
    );
  };

  return (
    <Container>
      <_RenderContent />
    </Container>
  );
};

export default GiftDetail;
