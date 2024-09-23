import { FC } from "react";
import styles from "../layout/styles";
import { formatDate, navigateTo, getTextWithLocale } from "libs/helper";
import { Box, Button, Text, Icon } from "@src/components";
interface IItemTaskWaiting {
  item: any;
}

const ItemTaskWaiting: FC<IItemTaskWaiting> = ({ item }) => {
  const { district, date, description, _id } = item;

  const handleGoToTaskDetail = () => {
    navigateTo("TaskDetail", { taskId: _id });
  };

  return (
    <Box
      row
      between
      alignCenter
      testID={"taskWaiting" + description}
      style={styles.itemTaskWaitingContainer}
    >
      {/* Date */}
      <Text
        bold
        fontSize="m"
        color="white"
      >
        {formatDate(date)}
      </Text>
      {/* End date */}

      {/* District */}
      <Text
        bold
        color="white"
      >
        {getTextWithLocale(district)}
      </Text>
      {/* End district */}

      {/* Button see detail */}
      <Button
        testID={`btnSeeDetailTaskWaiting_${description}`}
        size="md"
        buttonStyle={styles.btnToTaskDetail}
        onPress={handleGoToTaskDetail}
      >
        <Icon
          name="right"
          size="l"
        />
      </Button>
      {/* End button see detail */}
    </Box>
  );
};

export default ItemTaskWaiting;
