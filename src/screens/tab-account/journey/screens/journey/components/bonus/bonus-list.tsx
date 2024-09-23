import { FC, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Alert, Box, Icon, MarkDown, Text } from "components";
import { LocalizationContext } from "libs/context";
import { getTextWithLocale } from "libs/helper";
import BonusPrize from "./bonus-prize";
import styles from "./styles";

interface IBonusList {
  bonus?: any;
}

const BONUS_PRIZE = "BONUS_PRIZE";

const BonusList: FC<IBonusList> = ({ bonus }) => {
  const I18n = useContext(LocalizationContext);

  const _handleShowBonusPrize = (data) => {
    return Alert.alert.open({
      title: "JOURNEY.TITLE_PRIZE_BONUS",
      message: <BonusPrize data={data} />,
      actions: null
    })
  }

  return (bonus?.map((item, index) => {
    if (item?.name === BONUS_PRIZE) {
      return (
        <TouchableOpacity
          testID="txtBonus"
          key={"bonus_" + index}
          style={styles.txtStyle}
          onPress={() => _handleShowBonusPrize(item)}
        >
          <Box row alignCenter>
            <Text
              bold
              fontSize="m"
              color="primary"
            >• </Text>
            <Text
              bold
              fontSize="m"
              color="primary"
              style={styles.txtBonusPrize}
            >{I18n.t("JOURNEY.BONUS_PRIZE")}</Text>
            <Icon
              size="m"
              name="faq"
              color="primary"
              style={styles.iconStyle}
            />
          </Box>
        </TouchableOpacity>
      )
    }
    return (
      <Box row key={"bonus_" + index} style={styles.txtStyle}>
        <Text
          fontSize="m"
        >{"•"}</Text>
        <Box flex style ={styles.wrapTxt}>
          <MarkDown
            text={getTextWithLocale(item?.text)}
            textStyle={styles.txtMarkDown}
            paragraphStyle={styles.paragraphStyle}
          />
        </Box>
      </Box>
    );
  })
  )
};

export default BonusList;