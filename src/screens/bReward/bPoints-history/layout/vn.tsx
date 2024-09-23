import React from "react";
import { Container } from "components";
import { LocalizationContext } from "@src/libs/context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { configFinanceTab } from "navigation/config";
import HeaderReward from "components/header-reward";
import ReceivedBPoint from "../received";
import UsedBPoint from "../used";
import styles from "./styles";

const Tab = createMaterialTopTabNavigator();

const BRewardTab = ({ navigation }) => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <Container
      headerShow={false}
      style={styles.containerStyle}
    >
      <HeaderReward
        navigation={navigation}
        headerStyle={styles.headerStyle}
        giftStyle={styles.giftStyle}
        title={I18n.t("MEMBER_INFO.BPOINT_HISTORY")}
        isHideRightIcon={true}
      />
      <Tab.Navigator {...configFinanceTab}>
        <Tab.Screen
          name="TabReceivedBPoint"
          component={ReceivedBPoint}
          options={{
            tabBarLabel: I18n.t("BREWARD.TITLE_BPOINT_HISTORY_RECEIVED"),
            tabBarTestID: "TabReceivedBPoint",
          }}
        />
        <Tab.Screen
          name="TabUsedBPoint"
          component={UsedBPoint}
          options={{
            tabBarLabel: I18n.t("BREWARD.TITLE_BPOINT_HISTORY_USED"),
            tabBarTestID: "TabUsedBPoint",
          }}
        />
      </Tab.Navigator>
    </Container>
  );
};

export default BRewardTab;
