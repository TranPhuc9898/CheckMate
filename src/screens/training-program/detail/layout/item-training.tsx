import * as React from "react";
import { TouchableOpacity } from "react-native";
import _ from "lodash";

import { LocalizationContext } from "@src/libs/context";
import { Box, Card, Text, Image } from "@src/components";
import { TRAINING_PROGRAM_PERMISSON_OPEN } from "libs/constants";
import styles from "./styles";

interface ItemProps {
  navigation: any;
  data: any;
  callback: (e: any, isLoading: Boolean) => void;
}

/**
 * data: dữ liệu của bài training
 * callback: dùng để reload lại data sau khi xem hết video
 */
const Item = ({ navigation, data, callback }: ItemProps) => {
  const I18n = React.useContext(LocalizationContext);

  // Tự chuyển qua bài test
  const autoGoToTesting = (dataQuiz: any) => {
    navigation.goBack();
    if (dataQuiz?.quizPermission === TRAINING_PROGRAM_PERMISSON_OPEN) {
      navigation.navigate("TrainingProgramQuiz", {
        data: dataQuiz,
        callback: callback,
      });
    }
  };

  // Callback khi nộp bài video thành công
  const _callback = async () => {
    if (!callback) {
      return;
    }
    // Chờ gọi API get detail xong
    callback((dataQuiz) => {
      // Tự chuyển qua bài test
      autoGoToTesting(dataQuiz);
    }, false);
  };

  return (
    <TouchableOpacity
      testID="btnTrainingProgramVideo"
      onPress={() =>
        navigation.navigate("TrainingProgramVideo", {
          data: data,
          callback: _callback,
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
                fontSize="xl"
                bold
              >
                {I18n.t("TRAINING_INPUT.TRAINING")}
              </Text>
              <Text style={styles.txtDescription}>
                {I18n.t("TRAINING_INPUT.TRAINING_DESCRIPTION")}
              </Text>
            </Box>
            <Box style={styles.info}>
              <Text style={styles.txtReadingTime}>
                {I18n.t("TRAINING_INPUT.READING_TIME")}{" "}
                <Text color="secondary">{data?.readingTime}</Text>
                {` ${I18n.t("TRAINING_INPUT.BY_MINUTUES")}`}
              </Text>
            </Box>
          </Box>
          <Box
            center
          >
            <Image
              style={styles.image}
              source={require("@src/assets/images/training/training.png")}
            />
          </Box>
        </Box>
      </Card>
    </TouchableOpacity>
  );
};

export default Item;
