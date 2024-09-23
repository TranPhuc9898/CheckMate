import { useContext } from "react";
import { ScrollView } from "react-native";
import { LocalizationContext } from "libs/context";
import { Image, Text, Box, MarkDown } from "components";
import { getTextWithLocale } from "libs/helper";
import styles from "../styles";
import { BPOINT } from "libs/constants";

const BONUS_PRIZE = "BONUS_PRIZE";

const BonusDetail = ({ data }) => {
  const I18n = useContext(LocalizationContext);

  const _renderImage = () => {
    if (data?.image) {
      return (
        <Image
          source={{
            uri: data?.image,
          }}
          style={styles.image}
        />
      )
    }
    return (
      <Image
        source={require("assets/images/alert/tip-background.png")}
        style={styles.image}
      />
    )
  }

  const _renderBonusPrize = () => {
    if (data?.name === BONUS_PRIZE) {
      return (
        <Text color="secondary" fontSize="xl" style={styles.txtLineHeight}>
          {I18n.t("JOURNEY.TEXT_BONUS_PRIZE")}{" "}
          <Text color="secondary" variant="h3">{data?.amount} {BPOINT}</Text>
        </Text>
      )
    }
    return null;
  }

  return (
    <ScrollView>
      <Box>
        <Text
          center
          variant="h3"
          color="secondary"
          style={styles.title}
          testID={"txtLevelUpReward"}
        >
          {I18n.t("JOURNEY.LABEL_MODAL_ALERT_LEVEL_UP_REWARD")}
        </Text>
      </Box>
      <Box
        flex
        center
        margin="xl"
      >
        {_renderImage()}
      </Box>
      <Box flex center>
        <MarkDown
          center
          textStyle={styles.txtMarkDown}
          text={getTextWithLocale(data?.text)}
        />
        {_renderBonusPrize()}
      </Box>
    </ScrollView>
  )
};
export default BonusDetail;