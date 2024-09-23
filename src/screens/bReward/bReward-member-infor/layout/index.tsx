import { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Text,
  Icon,
  ComingSoon,
  TransitionView,
} from "@src/components";
import { LocalizationContext } from "libs/context";
import { ImageBackground, InteractionManager } from "react-native";
import {
  IObjectText,
  IRespond,
  formatMoney,
  getIsoCodeGlobal,
  getTextWithLocale,
} from "libs/helper";
import { ScrollView } from "react-native";
import styles from "./styles";
import { RootState } from "redux/slice";
import { useSelector } from "react-redux";
import CarouselReward from "../../components/carousel-reward";
import MemberInforItem from "../../components/member-infor-item";
import getRecommendedForYou from "apis/breward/recommended-for-you";
import {
  COMING_SOON,
  JOURNEY_URL_TH,
  JOURNEY_URL_VN,
  THAILAND,
  VIETNAM,
} from "libs/constants";
import HeaderSystem from "components/header-system";
import _ from "lodash";
interface IDataReward {
  _id: string;
  title: IObjectText;
  content: IObjectText;
  note?: IObjectText;
  image?: string;
  startDate?: Date;
  endDate?: Date;
  point?: number;
}

interface IData {
  Weight?: number;
  text: IObjectText;
  type: string;
  rewards: IDataReward;
}

const SIZE_ICON = 56;
const RECOMMEND_FOR_YOU = "RECOMMEND_FOR_YOU";

const urlByCountry = new Map([
  [VIETNAM, JOURNEY_URL_VN],
  [THAILAND, JOURNEY_URL_TH],
]);

const MemberInfor = ({ navigation }) => {
  const I18n = useContext(LocalizationContext);
  const [dataReward, setDataReward] = useState<IData>();
  const [isComingSoon, setIsComingSoon] = useState(false);
  const { user } = useSelector((state: RootState) => state.app);

  const initData = async () => {
    const result: IRespond = await getRecommendedForYou();
    if (result?.isSuccess) {
      // Save data to state
      return setDataReward(result?.data);
    }
    // Kiểm tra lỗi COMING_SOON
    if (result?.error?.code === COMING_SOON) {
      return setIsComingSoon(true);
    }
  };

  useEffect(() => {
    const interaction = InteractionManager.runAfterInteractions(() => {
      // Gọi API lấy quà Gợi ý cho bạn
      initData();
    });
    return () => {
      interaction.cancel();
    };
  }, []);

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Text style={styles.txtLabel}>
          {I18n.t("MEMBER_INFO.LABEL_AVAILABLE_POINT")}
        </Text>
      ),
    });
  }, [navigation]);

  // Hiển thị sắp ra mắt
  if (isComingSoon) {
    return (
      <Container>
        <ComingSoon />
      </Container>
    );
  }

  const renderRecommendForYou = () => {
    if (_.isEmpty(dataReward?.rewards)) {
      return null;
    }
    return (
      <TransitionView
        index={1}
        duration={1000}
      >
        <CarouselReward
          navigation={navigation}
          data={dataReward?.rewards}
          title={getTextWithLocale(dataReward?.text)}
          type={dataReward?.type}
        />
      </TransitionView>
    );
  };

  return (
    <Container headerShow={false}>
      <HeaderSystem
        navigation={navigation}
        headerTitle={I18n.t("TAB_ACCOUNT.NUMBER_OF_POINT_LABEL")}
        headerIcon={"faq"}
        onPress={() => {
          // Lấy URL thông tin thêm Journey
          const urlWeb = urlByCountry.get(getIsoCodeGlobal()) || null;
          navigation.navigate("WebviewDetail", {
            url: urlWeb,
            title: I18n.t("TAB_ACCOUNT.NUMBER_OF_POINT_LABEL"),
          });
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Box style={styles.wrapContainer}>
          <ImageBackground
            imageStyle={styles.imageStyle}
            style={styles.imageBackground}
            source={require("@images/benefit/background-member-list.png")}
          >
            <Box
              row
              alignCenter
            >
              <Icon
                name="point"
                color="secondary"
                width={SIZE_ICON}
                height={SIZE_ICON}
                style={styles.iconPoint}
              />
              <Box>
                <Text style={styles.txtLabel}>
                  {I18n.t("MEMBER_INFO.LABEL_AVAILABLE_POINT")}
                </Text>
                <Text
                  variant="h1"
                  color="secondary"
                >
                  {formatMoney(user?.point || 0)}
                </Text>
              </Box>
            </Box>
          </ImageBackground>
        </Box>

        <MemberInforItem
          image={require("@images/benefit/browse-bRewards.png")}
          action={I18n.t("MEMBER_INFO.SEE_NOW")}
          title={I18n.t("MEMBER_INFO.BROWSE_BREWARD")}
          onPress={() => navigation.navigate("BReward")}
        />
        <MemberInforItem
          image={require("@images/benefit/bPoints-history.png")}
          action={I18n.t("MEMBER_INFO.VIEW")}
          title={I18n.t("MEMBER_INFO.BPOINT_HISTORY")}
          onPress={() => navigation.navigate("bPointsHistory")}
          testID="btnViewBPointHistory"
        />
        {renderRecommendForYou()}
      </ScrollView>
    </Container>
  );
};

export default MemberInfor;
