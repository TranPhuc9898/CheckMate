import React, { ComponentProps, FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";

import { Box, Card, Icon, Text } from "@src/components";
import { iconName } from "@src/components/icon";
import { LocalizationContext } from "@src/libs/context";

import styles from "./styles";

interface ICardItem extends ComponentProps<typeof Card> {
  /**
   * Title of card
   */
  title: string;

  /**
   * Icon name
   */
  iconName?: keyof typeof iconName;

  /**
   * Style of card
   */
  style?: object;

  /**
   * Style of header card
   */
  headerStyle?: object;

  /**
   * Funtion when click icon
   */
  onPress?: any;

  /**
   * testID of Card
   */
  testID?: string;

  /**
   * Style of header card
   */
  titleStyle?: object;
}

/**
 * title: Title of card
 * iconName: Icon name
 * style: Style of card
 * onClick: Funtion when click icon
 */
const CardItem: FunctionComponent<ICardItem> = ({
  title,
  style,
  headerStyle,
  iconName,
  onPress,
  testID,
  titleStyle,
  ...other
}) => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <Card style={style}>
      {/* Header */}
      <Box
        row
        style={[styles.boxContainer, headerStyle]}
      >
        <Text
          fontSize="xl"
          bold
          style={titleStyle || styles.textTitle}
        >
          {title}
        </Text>
        {iconName ? (
          <TouchableOpacity
            testID={testID}
            onPress={() => onPress && onPress()}
            style={styles.boxIcon}
          >
            <Icon
              name={iconName}
              size="xl"
            />
          </TouchableOpacity>
        ) : null}
      </Box>

      {/* Body */}
      {other?.children}
    </Card>
  );
};

export default CardItem;
