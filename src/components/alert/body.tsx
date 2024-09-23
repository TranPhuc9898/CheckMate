import React from "react";
import { View, StyleSheet } from "react-native";
import _ from "lodash";

import { Text } from "@src/components";
import { colors, fontSize, spacing } from "@src/libs/theme";
interface IBody {
  content: any;
}

const BodyAlert: React.FunctionComponent<IBody> = ({ content }) => {
  // Mảng các text
  if (_.isArray(content)) {
    return (
      <View style={styles.container}>
        {content.map((e, index) => (
          <Text
            key={index}
            style={styles.defaultStyle}
          >
            {e}
          </Text>
        ))}
      </View>
    );
  }
  // Node
  if (React.isValidElement(content)) {
    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  }
  // Text thường
  return (
    <View style={styles.container}>
      <Text testID="alertContent" style={styles.defaultStyle}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xl,
    minHeight: 100,
  },
  defaultStyle: {
    fontSize: fontSize.l,
    color: colors.black,
  },
});

export default BodyAlert;
