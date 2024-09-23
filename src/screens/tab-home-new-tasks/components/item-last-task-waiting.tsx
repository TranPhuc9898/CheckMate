import { Box, Button, Icon, Text } from "@src/components";
import styles from "../layout/styles";
import { FC } from "react";
import Lottie from "components/lottie";
import { formatDate, getTextWithLocale } from "libs/helper";
import { TouchableNativeFeedback } from "react-native";
import { useAnimation } from "hooks/animation";

interface IItemLastTaskDetail {
  item?: any;
  setIsShowFullTaskWaiting: (value: boolean) => void;
  totalTaskWaiting?: number;
}

const ItemLastTaskDetail: FC<IItemLastTaskDetail> = ({
  item,
  setIsShowFullTaskWaiting,
  totalTaskWaiting,
}) => {
  const { date, district } = item;

  return (
    <TouchableNativeFeedback
      onPress={() => {
        setIsShowFullTaskWaiting(true);
        useAnimation("easeInEaseOut");
      }}
    >
      <Box
        row
        between
        alignCenter
        style={styles.lastTaskContainer}
      >
        <Box
          row
          alignCenter
        >
          <Lottie
            style={styles.lottieWaiting}
            source={require("assets/lottie/hourglass.json")}
            autoPlay={true}
            loop={true}
          />
          <Box
            center
            style={styles.totalWaitingTask}
          >
            <Text
              bold
              color="secondary"
              numberOfLines={1}
            >
              {totalTaskWaiting}
            </Text>
          </Box>
        </Box>
        <Text
          bold
          // fontSize="m"
          color="white"
          style={styles.txtTaskDate}
        >
          {formatDate(date, "date")}
        </Text>
        <Text
          fontSize="l"
          bold
          color="white"
        >
          {getTextWithLocale(district)}
        </Text>
        <Button
          testID="btnShowAllTaskWaiting"
          buttonStyle={styles.btnScrollDown}
          onPress={() => {
            setIsShowFullTaskWaiting(true);
            useAnimation("easeInEaseOut");
          }}
        >
          <Icon name="down" />
        </Button>
      </Box>
    </TouchableNativeFeedback>
  );
};

export default ItemLastTaskDetail;
