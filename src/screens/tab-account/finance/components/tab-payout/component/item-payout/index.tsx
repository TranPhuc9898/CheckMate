import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { Icon, Box, Text, PriceItem, Divider } from "components";
import { colors, spacing } from "libs/theme";
import { formatDate, getTextWithLocale } from "libs/helper";
import { iconName } from "components/icon";

import styles from "./styles";
interface ItemPayOut {
  style?: StyleProp<ViewStyle> | undefined;

  data: any;

  color?: any;

  testID?: string;

  label?: string;

  containerStyle?: object;

  icon?: keyof typeof iconName;

  iconColor?: keyof typeof colors;

  backGroundColor?: any;

  dividerColor?: any;
}
const ItemPayOut: React.FC<ItemPayOut> = ({
  style,
  data,
  color,
  testID,
  label,
  containerStyle,
  backGroundColor,
  dividerColor,
}) => {
  const isShowDate: Boolean = false;
  const { amount, type, createdAt, _id, reason, text, date } = data;
  const createdAtText = formatDate(isShowDate ? date : createdAt);
  const title = text || getTextWithLocale(reason);
  return (
    <Box
      key={_id}
      style={[styles.boxIteam, { backgroundColor: backGroundColor }]}
    >
      <Box
        row
        style={styles.box}
      >
        <Box>
          {/* Label : Rút tiền */}
          <Box style={styles.boxLabel}>{label ? <Text bold>{label}</Text> : null}</Box>

          {/* CreatedAt : Day */}
          <Box style={styles.boxCreatedAt}>
            <Text
              color="grey1"
              fontSize="m"
              // style={{ color }}
            >
              {createdAtText}
            </Text>
          </Box>
        </Box>
        <Box center>
          <PriceItem
            type={type}
            testID={testID}
            cost={amount}
            currencyStyle={{ ...styles.currencyStyle }}
            priceStyle={{ ...styles.priceStyle }}
          />
        </Box>
      </Box>
      <Box style={styles.boxDivider}>
        <Divider
          color={dividerColor}
          width={1}
        />
      </Box>

      <Box
        row
        style={styles.box}
      >
        <Box style={[styles.boxTitle, { backgroundColor: color }]}>
          <Text
          fontSize="m"
            style={styles.textReason}
          >
            {title}
          </Text>
        </Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default ItemPayOut;
