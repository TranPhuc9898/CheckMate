import React, {
  FunctionComponent,
  ComponentProps,
  useContext,
} from "react";
import { View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { CardItem, Box, Text, Icon, Rating } from "@src/components";
import styles from "./styles";
interface IGoodReview extends ComponentProps<typeof View> {
  goodRating: any;
}

const GoodReviewScreen: FunctionComponent<IGoodReview> = ({ goodRating }) => {
  const I18n = useContext(LocalizationContext);

  if (!goodRating || goodRating.length === 0) {
    return null;
  }

  return (
    <CardItem title={I18n.t("TAB_ACCOUNT.GOOD_REVIEW")}>
      <Box
        row
        style={styles.boxContainer}
      >
        <Box row>
        <Rating/>
        </Box>
        <Box row>
          {goodRating.map((review: string, index: number) => (
            <Text
              testID={`goodRating_${index}`}
              key={`goodRating_${index}`}
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

export default GoodReviewScreen;
