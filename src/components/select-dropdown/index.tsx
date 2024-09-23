/**
 * @author Huu Toan Nguyen
 * @email huutoan.nguyen@btaskee.com
 * @create date 2022-10-28 09:00
 * @modify date 2022-10-11 09:17
 * @desc custom select component
 */
import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "@src/libs/theme";
import SelectDropdown from "react-native-select-dropdown";
import { Icon } from "@src/components";

export interface ISelect {
  /**
   * Được thực thi khi select item
   */

  onSelect?: (item?: any, index?: number) => void;

  /**
   * Mảng data để render select
   */
  data?: any;

  /**
   * Default button text
   */
  defaultButtonText?: any;

  /**
   * Button style
   */
  buttonStyle?: any;

  /**
   * Row Text For Selection
   */
  rowTextForSelection?: any;

  /**
   * Test Id For Selection
   */
  testID?: string;
}

const ComponentSelect: React.FunctionComponent<ISelect> = ({
  onSelect,
  data,
  defaultButtonText,
  buttonStyle = {},
  rowTextForSelection,
  testID,
}) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      defaultButtonText={defaultButtonText || data[0]}
      buttonTextAfterSelection={rowTextForSelection}
      rowTextForSelection={rowTextForSelection}
      buttonStyle={{ ...styles.dropdown1BtnStyle, ...buttonStyle }}
      buttonTextStyle={styles.dropdown1BtnTxtStyle}
      renderDropdownIcon={(isOpened) => {
        return (
          <Icon
            testID={testID}
            name={isOpened ? "up" : "down"}
            color="grey1"
            size="xl"
          />
        );
      }}
      dropdownIconPosition={"right"}
      dropdownStyle={styles.dropdown1DropdownStyle}
      rowStyle={styles.dropdown1RowStyle}
      rowTextStyle={styles.dropdown1RowTxtStyle}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  dropdown1BtnStyle: {
    width: "80%",
    height: 40,
    backgroundColor: colors.background,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.grey1,
  },
  dropdown1BtnTxtStyle: { color: colors.grey0, textAlign: "left", textTransform: "capitalize" },
  dropdown1DropdownStyle: { backgroundColor: colors.background },
  dropdown1RowStyle: {
    backgroundColor: colors.background,
    borderBottomColor: colors.grey2,
  },
  dropdown1RowTxtStyle: { color: colors.grey0, textAlign: "left", textTransform: "capitalize" },
});

export default ComponentSelect;
