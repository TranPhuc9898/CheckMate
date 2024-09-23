import { useContext } from "react";
import { Box, Container } from "@src/components";
import Finance from "../components/main-finance";
import Transaction from "../components/tab-transaction";
import Payout from "../components/tab-payout";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { configFinanceTab } from "navigation/config";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import HeaderSystem from "components/header-system";

const Tab = createMaterialTopTabNavigator();

const FinanceScreen = (props: any) => {
  const I18n = useContext(LocalizationContext);
  return (
    <Container headerShow={false}>
      <HeaderSystem
        navigation={props?.navigation}
        headerTitle={I18n.t("TAB_ACCOUNT.FINANCE")}
        headerIcon={"faq"}
        onPress={() => props.navigation.navigate("FAQFinanceScreen")}
      />
      <Box flex>
        {/* --------------------------------- FINANCE -------------------------------- */}
        <Finance {...props} />
        {/* ------------------------------- END FINANCE ------------------------------ */}
        {/* Tab transaction and payout */}
        <Box
          flex
          style={styles.container}
        >
          <Tab.Navigator {...configFinanceTab}>
            <Tab.Screen
              name="TabTransaction"
              component={Transaction}
              options={{
                tabBarLabel: I18n.t("TAB_ACCOUNT.TRANSACTION"),
                tabBarTestID: "TabTransaction",
              }}
            />
            <Tab.Screen
              name="TabPayout"
              component={Payout}
              options={{
                tabBarLabel: I18n.t("TAB_ACCOUNT.PAYOUT"),
                tabBarTestID: "TabPayout",
              }}
            />
          </Tab.Navigator>
        </Box>
      </Box>
    </Container>
  );
};

export default FinanceScreen;
