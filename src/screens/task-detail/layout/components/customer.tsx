import { Box, Text } from "@src/components";
import { statusTask } from "libs/config";
import { spacing } from "libs/theme";
import { FC } from "react";
interface ICustomerDetail {
  contactName: string;
  status?: string
}

const CustomerDetail: FC<ICustomerDetail> = ({ contactName, status }) => {
  if (status !== statusTask.confirmed) {
    return null;
  }
  return (
    <Box
      row
      alignCenter
      style={{paddingBottom:spacing.m}}
    >
      <Text
        bold
        testID="contactName"
        color="primary"
        variant="h3"
      >
        {contactName}
      </Text>
    </Box>
  );
};

export default CustomerDetail;
