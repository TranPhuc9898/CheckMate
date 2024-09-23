/* --------------------------------- PACKAGE -------------------------------- */
import _ from "lodash";
import RNFS from "react-native-fs";
import Share from "react-native-share";
import ViewShot from "react-native-view-shot";
import Toast from "react-native-simple-toast";
import React, { FC, useMemo, useEffect, useState } from "react";
import { Animated, ImageBackground, TouchableOpacity } from "react-native";
/* ------------------------------- END PACKAGE ------------------------------ */

/* -------------------------------- COMPONENT ------------------------------- */
import { Text, Box, PriceItem, TransitionView } from "@src/components";
/* ------------------------------ END COMPONENT ----------------------------- */

/* --------------------------------- HELPER --------------------------------- */
import styles from "./styles";
import { colors } from "libs/theme";
import { formatMoney } from "libs/helper";
import { LocalizationContext } from "@src/libs/context";
/* ------------------------------- END HELPER ------------------------------- */

/* ----------------------------------- API ---------------------------------- */
import getMonthlyRewardAPI from "apis/benefit/get-monthly-reward";
/* --------------------------------- END API -------------------------------- */

export interface IMonthlyRewardScreen {
  navigation?: any;
}
interface IMonthlyRewardData {
  awards: any;
  percent: any;
  rewardInfo: any;
  nextRewardGift: any;
  nextRewardHours: any;
  conditionReceive: any;
  nDoneTaskInMonth: any;
  currentRewardGift: any;
}

const MonthlyRewardScreen: FC<IMonthlyRewardScreen> = ({ navigation }) => {
  const I18n = React.useContext(LocalizationContext);
  const viewShotRef = React.useRef(null);
  const [errorMonthly, setErrorMonthly] = useState(false);
  const [conditionReceive, setConditionReceive] = useState({});
  const [rewardInfo, setRewardInfo] = useState<IMonthlyRewardData>();

  // Init data monthly reward
  const getDataMonthlyReward = async () => {
    // Call api get task detail
    const respond: any = await getMonthlyRewardAPI();
    if (respond.isSuccess) {
      // Save data to state
      setConditionReceive(respond?.data?.conditionReceive);
      setRewardInfo(respond?.data?.rewardInfo);
      setErrorMonthly(false);
    } else {
      setErrorMonthly(true);
    }
  };

  useEffect(() => {
    getDataMonthlyReward();
  }, []);

  // Show point by level
  const renderPoint = useMemo(() => {
    // Nếu không có dữ liệu thì return null
    if (_.isEmpty(rewardInfo?.awards)) {
      return null;
    }
    const items = [];
    for (let i = 0; i <= rewardInfo?.awards.length; i++) {
      const item = (
        <Text
          key={"points" + i}
          color="primary2"
          fontSize="s"
          style={{ color: !i ? "white" : colors.primary2 }}
        >
          {"\u2B24"}
        </Text>
      );
      items.push(item);
    }
    return (
      <Box
        row
        alignCenter
        style={styles.boxPoint}
      >
        {items}
      </Box>
    );
  }, [rewardInfo]);

  // Hiển thị số tiền trong thanh thưởng tháng
  const _showMoney = () => {
    if (!rewardInfo?.currentRewardGift) {
      return null;
    }
    if (rewardInfo?.currentRewardGift > 1000) {
      // Nếu số tiền lớn hơn 1000 thì rút gọn về k. Example: 150.000 -> 150k
      return formatMoney(rewardInfo?.currentRewardGift / 1000) + "k";
    }
    return formatMoney(rewardInfo?.currentRewardGift);
  };

  const _renderFill = useMemo(() => {
    if (!rewardInfo?.percent) {
      return null;
    }
    return (
      <>
        <Animated.View
          style={[
            styles.inner,
            {
              width: `${rewardInfo?.percent}%`,
              position: "absolute",
            },
          ]}
        />
        <Box
          center
          style={{
            width: `${rewardInfo?.percent}%`,
            position: "absolute",
          }}
        >
          <Text
            bold
            center
            fontSize="m"
            color="white"
          >
            {_showMoney()}
          </Text>
        </Box>
      </>
    );
  }, [rewardInfo]);

  const _renderTextContent = () => {
    if (!rewardInfo?.nextRewardHours) {
      return (
        <Box
          row
          style={styles.boxNote}
        >
          <Text
            testID="txtNextLevelReward"
            fontSize="m"
          >
            {I18n.t("TAB_BENEFIT.MAX_LEVEL")}
          </Text>
        </Box>
      );
    }
    return (
      <>
        <Text
          testID="txtNextLevelReward"
          fontSize="m"
        >
          {I18n.t("TAB_BENEFIT.LEVEL_MONTHLY_REWARD", {
            t: rewardInfo?.nextRewardHours - rewardInfo?.nDoneTaskInMonth,
          })}
        </Text>
      </>
    );
  };

  // Handle share
  const _handleShare = () => {
    viewShotRef?.current.capture().then((uri) => {
      // Chụp ảnh màn hình
      RNFS.readFile(uri, "base64").then((res) => {
        let urlString = "data:image/png;base64," + res;
        let options = {
          title: I18n.t("TAB_BENEFIT.MONTHLY_REWARD"),
          message: "",
          url: urlString,
          type: "image/png",
        };
        // Chia sẻ
        Share.open(options)
          .then((res) => {
            Toast.showWithGravity(
              I18n.t("TAB_BENEFIT.LABEL_SAVE_SUCCESS"),
              Toast.SHORT,
              Toast.BOTTOM
            );
          })
          .catch((err) => {});
      });
    });
  };

  // If error => return
  if (errorMonthly) {
    return null;
  }

  return (
    <TransitionView
      index={1}
      duration={1500}
    >
      <ImageBackground
        resizeMode="cover"
        style={styles.boxBackground}
        source={require("@images/benefit/background-monthly-reward.png")}
        imageStyle={styles.imageBackgroundStyle}
      >
        <TouchableOpacity
          style={styles.containerQuestion}
          testID="btnMonthlyDetail"
          onPress={() =>
            navigation.navigate("MonthlyRewardDetailBenefit", {
              conditionReceive: conditionReceive,
              dataReward: rewardInfo,
            })
          }
        >
          <Box
            center
            row
            style={styles.boxTitle}
          >
            <Text bold>{I18n.t("TAB_BENEFIT.MONTHLY_REWARD")}</Text>
            <Box
              row
              center
            >
              <Text
                bold
                color="primary"
                fontSize="s"
                style={styles.txtReward}
              >
                {I18n.t("TAB_BENEFIT.NEXT_REWARD")}
              </Text>
              <PriceItem
                cost={rewardInfo?.nextRewardGift}
                currencyStyle={styles.currencyStyle}
                priceStyle={styles.priceStyle}
              />
            </Box>
          </Box>
          <ViewShot
            ref={viewShotRef}
            options={{ format: "png" }}
          >
            <Box style={styles.container}>
              <Box style={styles.boxInLine}>
                {renderPoint}
                {_renderFill}
              </Box>
            </Box>
            <Box
              row
              alignCenter
              style={styles.containerQuestion}
            >
              <Box
                row
                style={styles.boxNote}
              >
                {_renderTextContent()}
              </Box>
            </Box>
          </ViewShot>
        </TouchableOpacity>
      </ImageBackground>
    </TransitionView>
  );
};

export default MonthlyRewardScreen;
