import { FunctionComponent, useEffect, useState, useContext } from "react";
import { ScrollView } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Box, Card, Text } from "@src/components";
import { IRespond } from "libs/helper";
import { getweeklyPayoutAPI } from "apis/user";
import { payoutStatus } from "libs/config";
import { colors } from "@src/libs/theme";
import { store } from "redux/store";
import { setLoading } from "redux/slice/app-slice";
import _ from "lodash";
import { useIsFocused } from "@react-navigation/native";
import styles from "./styles";
import ItemPayOut from "./component/item-payout";

const WeeklyPayoutScreen: FunctionComponent<{}> = () => {
  const I18n = useContext(LocalizationContext);
  const [weeklyPayout, setWeeklyPayout] = useState([]);
  const isFocused = useIsFocused();

  const fetchWeeklyPayout = async () => {
    _.isEmpty(weeklyPayout) && await store.dispatch(setLoading(true));
    const result: IRespond = await getweeklyPayoutAPI({ limit: 30 });
    await store.dispatch(setLoading(false));
    _.isEmpty(weeklyPayout) && setWeeklyPayout(result?.data || []);
  };

  useEffect(() => {
    isFocused && fetchWeeklyPayout();
  }, [isFocused]);

  const renderItem = (item: any, index: number) => {
    let color = colors.grey0;
    let text = "";
    switch (item?.status) {
      case payoutStatus.paid:
        color = colors.success;
        text = I18n.t("TAB_ACCOUNT.PAYOUT_PAID");
        break;
      case payoutStatus.wait:
        color = colors.warning;
        text = I18n.t("TAB_ACCOUNT.PAYOUT_WAIT");
        break;
      case payoutStatus.canceled:
        color = colors.error;
        text = I18n.t("TAB_ACCOUNT.PAYOUT_CANCELED");
      case payoutStatus.rejected:
        color = colors.error;
        text = I18n.t("TAB_ACCOUNT.PAYOUT_REJECTED");
        break;
    }
    return (
      <ItemPayOut
        testID={`trasaction-${index}`}
        data={{ ...item, text }}
        key={index}
        color={color}
        backGroundColor={index % 2 !== 0 ? colors.grey5 : colors.white}
        dividerColor={index % 2 !== 0 ? colors.white : colors.grey2}
        label={I18n.t("TAB_ACCOUNT.WITHDRAW")}
      />
    );
  };

  if (_.isEmpty(weeklyPayout)) {
    return (
      <Box
        center
        margin="l"
      >
        <Text color="grey0">{I18n.t("TAB_ACCOUNT.EMPTY_PAYOUT")}</Text>
      </Box>
    );
  }

  return (
    <Box
      flex
      style={styles.container}
    >
      <Card
        flex
        style={styles.cardStyle}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {weeklyPayout.map((item, index) => renderItem(item, index))}
        </ScrollView>
      </Card>
    </Box>
  );
};

export default WeeklyPayoutScreen;
