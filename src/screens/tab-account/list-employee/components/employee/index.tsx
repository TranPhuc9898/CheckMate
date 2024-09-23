import { Avatar, Box, Card, Divider, Icon, Stamp, Text } from "@src/components";
import { getListEmployeesAPI } from "apis/user";
import { IRespond, getAvgRating, handleError } from "libs/helper";
import {
  FunctionComponent,
  useEffect,
  useState
} from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useI18n } from "hooks/translation";
import { USER_STATUS_LOCKED } from "libs/constants";

interface IEmployee {
  setLoading?: (isloading: boolean) => void;
  navigation?: any;
  user: {
    employeeIds: any;
  };
}

const EmployeeScreen: FunctionComponent<IEmployee> = ({
  setLoading,
  user,
  navigation,
}) => {
  const { t } = useI18n();
  const [listEmployee, setListEmployee] = useState([]);
  const { employeeIds } = user;
  const getListEmployees = async () => {
    setLoading(true);
    const respond: IRespond = await getListEmployeesAPI({ employeeIds });
    setLoading(false);

    if (respond.isSuccess) {
      setListEmployee(respond.data);
    } else {
      // Show lỗi và goBack khi onClosed Alert
      const onClosed = () => navigation.goBack();
      handleError(respond?.error, onClosed);
    }
  };

  useEffect(() => {
    getListEmployees();
  }, []);

  const _renderItem = ({item, index}) => {
    const isLocked = Boolean(item?.status === USER_STATUS_LOCKED);
    return (
      <TouchableOpacity
          // Trang Employee detail giống trang list employee nên tắt
          // onPress={() =>
          //   navigation.navigate("EmployeeDetail", { employee: employee })
          // }
          disabled={true}
          style={isLocked ? styles.boxItemLock : styles.boxItem}
          key={index}
        >
          <Box row>
            <Box>
              <Avatar
                size={50}
                avatar={item?.avatar}
              />
              <Box
                row
                style={styles.boxLeftBottom}
              >
                {item?.avgRating ? (
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
                ) : null}
              </Box>
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
          {isLocked && <Box>
            <Stamp
              title={t("TAB_BENEFIT.ACCOUNT_LOCK")}
              type="failed"
            />
          </Box>}
          <Box style={styles.boxIcon}>
            <Icon
              name="right"
              size="l"
              color="grey0"
            />
          </Box>
        </TouchableOpacity>
    )
  }

  return (
    <Card style={styles.boxContainer}>
      <FlatList
        data={listEmployee}
        renderItem={_renderItem}
        keyExtractor={(item, index) => `employee_${index}`}
        ItemSeparatorComponent={() => <Divider style={styles.dividerStyle} />}
      />
    </Card>
  );
};

export default EmployeeScreen;
