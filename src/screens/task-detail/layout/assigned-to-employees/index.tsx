import getEmployeesByCompanyAPI, {
  IParamsGetEmployeesByCompany,
} from "apis/company/get-employees-by-company";
import {
  Avatar,
  Box,
  Button,
  Card,
  CheckBox,
  Container,
  Divider,
  Icon,
  Text,
} from "components";
import {
  getAvgRating,
  getUserIdGlobal,
  handleError,
  IRespond,
} from "libs/helper";
import { FC, useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { setLoading } from "redux/slice/app-slice";
import { store } from "redux/store";
import styles from "./styles";
import { LocalizationContext } from "libs/context";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";

interface IAssignedToEmployeesScreen {
  navigation?: any;
  route: any;
}

const AssignedToEmployeesScreen: FC<IAssignedToEmployeesScreen> = ({
  navigation,
  route,
}) => {
  const { onAcceptTask } = route?.params;
  const { user } = useSelector((state: RootState) => state.app);
  const [employees, setEmployees] = useState([]);
  const [employeePicked, setEmployeePicked] = useState("");

  const I18n = useContext(LocalizationContext);

  const _initDataEmployees = async () => {
    const params: IParamsGetEmployeesByCompany = {
      companyId: getUserIdGlobal(),
      employeeIds: user?.employeeIds
    };
    // Hide loading
    await store.dispatch(setLoading(false));
    // Call api get task detail
    const result: IRespond = await getEmployeesByCompanyAPI(params);
    // Hide loading
    await store.dispatch(setLoading(false));
    if (result?.isSuccess) {
      // Save data to state
      return setEmployees(result?.data);
    }
    return handleError(result?.error);
  };

  useEffect(() => {
    // Init data employees
    _initDataEmployees();
  }, []);

  // Handle picker
  const _handlePicked = (employeeId: string) => {
    setEmployeePicked(employeeId);
  };

  // Render employee
  const _renderItem = ({ item, index }) => (
    <Box
      testID={"employee" + index}
      key={"employee" + index}
      alignCenter
      row
      style={styles.containerLine}
    >
      {/* Show Employee info */}
      <Box
        row
        alignCenter
      >
        <Box>
          <Avatar
            size={50}
            avatar={item?.avatar}
          />

          {item?.avgRating ? (
            <Box
              row
              style={styles.boxLeftBottom}
            >
              <Box
                row
                style={styles.boxRating}
              >
                <Icon
                  name="starFill"
                  size="m"
                  color="secondary"
                />
                <Text
                  fontSize="m"
                  style={styles.textRating}
                >
                  {getAvgRating(item?.avgRating)}
                </Text>
              </Box>
            </Box>
          ) : null}
        </Box>

        <Box style={styles.boxBottom}>
          <Text
            numberOfLines={2}
            bold
          >
            {item?.name}
          </Text>
          <Text style={styles.textPhone}>{item?.phone}</Text>
        </Box>
      </Box>
      {/* Check box */}
      <CheckBox
        testID={"checkBox" + index}
        checked={Boolean(employeePicked === item._id)}
        onPress={() => _handlePicked(item?._id)}
      />
    </Box>
  );

  return (
    <Container headerShow={true}>
      <Card flex>
        <Box flex>
          <FlatList
            data={employees}
            renderItem={_renderItem}
            ItemSeparatorComponent={Divider}
          />
        </Box>
        <Button
          testID="btnChooseEmployee"
          title={I18n.t("TASK_DETAIL.BUTTON_CONFIRM")}
          onPress={() => onAcceptTask(employeePicked)}
          disabled={!Boolean(employeePicked)}
        />
      </Card>
    </Container>
  );
};

export default AssignedToEmployeesScreen;
