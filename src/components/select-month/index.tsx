/**
 * @author Huu Toan Nguyen
 * @email huutoan.nguyen@btaskee.com
 * @create date 2022-10-28 09:00
 * @modify date 2022-10-11 09:17
 * @desc custom select component
 */
import React, { useEffect, useState, ComponentProps } from "react";
import { LocalizationContext } from "@src/libs/context";
import { StyleSheet } from "react-native";
import { colors, fontSize } from "@src/libs/theme";
import { formatDate } from "libs/helper";
import moment from "moment";
import { Text, Box, SelectDropdown } from "@src/components";

interface ISelectMonth extends ComponentProps<typeof SelectDropdown> {
  /**
   * function recieves selected rangeDate and month
   */
  onSelectMonth: (rangeDate: any, month: string) => void;
}

const ComponentSelectMonth: React.FunctionComponent<ISelectMonth> = ({
  onSelectMonth,
  testID,
}) => {
  const I18n = React.useContext(LocalizationContext);
  const [months, setMonths] = useState([]);

  /**
   * Lấy danh sách tháng để filter, tối đa 6 tháng
   */
  const getArrayMonths = () => {
    const arrMonth = [];
    for (let index = 0; index < 6; index++) {
      arrMonth.push(formatDate(moment().subtract(index, "months"), "month"));
    }
    setMonths(arrMonth);
  };

  /**
   * Trả về fromDate, toDate và tên tháng đã chọn
   * @param item Tháng đã chọn
   * @param index
   */
  const onSelectItem = (item: any, index: number) => {
    const fromDate = moment().subtract(index, "month").startOf("month");
    const toDate = moment().subtract(index, "month").endOf("month");
    onSelectMonth && onSelectMonth({ fromDate, toDate }, item);
  };

  useEffect(() => {
    getArrayMonths();
  }, []);

  return (
    <Box
      row
      style={styles.container}
    >
      <Text>{I18n.t("TAB_ACCOUNT.MONTH")}:</Text>
      <SelectDropdown
        testID={testID}
        data={months}
        onSelect={(selectedItem, index) => {
          onSelectItem(selectedItem, index);
        }}
        buttonStyle={styles.buttonStyle}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  buttonStyle: {
    width: "50%",
    height: 40,
  },
});

export default ComponentSelectMonth;
