import { Box, Divider, Icon, PriceItem, Text } from "components";
import { formatDate, getTextWithLocale } from "libs/helper";
import { colors, spacing } from "libs/theme";
import Duration from "./duration";
import styles from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext, useState } from "react";
import { LocalizationContext } from "libs/context";
import { statusTask } from "libs/config";

const TaskItem = ({ item, index }) => {
  const I18n = useContext(LocalizationContext);
  const [activeSection, setActiveSection] = useState(false);

  // Hiển thị Tip
  const _renderTip = () => {
    if (item?.ratingTip) {
      return (
        <Box row>
          <Text>{I18n.t("TASK_DETAIL.TIP")} </Text>
          <PriceItem
            cost={item?.ratingTip}
            priceStyle={styles.tipStyles}
            currencyStyle={styles.currencyStyle}
          />
        </Box>
      );
    }
    // Nếu là task Cancel -> hiển thị Chi tiêt
    if (item?.status === statusTask.cancel) {
      return (
        <TouchableOpacity onPress={() => setActiveSection(!activeSection)}>
          <Box
            row
            alignCenter
          >
            <Text color="grey0">
              {activeSection
                ? I18n.t("DIALOG.BUTTON_CLOSE")
                : I18n.t("TAB_BENEFIT.VIEW_DETAIL")}
            </Text>
            <Icon
              color="grey1"
              name={setActiveSection ? "down" : "up"}
              size="xxl"
            />
          </Box>
        </TouchableOpacity>
      );
    }
    return null;
  };

  // Hiển thị thông tin cancel
  const _renderDetailCancel = () => {
    if (!activeSection) {
      return null;
    }
    return (
      <Box style={styles.wrapReason}>
        <Text style={styles.txtTop}>{getTextWithLocale(item?.cancelBy)}</Text>
        <Text>
          {I18n.t("TASK_DETAIL.CANCELED_REASON")}
          {": "}
          <Text bold>{getTextWithLocale(item?.reason)}</Text>
        </Text>
        {item?.cancelFee ? (
          <Box
            row
            style={styles.wrapCancelFee}
          >
            <Text>{I18n.t("TASK_DETAIL.CANCEL_FEE")}</Text>
            <PriceItem
              cost={item?.cancelFee}
              priceStyle={styles.cancelFeeStyle}
            />
          </Box>
        ) : null}
      </Box>
    );
  };

  return (
    <Box
      style={{
        backgroundColor: Math.round(index % 2)
          ? colors.background
          : colors.grey5,
        padding: spacing.l,
      }}
    >
      <Box
        row
        between
        alignCenter
      >
        <Box>
          <Text
            fontSize="xl"
            style={styles.txtTop}
          >
            {getTextWithLocale(item?.serviceText)}
          </Text>
          <Duration
            date={item?.date}
            duration={item?.duration}
          />
        </Box>
        <Box style={styles.wrapRight}>
          <Text style={styles.txtTop}>{formatDate(item?.date, "date")}</Text>
          <PriceItem
            cost={item?.cost}
            priceStyle={styles.priceItemStyle}
            currencyStyle={styles.currencyStyle}
          />
        </Box>
      </Box>
      <Divider
        color={Math.round(index % 2) ? colors.grey5 : colors.white}
        width={1}
        style={styles.dividerStyle}
      />
      <Box
        row
        alignCenter
        between
      >
        <Box>
          <TouchableOpacity
            style={
              item?.status === statusTask.done
                ? styles.btnDoneStyles
                : styles.btnCanceledStyles
            }
          >
            <Text color="white">{I18n.t("TASK_DETAIL." + item?.status)}</Text>
          </TouchableOpacity>
        </Box>
        {_renderTip()}
      </Box>
      {_renderDetailCancel()}
    </Box>
  );
};
export default TaskItem;
