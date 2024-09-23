import React, {
  FunctionComponent,
  ComponentProps,
  useEffect,
  useState,
  useContext,
} from "react";
import { View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { CardItem, Box, Text, Icon } from "@src/components";
import { getWeeklyReportAPI } from "apis/user";
import { getCurrency, IRespond } from "libs/helper";
import styles from "./styles";

const stars = [1, 2, 3, 4, 5];
interface IBadReview extends ComponentProps<typeof View> {
  badRating: any;
}

const BadReviewScreen: FunctionComponent<IBadReview> = ({ badRating }) => {
  const I18n = useContext(LocalizationContext);

  if (!badRating || badRating.length === 0) {
    return null;
  }

  return (
    <CardItem title={I18n.t("TAB_ACCOUNT.BAD_REVIEW")}>
      <Box
        row
        style={styles.boxContainer}
      >
        {/* <Box row>
          {stars.map(() => (
            <Icon
              style={styles.iconStar}
              name="starFill"
              size="m"
              color="primary"
            />
          ))}
        </Box> */}
        <Box row>
          {badRating.map((review: string, index: number) => (
            <Text
              key={`badRating_${index}`}
              testID={`badRating_${index}`}
              style={styles.textReview}
            >
              {index + 1}
              {". "}
              {review}
            </Text>
          ))}
        </Box>
      </Box>
    </CardItem>
  );
};

export default BadReviewScreen;
