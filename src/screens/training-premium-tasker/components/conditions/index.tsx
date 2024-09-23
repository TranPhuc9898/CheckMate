import * as React from "react";
import { ScrollView } from "react-native";

import { Alert, Box, Button, Divider, Icon, Image, Text } from "@src/components";
import { useI18n } from "hooks/translation";

import styles from "./styles";

interface InstructionTrainingPremiumProps {
  dataQuiz?: any;
  onStart?: () => void;
}

const CONDITIONS = [
  "TRAINING_PREMIUM.CONDITION_TASKER_PREMIUM_DESCRIPTION_1",
  "TRAINING_PREMIUM.CONDITION_TASKER_PREMIUM_DESCRIPTION_2",
  "TRAINING_PREMIUM.CONDITION_TASKER_PREMIUM_DESCRIPTION_3",
  "TRAINING_PREMIUM.CONDITION_TASKER_PREMIUM_DESCRIPTION_4",
  "TRAINING_PREMIUM.CONDITION_TASKER_PREMIUM_DESCRIPTION_5",
  "TRAINING_PREMIUM.CONDITION_TASKER_PREMIUM_DESCRIPTION_6",
];

const ConditionUpgradePremium = (props: InstructionTrainingPremiumProps) => {
  const { t } = useI18n();

  const _onStart = () => {
    Alert.alert.open({
      message: "TRAINING_INPUT.ACCEPT_TEST_CONFIRMATION",
      actions: [
        {
          testID: "btnConfirmStartTraining",
          text: "DIALOG.BUTTON_ACCEPT",
          style: "ok",
          onPress: () => {
            Alert.alert.close();
            props.onStart();
          },
        },
        {
          text: "DIALOG.BUTTON_CLOSE",
          style: "cancel",
        },
      ],
    });
  };

  const _renderConditionsDetail = () =>
    CONDITIONS.map((item, index) => {
      const isLast = Boolean(index === CONDITIONS.length - 1);
      return (
        <Box
          key={`condition_${index}`}
          testID={`condition_${index}`}
        >
          <Box
            row
            style={styles.wrapLine}
          >
            <Icon
              name="star"
              color="primary"
            />
            <Box
              flex
              style={styles.wrapContent}
            >
              <Text>{t(item)}</Text>
            </Box>
          </Box>
          {!isLast && <Divider />}
        </Box>
      );
    });

  return (
    <Box
      flex
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flex>
          <Box center>
            <Image
              source={require("assets/images/premium/condition-premium.png")}
              style={styles.imgStyle}
            />
          </Box>
          <Text
            center
            variant="h3"
            style={styles.txtTitle}
            testID="txtTitleCondition"
          >
            {t("TRAINING_PREMIUM.CONDITION_TASKER_PREMIUM_TITLE")}
          </Text>
          <Box>{_renderConditionsDetail()}</Box>
        </Box>
      </ScrollView>
      {/* Nếu không lấy được bài kiểm tra thì không hiện nút bắt đầu làm bài */}
      <Box>
        <Button
          testID={props?.dataQuiz ? "btnStartTraining" : "btnStartTrainingDisabled"}
          onPress={() => _onStart()}
          title={t("TRAINING_INPUT.START")}
          disabled={!props?.dataQuiz}
        />
      </Box>
    </Box>
  );
};

export default ConditionUpgradePremium;
