import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LocalizationContext } from "@src/libs/context";
import { Container } from "components";
import { configTopTab } from "navigation/config";
import React from "react";
import JourneyScreen from "../screens/journey";
import LeaderBoardScreen from "../screens/leader-board";
import { StyleSheet, Platform } from "react-native";
import { spacing } from "libs/theme";
import HeaderJourney from "components/header-journey";
import { JOURNEY_URL_TH, JOURNEY_URL_VN, THAILAND, VIETNAM } from "libs/constants";
import { getIsoCodeGlobal } from "libs/helper";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
const Tab = createMaterialTopTabNavigator();

const urlByCountry = new Map([
  [VIETNAM, JOURNEY_URL_VN],
  [THAILAND, JOURNEY_URL_TH],
]);

const JourneyAndLeaderBoard = () => {
  const I18n = React.useContext(LocalizationContext);
  const { isShowModalSeeMoreJourney } = useSelector((state: RootState) => state.app);

  return (
    <Container
      headerShow={false}
      contentContainerStyle={styles.container}
    >
      <HeaderJourney
        isShowRightButton={!isShowModalSeeMoreJourney}
        url={urlByCountry.get(getIsoCodeGlobal()) || null}
      />
      <Tab.Navigator {...configTopTab}>
        <Tab.Screen
          name="JourneyScreen"
          component={JourneyScreen}
          options={{
            tabBarTestID: "JOURNEY_SCREEN",
            tabBarLabel: I18n.t("JOURNEY.TITLE"),
          }}
        />
        <Tab.Screen
          name="LeaderboardScreen"
          component={LeaderBoardScreen}
          options={{
            tabBarTestID: "LEADER_BOARD_SCREEN",
            tabBarLabel: I18n.t("JOURNEY.LEADER_BOARD_SCREEN"),
          }}
        />
      </Tab.Navigator>
    </Container>
  );
};

export default JourneyAndLeaderBoard;
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginTop: spacing.m,
      },
    }),
  },
});
