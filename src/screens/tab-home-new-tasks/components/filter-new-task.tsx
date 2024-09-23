import { Box, CheckBox, Divider, Icon, Text } from "components";
import { FILTER_NY_CREATED_AT } from "libs/constants";
import { LocalizationContext } from "libs/context";
import { FC, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { store } from "redux/store";
import styles from "../layout/styles";
import { setFilter, setFilterWithArea } from "../slice";

const FilterComponent: FC<{ handleFilter: () => void }> = ({
  handleFilter,
}) => {
  const I18n = useContext(LocalizationContext);
  const { filterBy, isTaskerWorkingPlaces } = store.getState()?.newTasks;

  return (
    <Box>
      <TouchableOpacity
        testID="btnFilterCreateAt"
        style={styles.row}
        onPress={() => {
          store.dispatch(setFilter(FILTER_NY_CREATED_AT));
          handleFilter();
        }}
      >
        <Text style={{ width: "87%" }}>
          {I18n.t("FILTER_NEW_TASK.BY_CREATED_AT")}
        </Text>
        {filterBy === FILTER_NY_CREATED_AT ? (
          <Icon
            name="checked"
            color="primary"
          />
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity
        testID="btnFilterDate"
        style={styles.row}
        onPress={() => {
          store.dispatch(setFilter(""));
          handleFilter();
        }}
      >
        <Text
          style={{
            width: "87%",
          }}
        >
          {I18n.t("FILTER_NEW_TASK.BY_DATE")}
        </Text>
        {filterBy !== FILTER_NY_CREATED_AT ? (
          <Icon
            name="checked"
            color="primary"
          />
        ) : null}
      </TouchableOpacity>
      <Divider />
      <Box
        row
        alignCenter
        between
        style={styles.paddingTop}
      >
        <Text
          style={{
            width: "80%",
          }}
        >
          {I18n.t("FILTER_NEW_TASK.BY_AREA")}
        </Text>
        <CheckBox
          checked={isTaskerWorkingPlaces}
          onPress={() => {
            store.dispatch(setFilterWithArea(!isTaskerWorkingPlaces));
            handleFilter();
          }}
        />
      </Box>
    </Box>
  );
};
export default FilterComponent;
