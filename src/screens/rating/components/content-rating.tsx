import { Box, Divider, Text, TextInput } from "components";
import { optionPartnerRating } from "libs/config";
import { LocalizationContext } from "libs/context";
import { FC, useContext, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import _ from "lodash";
import styles from "./styles";

interface IRenderContentRating {
  numberStar: number;
  badges: any[];
  setBadge: (badge: any) => void;
  reviews: string;
  setReview: (review: string) => void;
}

const RenderContentRating: FC<IRenderContentRating> = ({
  numberStar,
  badges,
  setBadge,
  reviews,
  setReview,
}) => {
  const I18n = useContext(LocalizationContext);
  // Get content rating by number star
  const contentRating = optionPartnerRating[numberStar - 1];
  const reviewRef = useRef(null);

  useEffect(() => {
    if (badges.includes("OTHER")) {
      reviewRef?.current?.focus();
    }
  }, [badges])

  // Handle choose badges
  const handleReview = (item) => {
    const newBadge = [...badges];
    // Check item has exist
    const serviceIndex = _.findIndex(
      badges,
      (element: string) => element === item
    );
    // If choose OTHER
    if (serviceIndex !== -1 && item === "OTHER") {
      return setBadge([]);
    }
    if (serviceIndex === -1 && item === "OTHER") {
      return setBadge([item]);
    }
    // if item is exist, replace item
    if (serviceIndex !== -1) {
      newBadge.splice(serviceIndex, 1);
      return setBadge(newBadge);
    } else {
      // Data not exist, push new item to array and remove OTHER
      let badgeCleanOther = newBadge.filter(item => item !== "OTHER")
      badgeCleanOther.push(item);
      return setBadge(badgeCleanOther);
    }
  };

  // Render item badge
  const _renderItemBadge = (item, index) => {
    const isPicked = _.includes(badges, item?.value);
    return (
      <Box
        key={"label" + index}
        testID={"label" + index}
        style={{
          width: "50%",
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => handleReview(item?.value)}
          style={[styles.containerBadge, isPicked ? styles.btnActive : null]}
        >
          <Text
            style={[styles.txtBadge, isPicked ? styles.txtBadgeActive : null]}
          >
            {I18n.t(item?.text)}
          </Text>
        </TouchableOpacity>
      </Box>
    );
  };

  if (!numberStar) {
    return null;
  }
  return (
    <Box>
      <Text center>{I18n.t(contentRating?.label)}</Text>
      <Box style={styles.paddingVerticalM}>
        <Divider width={1} />
      </Box>
      <Box>
        <Text
          bold
          center
          style={styles.txtReviewLabel}
        >
          {I18n.t("RATING.YOUR_REVIEW")}
        </Text>
        <TextInput
          testID="textInputReview"
          forwardedRef={reviewRef}
          color="grey0"
          onChangeText={setReview}
          inputStyle={styles.textInput}
          inputContainerStyle={styles.containerTextInput}
          multiline={true}
          maxLength={140}
        />
        {reviews.length ? (
          <Text
            fontSize="m"
            color="grey1"
            style={styles.txtLengthOfText}
          >
            {I18n.t("RATING.LENGTH_OF_TEXT", { t: reviews.length })}
          </Text>
        ) : null}
      </Box>
      <Divider width={1} />
      <Box
        center
        style={styles.containerStar}
      >
        <Text bold>{I18n.t(contentRating?.title)}</Text>
        <Box
          row
          style={styles.containerOptionBadge}
        >
          {contentRating?.option?.map((item, index) =>
            _renderItemBadge(item, index)
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default RenderContentRating;
