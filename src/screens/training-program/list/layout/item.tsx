import * as React from "react";
import { TouchableOpacity } from "react-native";
import _ from "lodash";
import {
  TRAINING_PROGRAM_PERMISSON_LOCK,
  TRAINING_PROGRAM_STATUS_PASS,
  TRAINING_PROGRAM_STATUS_FAILED,
} from "libs/constants";

import { LocalizationContext } from "@src/libs/context";
import { Box, Card, Text, Icon, Stamp } from "@src/components";
import ItemLocked from "./item-locked";
import Step from "./step";

import styles from "./styles";
const SIZE_ICON = 50;

interface ItemProps {
  navigation: any;
  /**
   * Mở khóa hay chưa
   */
  // isLocked?: Boolean;
  quiz: any;
  /**
   * Bài mấy
   */
  lesson: number;
}

const Item = ({ navigation, quiz, lesson }: ItemProps) => {
  const I18n = React.useContext(LocalizationContext);
  // Chưa có quyền làm
  if (quiz?.permission === TRAINING_PROGRAM_PERMISSON_LOCK) {
    return (
      <ItemLocked
        quiz={quiz}
        lesson={lesson}
      />
    );
  }

  const renderStatus = () => {
    // Đậu bài test
    if (quiz?.status === TRAINING_PROGRAM_STATUS_PASS) {
      return (
        <Stamp
          title={I18n.t("TRAINING_INPUT.PASS")}
        />
      );
    }
    // Rớt bài test
    if (quiz?.status === TRAINING_PROGRAM_STATUS_FAILED) {
      return (
        <Stamp
          title={I18n.t("TRAINING_INPUT.FAILED")}
          type="failed"
        />
      );
    }
    // Đang làm bài test hoặc chưa làm
    return (
      <Step
        currentStep={quiz?.step?.current}
        totalStep={quiz?.step?.total}
      />
    );
  };

  return (
    <TouchableOpacity
      testID={"trainingItem_" + lesson}
      onPress={() =>
        navigation.navigate("TrainingProgramDetail", {
          trainingProgramId: quiz._id,
        })
      }
    >
      <Card>
        <Box row>
          <Box
            flex
            style={styles.leftContent}
          >
            <Box>
              <Text
                bold
                style={styles.title}
              >
                {I18n.t("TRAINING_INPUT.LESSON", { t: lesson })}
              </Text>
              <Text style={styles.description}>{quiz?.title}</Text>
            </Box>
            <Box
              row
              alignCenter
              style={styles.info}
            >
              <Icon
                name="clock"
                color="black"
              />
              <Text
                fontSize="m"
                style={styles.txtTimeRead}
              >
                {I18n.t("TRAINING_INPUT.READING_TIME")}
                <Text
                  color="secondary"
                  bold
                  fontSize="m"
                >
                  {` ${quiz.readingTime} `}
                </Text>
                {I18n.t("TRAINING_INPUT.BY_MINUTUES")}
              </Text>
            </Box>
          </Box>
          <Box
            center
          >
            {renderStatus()}
          </Box>
        </Box>
      </Card>
    </TouchableOpacity>
  );
};

export default Item;
