import React, {
  FunctionComponent,
  ComponentProps,
  useState,
  useContext,
} from "react";
import { InteractionManager, ViewProps } from "react-native";
import {
  CardItem,
  Box,
  Text,
  PriceItem,
  TransitionView,
} from "@src/components";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { LocalizationContext } from "@src/libs/context";
import { getTaskerMoneyDetailAPI } from "apis/user";
import { IRespond } from "libs/helper";
import styles from "./styles";
import { useAnimation } from "hooks/animation";

interface IFinance extends ViewProps {
  navigation?: any;
  user?: any;
  setLoading?: (isloading: boolean) => void;
}

const FinanceScreen: FunctionComponent<IFinance> = ({
  navigation,
  setLoading,
  user,
}) => {
  const isFocused = useIsFocused();
  const I18n = useContext(LocalizationContext);
  const [mainAccount, setMainAccount] = useState(0);
  const [promotionAccount, setPromotionAccount] = useState(0);
  const [isError, setIsError] = useState(true);

  const fetchData = async () => {
    // !mainAccount && setLoading(true);
    const respond: IRespond = await getTaskerMoneyDetailAPI();
    // setLoading(false);

    if (respond.isSuccess) {
      setMainAccount(respond?.data?.FMainAccount);
      setPromotionAccount(respond?.data?.PromotionAccount);
      setIsError(false);
      useAnimation("easeInEaseOut");
    } else {
      setIsError(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        // Gọi api lấy data
        fetchData();
      });

      return () => task.cancel();
    }, [isFocused])
  );

  return (
    <TransitionView
      index={1}
      duration={1000}
    >
      <CardItem
        iconName="right"
        testID="Finance"
        title={I18n.t("TAB_ACCOUNT.FINANCE")}
        onPress={() => navigation.navigate("Finance")}
      >
        <Box
          center
          style={styles.boxContainer}
        >
          <Text bold>{I18n.t("TAB_ACCOUNT.MAIN_ACCOUNT")}</Text>
          <Box
            row
            center
            style={styles.boxMainAccount}
          >
            <PriceItem
              loading={isError}
              testID="mainAccount"
              cost={mainAccount}
              priceStyle={styles.mainAccountStyle}
            />
          </Box>
        </Box>
        <Box
          row
          center
          style={styles.boxPromotionAccount}
        >
          <Text>{I18n.t("TAB_ACCOUNT.PROMOTION_ACCOUNT")}</Text>
          <PriceItem
            loading={isError}
            testID="promotionAccount"
            cost={promotionAccount}
            priceStyle={styles.promotionAccountStyle}
          />
        </Box>
      </CardItem>
    </TransitionView>
  );
};

export default FinanceScreen;
