import { useContext } from "react";
import { ScrollView } from "react-native";
import { Box, Card, Container, Divider, Text } from "components";
import CalculateScore from "./components/calculate-score";
import { LocalizationContext } from "libs/context";
import styles from "./styles";

const CalculateScoreLeaderBoard = () => {
  const I18n = useContext(LocalizationContext);

  return (
    <Container>
      <ScrollView>
        {/* Calculate score */}
        <CalculateScore />
        {/* End calculate score */}

        {/* Rating */}
        <Card>
          <Box>
            <Text bold center>{I18n.t("JOURNEY.TITLE_RATING_SERVICE_QUALITY")}</Text>
            <Text center fontSize="m" color="secondary" fontWeight="m" style={styles.txtPaddingTop}>{I18n.t("JOURNEY.TEXT_RATING_SERVICE_QUALITY_1")}</Text>
            <Divider style={[styles.dividerStyle, styles.dividerPadding]} />
            <Text center fontSize="m">{I18n.t("JOURNEY.TEXT_RATING_SERVICE_QUALITY_2")}</Text>
          </Box>
        </Card>
        {/* End rating */}

        {/* Duration */}
        <Card>
          <Box>
            <Text bold center>{I18n.t("JOURNEY.TITLE_DURATION")}</Text>
            <Text center fontSize="m" fontWeight="m" color="secondary" style={styles.txtPaddingTop}>{I18n.t("JOURNEY.TEXT_DURATION_1")}</Text>
            <Divider style={[styles.dividerStyle, styles.dividerPadding]} />
            <Text center fontSize="m">{I18n.t("JOURNEY.TEXT_DURATION_2")}</Text>
          </Box>
        </Card>
        {/* End duration */}
      </ScrollView>
    </Container>
  )
};
export default CalculateScoreLeaderBoard;
