import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Icon,
  Rating,
  Text,
} from "components";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { store } from "redux/store";
import { LocalizationContext } from "libs/context";
import { ScrollView } from "react-native";
import _ from "lodash";
import { formatDate, getTextWithLocale, getUserIdGlobal } from "libs/helper";
import RenderContentRating from "../components/content-rating";
import styles from "./styles";
import { IRatingAsker } from "apis/rating/partner-rating";
import { cancelRating, ratingAsker, setIsRated } from "../slice";
import { ICancelRating } from "apis/rating/cancel-rating";

const RatingAskerScreen: FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  // Get data from route
  const { asker, task } = route.params;
  const [numberStar, setNumberStar] = useState(0);
  const [badges, setBadge] = useState([]);
  const [reviews, setReview] = useState("");
  // Locale
  const I18n = useContext(LocalizationContext);

  useEffect(() => {
    return () => {
      const params: ICancelRating = {
        taskId: task?._id,
        userId: getUserIdGlobal()
      }
      // Call func cancelRating when go back
      store.dispatch(cancelRating(params));
    };
  }, []);

  const _handleNumberStar = (star: number) => {
    setBadge([]);
    setNumberStar(star);
  };

  // Render content rating
  const checkNumberStarRating = useMemo(() => {
    // Handle render badge
    return (
      <Box
        center
        style={styles.paddingVerticalL}
      >
        <Text bold>{I18n.t("RATING.BUTTON_RATING")}</Text>
        <Box margin="m">
          <Rating
            rate={numberStar}
            size="xxl"
            colors="secondary"
            onChange={(star) => _handleNumberStar(star)}
          />
        </Box>
        {!numberStar ? <Text testID="txtNotRating">{I18n.t("RATING.NOT_RATING")}</Text> : null}
        <RenderContentRating
          numberStar={numberStar}
          badges={badges}
          setBadge={setBadge}
          reviews={reviews}
          setReview={setReview}
        />
      </Box>
    );
  }, [numberStar, badges, reviews]);

  // Tasker rating
  const _onRatingAsker = async () => {
    // Set isRated = true -> không gọi api cancel rating
    store.dispatch(setIsRated(true));
    const params: IRatingAsker = {
      rate: numberStar,
      taskId: task?._id,
      userId: getUserIdGlobal(),
    };
    if (reviews) {
      params.review = reviews;
    }
    if (badges) {
      params.feedback = badges;
    }
    // Call api cancel loading
    await store.dispatch(ratingAsker(params));
    return navigation.goBack();
  };

  const checkDisable = () => {
    if (_.isEmpty(badges) || Boolean(badges.includes("OTHER") && !reviews)) {
      return true;
    }
    return false;
  }

  return (
    <Container headerShow={true}>
      <Card flex>
        <ScrollView testID="scrollRating" showsVerticalScrollIndicator={false}>
          <Box
            center
            style={styles.paddingVerticalM}
          >
            <Text variant="h3" testID="titleRating">{I18n.t("RATING.TASK_SUCCESS")}</Text>
            <Text
              style={styles.txtDate}
              fontWeight="s"
            >
              {formatDate(task?.date, "other")}
            </Text>
            <Box row>
              <Box flex>
                <Icon
                  name="location"
                  color="secondary"
                  size="xl"
                />
              </Box>
              <Box
                style={{
                  flex: 9,
                }}
              >
                <Text>{task?.address}</Text>
              </Box>
            </Box>
          </Box>
          <Divider width={1} />
          <Box
            row
            alignCenter
            style={styles.paddingVerticalL}
          >
            <Avatar
              avatar={asker?.avatar}
              size={72}
            />
            <Box style={styles.paddingHorizontal}>
              <Text bold>{asker?.name}</Text>
              <Text>{getTextWithLocale(task?.serviceText)}</Text>
            </Box>
          </Box>
          <Divider width={1} />
          {checkNumberStarRating}
        </ScrollView>
        <Button
          testID="btnRating"
          disabled={checkDisable()}
          title={I18n.t("RATING.BUTTON_RATING")}
          onPress={_onRatingAsker}
        />
      </Card>
    </Container>
  );
};
export default RatingAskerScreen;
