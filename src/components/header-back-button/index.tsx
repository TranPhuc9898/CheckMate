import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "@src/components";

interface IBackButton {
  navigation: any;
  color?: string;
}

const BackButton: React.FunctionComponent<IBackButton> = ({color, navigation}) => {
  return (
    <TouchableOpacity testID="btnBack" onPress={() => navigation?.goBack()}>
      <View style={[styles.wrapper, color ? {backgroundColor: color } : {}]}>
        <Icon
          name="back"
          size="xl"
        />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  badge: {
    position: "absolute",
    right: 2,
    top: 5,
  },
});
