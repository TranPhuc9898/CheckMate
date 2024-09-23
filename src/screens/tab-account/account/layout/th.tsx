import { ScrollView } from "react-native";
import React from "react";
import HeaderHome from "@components/header-home";
import { LocalizationContext } from "@src/libs/context";
import { Box, Container } from "@src/components";
import Profile from "../components/profile";
import Finance from "../components/finance";
import WeeklyReport from "../components/weekly-report";
import Income from "../components/income";
import Settings from "../components/settings";
import Support from "../components/support";
import Share from "screens/tab-account/share";
import VersionApp from "../components/version-app";
import JourneyAndLeaderBoard from "../components/journey";
import BPoint from "../components/bPoint";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";

const AccountScreen = (props: any) => {
  const I18n = React.useContext(LocalizationContext);
  const { user } = useSelector((state: RootState) => state.app);

  const checkoutAccountCarAdvertising = () => {
    if (user?.isCarAdvertising) {
      return (
        <Box>
          {/* --------------------------------- PROFILE -------------------------------- */}
          <Profile {...props} />
          {/* ------------------------------- END PROFILE ------------------------------ */}
          {/* --------------------------------- JOURNEY -------------------------------- */}
          <JourneyAndLeaderBoard {...props} />
          {/* ------------------------------- END JOUNEY ------------------------------- */}
          {/* -------------------------------- SETTINGS -------------------------------- */}
          <Settings {...props} />
          {/* ------------------------------ END SETTINGS ------------------------------ */}
          {/* --------------------------------- SUPPORT -------------------------------- */}
          <Support {...props} />
          {/* ------------------------------- END SUPPORT ------------------------------ */}
          {/* --------------------------------- Version -------------------------------- */}
          <VersionApp {...props} />
          {/* ------------------------------- END Version ------------------------------ */}
        </Box>
      )
    }
    return (
      <Box>
        {/* --------------------------------- PROFILE -------------------------------- */}
        <Profile {...props} />
        {/* ------------------------------- END PROFILE ------------------------------ */}
        {/* --------------------------------- FINANCE -------------------------------- */}
        <Finance {...props} />
        {/* ------------------------------- END FINANCE ------------------------------ */}
        {/* --------------------------------- JOURNEY -------------------------------- */}
        <JourneyAndLeaderBoard {...props} />
        {/* ------------------------------- END JOUNEY ------------------------------- */}
        {/* --------------------------------- BPOINT -------------------------------- */}
        <BPoint />
        {/* ------------------------------- END BPOINT ------------------------------- */}
        {/* ------------------------------ WEEKLY REPORT ----------------------------- */}
        <WeeklyReport {...props} />
        {/* ---------------------------- END WEEKLY REPORT --------------------------- */}
        {/* --------------------------------- INCOME --------------------------------- */}
        <Income {...props} />
        {/* ------------------------------- END INCOME ------------------------------- */}
        {/* -------------------------------- SETTINGS -------------------------------- */}
        <Settings {...props} />
        {/* ------------------------------ END SETTINGS ------------------------------ */}
        {/* --------------------------------- SUPPORT -------------------------------- */}
        <Support {...props} />
        {/* ------------------------------- END SUPPORT ------------------------------ */}
        {/* --------------------------------- Share -------------------------------- */}
        <Share {...props} />
        {/* ------------------------------- END Share ------------------------------ */}
        {/* --------------------------------- Version -------------------------------- */}
        <VersionApp {...props} />
        {/* ------------------------------- END Version ------------------------------ */}
      </Box>
    )
  };

  return (
    <Container headerShow={false}>
      <HeaderHome
        title={I18n.t("HOME.TAB_ACCOUNT")}
        navigation={props.navigation}
      />
      <ScrollView testID="scrollViewAccount">
        {checkoutAccountCarAdvertising()}
      </ScrollView>
    </Container>
  );
};

export default AccountScreen;
