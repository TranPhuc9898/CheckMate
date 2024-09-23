/**
 * @author Huu Toan Nguyen
 * @email huutoan.nguyen@btaskee.com
 * @create date 2022-10-28 09:00
 * @modify date 2022-10-11 09:17
 * @desc custom select component
 */
import React, { useEffect, useState } from "react";
import { LocalizationContext } from "@src/libs/context";
import { StyleSheet } from "react-native";
import { formatDate } from "libs/helper";
import moment from "moment";
import { Text, Box, SelectDropdown } from "@src/components";
import { ISelect } from "@src/components/select-dropdown";

interface ISelectWeek extends ISelect {
  /**
   * function recieves selected rangeDate
   */
  onSelectWeek: (fromDate: any, toDate: any) => void;
}

const ComponentSelectWeek: React.FunctionComponent<ISelectWeek> = ({
  onSelectWeek,
  testID,
}) => {
  const I18n = React.useContext(LocalizationContext);
  const [weeks, setWeeks] = useState([]);

  /**
   * Trả về fromDate toDate của tuần đã chọn
   * @param item Tuần đã chọn
   * @param index
   */
  const onSelectItem = (item: any, index: number) => {
    const fromDate = moment().subtract(index, "week").startOf("isoWeek");
    const toDate = moment().subtract(index, "week").endOf("isoWeek");
    onSelectWeek && onSelectWeek(fromDate, toDate);
  };

  /**
   * Lấy danh sách tuần để filter, tối đa 6 tuần
   */
  const getArrayWeeks = () => {
    const arrWeek = [];
    for (let index = 1; index < 7; index++) {
      const startWeek = moment().subtract(index, "week").startOf("isoWeek");
      const endWeek = moment().subtract(index, "week").endOf("isoWeek");
      arrWeek.push(
        `${formatDate(startWeek, "date")} - ${formatDate(endWeek, "date")}`
      );
    }
    setWeeks(arrWeek);
  };

  useEffect(() => {
    getArrayWeeks();
  }, []);

  return (
    <Box
      row
      style={styles.container}
    >
      <Text>{I18n.t("TAB_ACCOUNT.WEEK")}:</Text>
      <SelectDropdown
        data={weeks}
        testID={testID}
        onSelect={(selectedItem, index) => {
          onSelectItem(selectedItem, index + 1);
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
    width: "80%",
    height: 40,
  },
});

export default ComponentSelectWeek;
