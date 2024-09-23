import { Box, Card, Text } from "components";
import { LocalizationContext } from "libs/context";
import { formatMoney, getCountry } from "libs/helper";
import { FC, useContext } from "react";
import styles from "../styles";

interface ILevelReward {
  moreTime: number;
  remainingDays: number;
  nextRewardGift: number;
  nDoneTaskInMonth: number;
  currentRewardGift: number;
}

const LevelReward: FC<ILevelReward> = ({
  moreTime,
  remainingDays,
  nextRewardGift,
  nDoneTaskInMonth,
  currentRewardGift,
}) => {
  const I18n = useContext(LocalizationContext);
  const country = getCountry();

  const _renderNextLevelReward = () => {
    // Nếu số giờ cần làm thêm > 0 thì hiển thị
    if (moreTime > 0) {
      return (
        <Box row>
          <Box
            // center
            flex
            style={styles.box}
          >
            {/* Cần làm thêm */}
            <Text
              center
              fontSize="m"
            >
              {I18n.t("TAB_BENEFIT.MORE_HOURS")}
            </Text>
            <Box
              flex
              center
              style={styles.textHours}
            >
              <Text
                bold
                color="primary"
              >
                {moreTime} {I18n.t("TAB_BENEFIT.HOURS")}
              </Text>
            </Box>
          </Box>
          <Box>
            <Text
              center
              fontSize="m"
            >
              {I18n.t("TAB_BENEFIT.MORE_REWARD")}
            </Text>
            <Box
              center
              style={styles.textReward}
            >
              <Text
                bold
                color="secondary"
              >
                {I18n.t("TAB_BENEFIT.MONEY", {
                  cost: formatMoney(nextRewardGift),
                  currency: country?.currency?.sign,
                })}
              </Text>
            </Box>
          </Box>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box style={styles.containerCurrentLevel}>
      <Card>
        {_renderNextLevelReward()}
        <Box
          row
          style={styles.textBox}
        >
          <Text>{I18n.t("TAB_BENEFIT.TIME_WORK_IN_MONTH")}</Text>
          <Text bold>
            {" "}
            {nDoneTaskInMonth} {I18n.t("TAB_BENEFIT.HOURS")}
          </Text>
        </Box>
        <Box
          row
          style={styles.textBox}
        >
          <Text>{I18n.t("TAB_BENEFIT.REWARD_WORD_IN_MONTH")}</Text>
          <Text bold>
            {" "}
            {I18n.t("TAB_BENEFIT.MONEY", {
              cost: formatMoney(currentRewardGift),
              currency: country?.currency?.sign,
            })}
          </Text>
        </Box>
        <Box
          row
          style={styles.textBox}
        >
          <Text>{I18n.t("TAB_BENEFIT.DAY_LEFT")}</Text>
          <Text bold>
            {" "}
            {remainingDays} {I18n.t("TAB_BENEFIT.DAY")}
          </Text>
        </Box>
      </Card>
    </Box>
  );
};
export default LevelReward;
