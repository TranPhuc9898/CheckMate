import { Box, Text } from "@src/components";
import { getTextWithLocale, IObjectText } from "libs/helper";
import { FC } from "react";
import styles from "../styles";
import AcceptedTaskerCompany from "../accepted-tasker-company";
export interface IHeaderDetail {
  serviceText: IObjectText;
  district: IObjectText;
  acceptedTasker?: Array<{
    taskerId?: string;
    companyId?: string;
    name?: string;
    avatar?: string;
  }>;
}
const HeaderDetail: FC<IHeaderDetail> = ({
  serviceText,
  district,
  acceptedTasker,
}) => {
  let serviceName = getTextWithLocale(serviceText);
  let districtText = getTextWithLocale(district);

  return (
    <Box style={styles.containerHeader}>
      <AcceptedTaskerCompany acceptedTasker={acceptedTasker} />
      <Box
        flex
        style={styles.rowStyle}
      >
        <Box
          flex
          row
          between
        >
          <Box style={styles.boxServiceName}>
            <Text
              color="primary"
              numberOfLines={1}
              style={styles.serviceTextStyle}
            >
              {serviceName}
            </Text>
          </Box>
          <Box center>
            <Text
              numberOfLines={1}
              bold
              fontSize="xl"
            >
              {districtText}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderDetail;
