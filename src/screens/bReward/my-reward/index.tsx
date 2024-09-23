import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LocalizationContext } from "@src/libs/context";
import MyGift from "screens/bReward/my-reward/new-gift";
import UsedGift from "screens/bReward/my-reward/used-gift";
import { configFinanceTab } from "navigation/config";
import HeaderReward from "components/header-reward";
import { Container } from "components";
import styles from "./styles";

const Tab = createMaterialTopTabNavigator();

const BRewardTab = ({ navigation }) => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <Container
      style={styles.containerStyle}
      headerShow={false}
    >
      <HeaderReward
        navigation={navigation}
        headerStyle={styles.headerStyle}
        giftStyle={styles.giftStyle}
        title={I18n.t("BREWARD.MY_REWARD")}
        isHideRightIcon={true}
      />
      <Tab.Navigator {...configFinanceTab}>
        <Tab.Screen
          name="TabNewTask"
          component={MyGift}
          options={{
            tabBarLabel: I18n.t("TAB_BENEFIT.NEW_GIFT"),
            tabBarTestID: "TabBReward",
          }}
        />
        <Tab.Screen
          name="TabMyTask"
          component={UsedGift}
          options={{
            tabBarLabel: I18n.t("TAB_BENEFIT.USED_GIFT"),
            tabBarTestID: "TabMyReward",
          }}
        />
      </Tab.Navigator>
    </Container>
  );
};

export default BRewardTab;
