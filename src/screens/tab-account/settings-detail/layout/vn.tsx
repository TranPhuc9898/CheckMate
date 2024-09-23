import { ScrollView } from "react-native";
import { Card, Container } from "@src/components";
import Language from "../components/language";
import Notifications from "../components/notifications";
import FreeSchedule from "../components/free-schedule";
import CheckNotification from "../components/check-notification";
import styles from "./styles";
import DeleteAccount from "../components/delele-account";
import RestartApp from "../components/restart-app";

const SettingsDetailScreen = (props: any) => {
  return (
    <Container>
      <ScrollView
        testID="ScrollViewSettings"
        contentContainerStyle={styles.btnScrollView}
      >
        <Card>
          {/* ---------------------------- LANGUAGE SETTING ---------------------------- */}
          <Language {...props} />
          {/* -------------------------- END LANGUAGE SETTING -------------------------- */}

          {/* -------------------------- NOTIFICATIONS SETTING ------------------------- */}
          <Notifications {...props} />
          {/* ------------------------ END NOTIFICATIONS SETTING ----------------------- */}

          {/* -------------------------- FREE SCHEDULE SETTING ------------------------- */}
          <FreeSchedule {...props} />
          {/* ------------------------ END FREE SCHEDULE SETTING ----------------------- */}
        </Card>

        {/* --------------------------------- RESTART APP ------------------------------ */}
        <RestartApp />
        {/* ------------------------------- END RESTART APP ---------------------------- */}

        {/* ----------------------------- CHECK NOTIFICATION --------------------------- */}
        <CheckNotification />
        {/* --------------------------- END CHECK NOTIFICATION ------------------------- */}

        {/* ----------------------------- CHECK DELETE ACCOUNT ------------------------- */}
        <DeleteAccount />
        {/* ------------------------- END CHECK DELETE ACCOUNT ------------------------- */}
      </ScrollView>
    </Container>
  );
};

export default SettingsDetailScreen;
