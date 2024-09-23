import { Box, Text, Avatar } from "@src/components";
import _ from "lodash";
import { FC } from "react";
import styles from "../styles";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
export interface IAcceptedTasker {
  acceptedTasker?: Array<{
    taskerId?: string;
    companyId?: string;
    name?: string;
    avatar?: string;
  }>;
}

const AcceptedTaskerCompany: FC<IAcceptedTasker> = ({ acceptedTasker }) => {
  const { user } = useSelector((state: RootState) => state.app);

  // User không phải company thì không show thông tin chi tiết
  if (!user?.employeeIds) return null;

  // Task không có acceptedTasker thì không show thông tin chi tiết
  if (_.isEmpty(acceptedTasker)) return null;

  const employeeOfCompany = acceptedTasker.filter(
    (accepted) => accepted.companyId === user?._id
  );

  // Company không có trong acceptedTasker thì không show thông tin chi tiết
  if (_.isEmpty(employeeOfCompany)) return null;

  return (
    <Box>
      {employeeOfCompany.map((employee) => (
        <Box
          key={employee.taskerId}
          row
          style={styles.employeeContainer}
        >
          <Box>
            <Avatar
              size={50}
              avatar={employee?.avatar}
            />
          </Box>
          <Box style={styles.boxEmployeeName}>
            <Text
              testID={`employee_${employee.name}`}
              numberOfLines={2}
              bold
            >
              {employee?.name}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default AcceptedTaskerCompany;
