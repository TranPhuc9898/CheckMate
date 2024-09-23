import * as React from "react";
import { ScrollView } from "react-native";
import { isEmpty } from "lodash";

import { Box, Divider, Icon, Image, MarkDown, Text } from "@src/components";
import { useI18n } from "hooks/translation";

import styles from "./styles";

const REGULATIONS = [
  {
    title: "TRAINING_PREMIUM.REGULATIONS_TASKER_PREMIUM_1",
  },
  {
    title: "TRAINING_PREMIUM.REGULATIONS_TASKER_PREMIUM_2",
    contents: [
      "TRAINING_PREMIUM.REGULATIONS_TASKER_PREMIUM_2_1",
      "TRAINING_PREMIUM.REGULATIONS_TASKER_PREMIUM_2_2",
      "TRAINING_PREMIUM.REGULATIONS_TASKER_PREMIUM_2_3",
      "TRAINING_PREMIUM.REGULATIONS_TASKER_PREMIUM_2_4",
    ],
  },
  {
    title: "TRAINING_PREMIUM.REGULATIONS_TASKER_PREMIUM_3",
    contents: ["TRAINING_PREMIUM.REGULATIONS_TASKER_PREMIUM_3_1", "TRAINING_PREMIUM.REGULATIONS_TASKER_PREMIUM_3_2"],
  },
  {
    title: "TRAINING_PREMIUM.REGULATIONS_TASKER_PREMIUM_4",
    contents: ["TRAINING_PREMIUM.REGULATIONS_TASKER_PREMIUM_4_1", "TRAINING_PREMIUM.REGULATIONS_TASKER_PREMIUM_4_2"],
  },
];

const RegulationPremium = () => {
  const { t } = useI18n();

  const _renderConditionsDetail = () =>
    REGULATIONS.map((item, index) => {
      const isLast = Boolean(index === REGULATIONS.length - 1);
      return (
        <Box
          testID={`regulation_${index}`}
          key={`regulation_${index}`}
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
              <MarkDown
                text={t(item?.title)}
                paragraphStyle={styles.paragraphMarkDown}
              />
              {!isEmpty(item?.contents) && (
                <Box>
                  {item?.contents?.map((content, index1) => (
                    <Text
                      key={`content_${index1}`}
                      style={styles.txtContent}
                    >
                      • {t(content)}
                    </Text>
                  ))}
                </Box>
              )}
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
              source={require("assets/images/premium/regulation-premium.png")}
              style={styles.imgStyle}
            />
          </Box>
          <Text
            center
            variant="h3"
            style={styles.txtTitle}
            testID="txtTitleRegulations"
          >
            {t("TRAINING_PREMIUM.REGULATIONS_TASKER_PREMIUM")}
          </Text>
          <Box>{_renderConditionsDetail()}</Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default RegulationPremium;
