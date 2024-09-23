import { FC, useContext } from "react";
import { Box, Button, Icon, MarkDown, Text } from "components";
import { getTextWithLocale, navigateTo } from "libs/helper";
import { LocalizationContext } from "libs/context";
import BonusList from "./bonus-list";
import styles from "./styles";
import _ from "lodash";
import { useI18n } from "hooks/translation";

interface IBonusJourney {
  bonus?: any;
  reward?: any;
  missions?: any;
  notReceive?: any;
}

const BonusJourney: FC<IBonusJourney> = ({ bonus, reward, missions, notReceive }) => {
  const { t } = useI18n();

  const _renderMainPrize = () => {
    if (_.isEmpty(reward)) {
      return null;
    }
    return (
      <Box style={styles.wrapMainPrize}>
        <Text
        testID="MAIN_PRIZE_PROCESSING"
          bold
          fontSize="l"
        >
          {t("JOURNEY.TITLE_MAIN_PRIZE")}
        </Text>
        {reward?.map((item, index) => {
          return (
            <Box alignCenter key={"reward_" + index} row style={styles.txtStyle}>
              <MarkDown
                textStyle={styles.txtMarkDown}
                text={getTextWithLocale(item?.text)}
                paragraphStyle={styles.paragraphStyle}
              />
            </Box>
          );
        })}
      </Box>
    )
  }

  const _renderMissions = () => {
    if (_.isEmpty(missions)) {
      return null;
    }
    return (
      <Box style={styles.wrapMission}>
        <Text bold>{t("JOURNEY.LABEL_MISSION")}</Text>
        {missions?.map((item, index) => (
          <Box row key={"bonus_" + index} style={styles.txtStyle}>
            <Text
              fontSize="m"
            >{"•"}</Text>
            <Box flex style={styles.wrapTxt}>
              <MarkDown
                paragraphStyle={styles.paragraphStyle}
                textStyle={styles.txtMarkDown}
                text={getTextWithLocale(item?.text)}
              />
            </Box>
          </Box>
        ))}
      </Box>
    )
  }

  const _renderBonus = () => {
    if (_.isEmpty(bonus)) {
      return null;
    }
    return (
      <Box>
        <Text
        testID="BONUS_PROCESSING"
          bold
          fontSize="l"
        >
          {t("JOURNEY.TITLE_BONUS")}
        </Text>
        <BonusList bonus={bonus} />
      </Box>
    )
  }

  // Hiển thị phần thưởng thêm chưa nhận
  const _renderNotReceive = () => {
    if (_.isEmpty(notReceive)) {
      return null;
    }
    return (
      <Box style={styles.wrapNotReceive}>
        <Text bold>{t("JOURNEY.BONUS_NOT_RECEIVE")}</Text>
        <Box>
          {notReceive?.map((item, index) => (
            <Box row key={"bonus_" + index} style={styles.txtStyle}>
              <Text fontSize="m">{"•"}</Text>
              <Box flex style={styles.wrapTxt}>
                <MarkDown
                  textStyle={styles.txtMarkDown}
                  text={getTextWithLocale(item?.text)}
                  paragraphStyle={styles.paragraphStyle}
                />
              </Box>
            </Box>
          ))}
        </Box>
        <Box style={styles.wrapMission}>
            <Button
              size="md"
              buttonStyle={styles.btnStyle}
              onPress={() => navigateTo("SupportScreen")}
            >
              <Icon
                name="call"
                size="m"
              />
              <Text bold fontSize="m" color="white">{t("DIALOG.BUTTON_CALL_SUPPORT")}</Text>
            </Button>
        </Box>
      </Box>
    )
  };
  return (
    <Box>
      <Box
        flex
        style={styles.containerProcessing}
      >
        {_renderMainPrize()}
        {_renderBonus()}
        {_renderMissions()}
      </Box>
      {_renderNotReceive()}
      
      <Box margin="m">
        <Text center color="secondary">{t("JOURNEY.TEXT_TRAINING_TO_RECEIVE_BONUS")}</Text>
      </Box>
    </Box>
  );
};

export default BonusJourney;
