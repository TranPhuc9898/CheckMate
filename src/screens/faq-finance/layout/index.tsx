import { ScrollView, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
// Component
import { Box, Card, Container, Text, PriceItem, Icon } from "components";
// Libs
import { LocalizationContext } from "libs/context";
import AccordionItem from "./accordion-item";
import { getTaskerMoneyDetailAPI } from "apis/user";
import { IRespond, handleError } from "libs/helper";
import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";
import _ from "lodash";
import styles from "./styles";

const FAQScreen = ({ route, navigation }) => {
  const [moneyDetail, setMoneyDetail] = useState<any>({});

  const fetchData = async () => {
    await store.dispatch(setLoading(true));
    const respond: IRespond = await getTaskerMoneyDetailAPI();
    await store.dispatch(setLoading(false));
    if (respond.isSuccess) {
      setMoneyDetail(respond.data);
    } else {
      // Show lỗi và goBack khi onClosed Alert
      const onClosed = () => navigation.goBack();
      handleError(respond?.error, onClosed);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const I18n = useContext(LocalizationContext);

  const listItem = [
    {
      value: moneyDetail?.FMainAccount,
      title: I18n.t("TAB_ACCOUNT.MAIN_ACCOUNT"),
      content: I18n.t("TAB_ACCOUNT.FMAIN_ACCOUNT_NOTE"),
    },
    {
      value: moneyDetail?.PromotionAccount,
      title: I18n.t("TAB_ACCOUNT.PROMOTION_ACCOUNT"),
      content: I18n.t("TAB_ACCOUNT.PROMOTION_ACCOUNT_NOTE"),
    },
  ];
  const holding = [
    {
      title: I18n.t("TAB_ACCOUNT.HOLDING_ACCOUNT"),
      value: moneyDetail?.holdingAmount,
      content: I18n.t("TAB_ACCOUNT.ON_HOLD_ACCOUNT_NOTE"),
      numberTasks: moneyDetail?.numberTasks,
    },
  ];

  const RenderAmountWithdraw = () => {
    if (!moneyDetail?.waitingPayout) return null;
    return (
      <Card>
        <Box
          center
          style={styles.header}
        >
          <Box
            flex
            center
          >
            <Text style={styles.headerText}>
              {I18n.t("TAB_ACCOUNT.AMOUNT_WITHDRAW")}
            </Text>
            <PriceItem
              cost={moneyDetail?.waitingPayout}
              currencyStyle={styles.currencyStyle}
              priceStyle={styles.mainAccountStyle}
            />
          </Box>
        </Box>
        <Box center>
          <Text color="success">
            {I18n.t("TAB_ACCOUNT.AMOUNT_WITHDRAW_NOTE")}
          </Text>
        </Box>
      </Card>
    );
  };
  return (
    <Container>
      <ScrollView>
        <AccordionItem data={listItem} />
        <AccordionItem data={holding} />
        <RenderAmountWithdraw />
      </ScrollView>
    </Container>
  );
};

export default FAQScreen;
