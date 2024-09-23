import { View, StyleSheet } from "react-native";

import { Button } from "@src/components";
import { colors, fontSize, spacing } from "@src/libs/theme";

interface IActions {
  text: string;
  onPress?: () => void;
  style?: "ok" | "cancel";
  testID?: string
}

const ActionAlert: React.FunctionComponent<{ actions: IActions[] }> = ({
  actions,
}) => {
  if (!actions) {
    return null;
  }
  return (
    <View style={styles.container}>
      {actions.map((e, index) => (
        <Button
          testID={e?.testID}
          key={index}
          containerStyle={styles.button}
          title={e.text}
          onPress={() => e.onPress()}
          buttonStyle={styles[e.style]}
          titleStyle={e.style === "cancel" ? styles.textCancel : styles.textOk}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: spacing.l,
  },
  container: {
    paddingVertical: spacing.m,
  },
  defaultStyle: {
    fontSize: fontSize.xl,
    color: colors.white,
  },
  ok: {
    backgroundColor: colors.secondary
  },
  cancel: {
    backgroundColor: colors.white,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  textCancel: {
    color: colors.secondary
  },
  textOk: {
    color: colors.white
  }
});

export default ActionAlert;
