/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-27 14:48:49
 * @modify date 2023-03-27 14:48:49
 * @desc [Content modal detail reward]
 */
import { Box, Icon, Text } from "components";
import { LocalizationContext } from "libs/context";
import { formatMoney } from "libs/helper";
import { useContext } from "react";
import styles from "../styles";

const ModalRewardDetail = ({ dataReward, nextRewardHours, currency }) => {
  const I18n = useContext(LocalizationContext);

  const _handleRenderLevel = (hours, index) => {
    if (!nextRewardHours) {
      return (
        <Box
          key={index}
          style={styles.current}
        >
          <Icon
            name="checked"
            size="l"
            color="white"
          />
        </Box>
      )
    }
    if (hours < nextRewardHours) {
      return (
        <Box
          key={index}
          style={styles.current}
        >
          <Icon
            name="checked"
            size="l"
            color="white"
          />
        </Box>
      );
    }
    if (hours === nextRewardHours) {
      return (
        <Box
          key={index}
          style={styles.nextStep}
        />
      );
    }
    return (
      <Box
        key={index}
        style={styles.unStep}
      />
    );
  };

  return (
    <Box>
      {dataReward?.awards?.map((level, index) => {
        return (
          <Box
            row
            flex
            key={index}
            style={styles.boxDataReward2}
          >
            <Box
              center
              style={styles.boxBody}
            >
              {_handleRenderLevel(level.hours, index)}
            </Box>
            <Box
              style={styles.textRewardNoti}
            >
              <Text left>{I18n.t("TAB_BENEFIT.HOURS_OF_AWARDS", {t: level.hours})}</Text>
            </Box>
            <Box
              center
              style={styles.textRewardNoti2}
            >
              <Icon
                size="l"
                name="reward"
                color="black"
              />
            </Box>
            <Box
              flex
              style={styles.textRewardNoti3}
            >
              <Text
                bold
                color="primary"
                right
              >
                {I18n.t("TAB_BENEFIT.MONEY", {cost: formatMoney(level.gift), currency: currency})}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
export default ModalRewardDetail;
