import * as React from "react";
import { View, StyleSheet } from "react-native";
import { colors, spacing } from "libs/theme";

interface INavigationRegister {
  /**
   * Bước đang active
   */
  active: number;
}

const SIZE_DOT = 6;
const SIZE_ACTIVE = SIZE_DOT * 3;

const NavigationRegister = (props: INavigationRegister) => {
  // Số lượng bước đăng ký tài khoản
  const dots = [0, 1];
  return (
    <View style={styles.container}>
      {dots.map((e, index) => (
        <View
          key={index}
          style={[styles.dot, Boolean(props.active === e) && styles.dotActive]}
        />
      ))}
    </View>
  );
};

export default NavigationRegister;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: spacing.m,
  },
  dot: {
    width: SIZE_DOT,
    height: SIZE_DOT,
    borderRadius: SIZE_DOT / 2,
    backgroundColor: colors.grey2,
    marginHorizontal: spacing.s / 2,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: SIZE_ACTIVE,
  },
});
