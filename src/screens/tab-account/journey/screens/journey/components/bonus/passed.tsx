import { FC, useContext } from "react";
import { getTextWithLocale } from "libs/helper";
import { LocalizationContext } from "libs/context";
import { Box, MarkDown, Text } from "components";
import styles from "./styles";
import _ from "lodash";
import { useI18n } from "hooks/translation";

interface IBonusJourney {
  bonus?: any;
  missions?: any;
  notReceive?: any;
}

const BonusJourney: FC<IBonusJourney> = ({ bonus, missions, notReceive }) => {
  const { t } = useI18n();

  // Hiển thị phần thưởng thêm chưa nhận
  const _renderNotReceive = () => {
    if (_.isEmpty(notReceive)) {
      return null;
    }
    return (
      <Box style={styles.wrapNotReceive}>
        <Text bold>{t("JOURNEY.BONUS_NOT_RECEIVE")}</Text>
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
    )
  };

  // Hiển thị nhiệm vụ cần làm
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
  };

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
          {t("JOURNEY.TITLE_RECEIVED_REWARD")}
        </Text>
        {bonus?.map((item, index) => {
          if (_.isEmpty(item?.text)) {
            return null;
          }
          return (
            <Box
              row
              key={"bonus_" + index}
              style={styles.txtStyle}
            >
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
          )
        })}
      </Box>
    )
  };

  return (
    <Box>
      <Box
        flex
        style={styles.container}
      >
        {_renderBonus()}
        {_renderMissions()}
      </Box>
      {_renderNotReceive()}
    </Box>
  );
};

export default BonusJourney;
