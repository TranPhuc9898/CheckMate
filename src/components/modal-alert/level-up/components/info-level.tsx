import { useContext } from "react";
import { ScrollView } from "react-native";
import { LocalizationContext } from "libs/context";
import { Divider, Image, Text, Box } from "components";
import { getTextWithLocale } from "libs/helper";
import { colors } from "libs/theme";
import styles from "../styles";

const InfoLevel = ({data}) => {
  const I18n = useContext(LocalizationContext);

  return (
    <ScrollView>
        <Text
          center
          variant="h2"
          color="secondary"
          style={styles.title}
        >
          {I18n.t("MODAL_ALERT.TITLE_MODAL_LEVEL_UP")}
        </Text>
      <Box
        center
        margin="xl"
      >
        <Image
          source={{
            uri: data?.icon,
          }}
          style={styles.image}
        />
      </Box>
      <Box center>
        <Text style={styles.txtLineHeight}>{I18n.t("JOURNEY.TEXT_MODAL_ALERT_LEVEL_UP")}</Text>
        <Text
          center
          variant="h3"
          color="secondary"
        >
          {getTextWithLocale(data?.title)} - <Text
            variant="h3"
            color="secondary"
          >
            {getTextWithLocale(data?.text)}
          </Text>
        </Text>
      </Box>
      <Divider
        color={colors.grey0}
        style={styles.dividerStyle}
      />
      <Box margin="l">
        <Text
          center
        >
          {I18n.t("JOURNEY.DESCRIPTION_MODAL_ALERT_LEVEL_UP")}
        </Text>
      </Box>
    </ScrollView>
  )
};
export default InfoLevel;