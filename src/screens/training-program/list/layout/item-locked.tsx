import * as React from "react";
import _ from "lodash";

import { LocalizationContext } from "@src/libs/context";
import { Box, Card, Text, Icon } from "@src/components";
import styles from "./styles";

interface ItemProps {
  quiz: any;
  lesson: number;
}

const ItemLocked = ({ quiz, lesson }: ItemProps) => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <Box>
      <Card>
        <Box row>
          <Box
            flex
            style={styles.leftContent}
          >
            <Box>
              <Text
                bold
                style={[styles.title, styles.txtLocked]}
              >
                {I18n.t("TRAINING_INPUT.LESSON", { t: lesson })}
              </Text>
              <Text style={[styles.description, styles.txtLocked]}>
                {quiz?.title}
              </Text>
            </Box>
            <Box
              row
              alignCenter
              style={styles.info}
            >
              <Icon
                name="clock"
                color="grey1"
              />
              <Text
                fontSize="m"
                style={[styles.txtTimeRead, styles.txtLocked]}
              >
                {I18n.t("TRAINING_INPUT.READING_TIME")}
                <Text
                  color="secondary"
                  bold
                  fontSize="m"
                  style={styles.txtLocked}
                >
                  {` ${quiz.readingTime} `}
                </Text>{" "}
                {I18n.t("TRAINING_INPUT.BY_MINUTUES")}
              </Text>
            </Box>
          </Box>
          <Box
            center
            style={styles.rightContentLocked}
          />
        </Box>
      </Card>
      <Box style={styles.lockContainer}>
        <Box
          center
          style={styles.rightContentLocked}
        >
          <Box
            center
            style={styles.wrapLock}
          >
            <Icon
              width={40}
              height={40}
              name="lock"
              color="grey0"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemLocked;
