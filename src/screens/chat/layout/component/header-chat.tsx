import React from "react";
// Types
// Component
import { Box, Card, Text } from "components";
// Styles
import { spacing } from "libs/theme";
import styles from "../styles";
import { formatDate } from "libs/helper";
import { Duration } from "components/task-item/components";
import moment from "moment";
interface IHeaderChat {
  item?: any;
  nameAsker?: any;
  taskPlace?: any;
  date?: any;
}
const HeaderChat: React.FC<IHeaderChat> = ({
  item,
  nameAsker,
  taskPlace,
  date,
}) => {
  let startTime = formatDate(item?.date, "time");

  let endTime = formatDate(
    moment(item?.date).add(item?.duration, "hours"),
    "time"
  );

  return (
    <Card>
      {/* Header */}
      <Box>
        <Text
          color="primary"
          bold
        >
          {nameAsker}
        </Text>
        <Box style={{ paddingTop: spacing.s }}>
          <Text
            color="black"
            bold
          >
            {taskPlace}
          </Text>
        </Box>

        {/* Content */}
        <Box
          row
          between
          style={styles.boxFooter}
        >
          <Box
            row
            center
          >
            <Text
              bold
              fontSize="xl"
            >
              {startTime} - {endTime}
            </Text>
          </Box>
          <Text variant="h3">{formatDate(item?.date, "date")}</Text>
        </Box>
      </Box>
    </Card>
  );
};

export default HeaderChat;
