import { FC } from "react";
import { Box, MarkDown, Text } from "components";
import { getTextWithLocale } from "libs/helper";
import styles from "./styles";
import _ from "lodash";
import { useI18n } from "hooks/translation";

interface IBonusJourney {
  bonus?: any;
  reward?: any;
  missions?: any;
}

const BonusJourney: FC<IBonusJourney> = ({ bonus, reward, missions }) => {
  const { t } = useI18n();

  const _renderMainPrize = () => {
    if (_.isEmpty(reward)) {
      return null;
    }
    return (
      <Box style={[styles.wrapMainPrize, styles.container]}>
        <Text
          bold
          fontSize="l"
          color={"grey1"}
        >
          {t("JOURNEY.TITLE_MAIN_PRIZE")}
        </Text>
        {reward?.map((item, index) => {
          return (
            <Box alignCenter key={"reward_" + index} row style={styles.txtStyle}>
              <MarkDown
                textStyle={styles.txtGreyMarkDown}
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
        <Text bold color="grey1">{t("JOURNEY.LABEL_MISSION")}</Text>
        {missions?.map((item, index) => (
          <Box key={"bonus_" + index} row style={styles.txtStyle}>
            <Text
              fontSize="m"
              color="grey1"
            >{"•"}</Text>
            <Box flex style={styles.wrapTxt}>
              <MarkDown
                textStyle={styles.txtGreyMarkDown}
                text={getTextWithLocale(item?.text)}
                paragraphStyle={styles.paragraphStyle}
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
          bold
          fontSize="l"
          color={"grey1"}
        >
          {t("JOURNEY.TITLE_BONUS")}
        </Text>
        {bonus?.map((item, index) => {
          if (_.isEmpty(item?.text)) {
            return null;
          }
          return (
            <Box key={"bonus_" + index} row style={styles.txtStyle}>
              <Text
                fontSize="m"
                color={"grey1"}
              >{"•"}</Text>
              <Box flex style={styles.wrapTxt}>
                <MarkDown
                  textStyle={styles.txtGreyMarkDown}
                  text={getTextWithLocale(item?.text)}
                  paragraphStyle={styles.paragraphStyle}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    )
  };

  return (
    <Box flex>
        {_renderMainPrize()}
      <Box
        flex
        style={styles.container}
      >
        {_renderBonus()}
        {_renderMissions()}
      </Box>
    </Box>
  );
};

export default BonusJourney;
