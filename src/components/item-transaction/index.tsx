/**
 * @author Huu Toan Nguyen
 * @email huutoan.nguyen@btaskee.com
 * @create date 2022-10-28 09:00
 * @modify date 2022-10-11 09:17
 * @desc custom text component
 */

import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { colors, fontSize, spacing } from "@src/libs/theme";
import { formatDate, getCurrency, getTextWithLocale } from "libs/helper";
import { Text, Box, PriceItem, Divider, Icon } from "@src/components";
import { iconName } from "components/icon";
interface IItemTransaction extends React.ComponentProps<typeof View> {
  /**
   * Data of item
   */
  data: any;

  /**
   * Bold of Title text
   */
  boldTitle?: boolean;

  /**
   * Color of text
   */
  color?: any;

  /**
   * TestId of transaction
   */
  testID?: string;
  /**
   * label of item
   */
  label?: string;
  /**
   * label of item
   */
  containerStyle?: object;
  /**
   * Icon of item
   */
  icon?: keyof typeof iconName;
  /**
   * Icon of item
   */
  iconColor?: keyof typeof colors;
  /**
   * Show date or created date
   * @default false
   * Show created date
   */
  isShowDate: boolean;

  dateStyle?: any;
}

const ComponentItemTransaction: React.FunctionComponent<IItemTransaction> = ({
  data,
  boldTitle,
  color,
  testID,
  label,
  containerStyle,
  icon,
  iconColor,
  isShowDate = false,
  dateStyle,
}) => {
  const { amount, type, createdAt, _id, reason, text, date } = data;
  const createdAtText = formatDate(isShowDate ? date : createdAt);
  const title = text || getTextWithLocale(reason);
  return (
    <Box
      key={_id}
      row
      center
      style={containerStyle}
    >
      {
        icon ? (
          <Box style={{backgroundColor:iconColor}}>
                     <Icon
            name={icon}
            color={iconColor}
            size="xxxl"
          />
          </Box>
 
        ) : null
      }
      <Box style={styles.boxIteam}>
        {label ? (
          <Text
            numberOfLines={2}
            style={styles.labelStyle}
          >
            {label}
          </Text>
        ) : null}
        <Text
          bold={boldTitle}
          numberOfLines={2}
          style={[styles.textReason]}
        >
          {title}
        </Text>
        <Text
          fontSize="s"
          style={dateStyle}
         
        >
          {createdAtText}
        </Text>
      </Box>
      <PriceItem
        type={type}
        testID={testID}
        cost={amount}
        currencyStyle={{ color }}
        priceStyle={{ ...styles.priceStyle, color }}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    paddingTop: spacing.m,
  },
  boxIteam: {
    flex: 1,
    padding: spacing.m,
  },

  priceStyle: {
    fontWeight: "bold",
    fontSize: fontSize.m,
  },
  textReason: {
    marginBottom: spacing.s,
  },
  labelStyle: {
    paddingBottom: spacing.s,
    marginTop: -spacing.m,
  },
});

export default ComponentItemTransaction;
