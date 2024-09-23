import HeaderHome from "@components/header-home";
import { Container } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import React from "react";
import { ScrollView } from "react-native";
import Finance from "../components/finance";
import Income from "../components/income";
import Profile from "../components/profile";
import Settings from "../components/settings";
import WeeklyReport from "../components/weekly-report";
import Support from "../components/support";
import Share from "screens/tab-account/share";
import VersionApp from "../components/version-app";
import JourneyAndLeaderBoard from "../components/journey";
import BPoint from "../components/bPoint";
const AccountScreen = (props: any) => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <Container headerShow={false}>
      <HeaderHome
        title={I18n.t("HOME.TAB_ACCOUNT")}
        navigation={props.navigation}
      />
      <ScrollView testID="scrollViewAccount">
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
      </ScrollView>
    </Container>
  );
};

export default AccountScreen;
