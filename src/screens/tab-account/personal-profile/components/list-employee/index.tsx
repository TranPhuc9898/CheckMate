import React, { FunctionComponent, ComponentProps, useContext } from "react";
import { View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { CardItem, Box, Text } from "@src/components";
import styles from "./styles";

interface ISettings extends ComponentProps<typeof View> {
  navigation?: any;
  user?: any;
}

const ListEmployeeScreen: FunctionComponent<ISettings> = ({
  navigation,
  user,
}) => {
  const I18n = useContext(LocalizationContext);
  const { employeeIds } = user;
  if (!employeeIds || employeeIds.length === 0) {
    return null;
  }

  return (
    <CardItem
      testID="ListEmployee"
      iconName="right"
      title={I18n.t("TAB_ACCOUNT.LIST_OF_EMPLOYEE")}
      onPress={() => navigation.navigate("ListEmployee")}
      headerStyle={styles.headerStyle}
    ></CardItem>
  );
};

export default ListEmployeeScreen;
