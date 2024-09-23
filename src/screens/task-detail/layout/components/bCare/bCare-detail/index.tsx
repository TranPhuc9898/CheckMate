import { useEffect } from "react";
import { Box, Text } from "components";
import { ScrollView } from "react-native";
import styles from "./styles";
import { useContext } from "react";
import { LocalizationContext } from "libs/context";
import BackgroundTop from "./components/background-top";
import Role from "./components/role";
import Condition from "./components/condition";
import Benefit from "./components/benefit";
import Fee from "./components/fee";
import Procedure from "./components/procedure";
import Require from "./components/require";
import HeaderBCare from "./components/header";
import { trackingCleverTapScreenView } from "@src/libs/tracking/track-clever-tap";

const BCareDetail = ({ navigation }) => {
  const I18n = useContext(LocalizationContext);

  useEffect(() => {
    trackingCleverTapScreenView("bCare");
  }, []);

  return (
    <Box style={styles.scrollStyle}>
      <HeaderBCare
        navigation={navigation}
        headerTitle={I18n.t("TAB_BENEFIT.BCARE")}
      />
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollStyle}
      >
        <Box style={styles.backgroundContent}>
          {/* Header */}
          <BackgroundTop />
          {/* End header */}

          {/* Content */}
          <Box style={styles.containerContent}>
            <Text
              center
              color="white"
              fontSize="m"
            >
              {I18n.t("BCARE.HEADER_TEXT")}
            </Text>
          </Box>

          {/* Role */}
          <Role />
          {/* End role */}

          {/* Condition */}
          <Condition />
          {/* End condition */}

          {/* Benefit */}
          <Benefit />
          {/* End benefit */}

          {/* Fee */}
          <Fee />
          {/* End fee */}

          {/* Procedure */}
          <Procedure />
          {/* End procedure */}

          {/* Require */}
          {/* End require */}
          <Require />
          {/* End content */}
        </Box>
      </ScrollView>
    </Box>
  );
};
export default BCareDetail;
