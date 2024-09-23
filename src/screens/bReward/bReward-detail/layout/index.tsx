import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Image,
  MarkDown,
  Text,
  Stamp,
} from "@src/components";
import { LocalizationContext } from "libs/context";
import {
  formatDate,
  formatMoney,
  getTextWithLocale,
  handleError,
  IObjectText,
  IRespond,
  openUrl,
} from "libs/helper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { setLoading } from "redux/slice/app-slice";
import { ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import getRewardDetailAPI, {
  IParamsGetRewardDetail,
} from "apis/benefit/get-reward-detail";
import _ from "lodash";
import { store } from "redux/store";
import RenderSocialReward from "../bReward-social";
import RenderStoreReward from "../bReward-store";

import { bReward } from "hooks/bReward";

interface IDataReward {
  _id: string;
  title: IObjectText;
  content: IObjectText;
  note?: IObjectText;
  image?: string;
  startDate?: Date;
  endDate?: Date;
  point?: number;
  social?: any;
  office?: any;
  originalPoint?: any;
  brandInfo?: any;
  isOutOfStock: Boolean; // hết lượt đổi quà
}

const BRewardDetail = ({ navigation, route }) => {
  const insets = useSafeAreaInsets(); // for Iphone X
  const I18n = useContext(LocalizationContext);
  const [dataReward, setDataReward] = useState<IDataReward>();
  const { redeemGift } = bReward();
  const bRewardId = route?.params?.rewardId;

  const initData = async () => {
    const params: IParamsGetRewardDetail = {
      id: bRewardId,
    };
    // Show loading
    await store.dispatch(setLoading(true));
    // Call api get task detail
    const result: IRespond = await getRewardDetailAPI(params);
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

  // Render Number point or Free
  const _RenderPoint = () => {
    if (dataReward?.point) {
      return (
        <Box
          row
          flex
        >
          <Text
            variant="h1"
            color="secondary"
          >
            {formatMoney(dataReward?.point)}
          </Text>
          <Box center>
            <Text
              style={styles.linePoint}
              fontSize="m"
            >
              {dataReward?.originalPoint
                ? formatMoney(dataReward?.originalPoint)
                : null}
            </Text>
          </Box>
          <Box
            center
            style={styles.boxPoint}
          >
            <Text
              color="grey1"
              fontSize="m"
            >
              {I18n.t("TAB_BENEFIT.NUMBER_POINT")}
            </Text>
          </Box>
        </Box>
      );
    }
    return (
      <Text
        color="secondary"
        bold
        fontSize="xxl"
      >
        {I18n.t("TAB_BENEFIT.FREE")}
      </Text>
    );
  };

  const _RenderContent = () => {
    if (!_.isEmpty(dataReward)) {
      return (
        <Box flex>
          <ScrollView
            showsVerticalScrollIndicator={false}
            testID="scrollReward"
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
              {/* Box : Point */}
              <Box
                row
                between
                alignCenter
                margin="l"
              >
                <_RenderPoint />
                <Divider style={styles.divider} />
                <Box flex>
                  <Box>
                    <Text
                      fontSize="m"
                      color="grey1"
                      style={styles.txtRight}
                    >
                      {I18n.t("BREWARD.EXPIRED_DATE")}
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      bold
                      style={styles.txtTitle}
                    >
                      {formatDate(dataReward?.endDate, "other")}
                    </Text>
                  </Box>
                </Box>
                {/* Hết lượt đổi quà */}
                {dataReward?.isOutOfStock ? (
                  <Box style={styles.stamp}>
                    <Stamp
                      backgroundSize="xxl"
                      type="failed"
                      title={I18n.t("BREWARD.OUT_OF_STOCK")}
                    />
                  </Box>
                ) : null}
              </Box>
              {/* End : Point */}
              <Divider
                orientation={"vertical"}
                width={1}
                color="black"
              />
              <Box margin="l">
                <Text variant="h3">
                  {I18n.t("TAB_BENEFIT.LABEL_REWARD_INFO")}
                </Text>
                <MarkDown
                  text={getTextWithLocale(dataReward?.content).replace(
                    /"/g,
                    ""
                  )}
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
                  </Box>
                </Card>
              ) : null}
            </Box>
          </ScrollView>
          <Box
            style={[
              styles.wrapButton,
              insets.bottom && { paddingBottom: insets.bottom },
            ]}
          >
            <Button
              testID="btnRedeem"
              disabled={Boolean(dataReward?.isOutOfStock)}
              onPress={() => {
                redeemGift(bRewardId, dataReward?.point);
              }}
              title={I18n.t("TAB_BENEFIT.BUTTON_REDEEM")}
            />
          </Box>
        </Box>
      );
    }
    return (
      <Box center>
        <Text color="grey1">{I18n.t("TAB_BENEFIT.DETAIL_REWARD_EMPTY")}</Text>
      </Box>
    );
  };

  return (
    <Container>
      <_RenderContent />
    </Container>
  );
};

export default BRewardDetail;
