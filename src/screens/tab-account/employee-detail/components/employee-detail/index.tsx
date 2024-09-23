import { FunctionComponent, ComponentProps, useContext } from "react";
import _ from "lodash";
import { View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Card, Box, Text, Rating, Icon, Avatar } from "@src/components";
import { getAvgRating } from "libs/helper";
import styles from "./styles";

interface IEmployee extends ComponentProps<typeof View> {
  route?: any;
}

const EmployeeScreen: FunctionComponent<IEmployee> = ({ route }) => {
  const I18n = useContext(LocalizationContext);
  const employee = _.get(route, "params.employee", {});

  const RenderReview = () => {
    if (!employee?.rating) return null;
    return (
      <Box>
        <Text
          bold
          fontSize="xl"
          color="primary"
          style={styles.textReview}
        >
          {I18n.t("TAB_ACCOUNT.REVIEW")}
        </Text>
        {(employee?.rating || []).map((rating: any, index: number) => (
          <Box
            key={index}
            style={styles.boxReview}
          >
            <Rating rate={rating.rate} />
            <Text style={styles.textRatingReview}>{rating?.review}</Text>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Card style={styles.boxContainer}>
      <Box
        row
        style={styles.boxItem}
      >
        <Box
          row
          style={{ alignItems: "center" }}
        >
          <Box>
            <Avatar
              size={50}
              avatar={employee?.avatar}
            />
            <Box
              row
              style={styles.boxLeftBottom}
            >
              {employee?.avgRating ? (
                <Box
                  row
                  style={styles.boxRating}
                >
                  <Icon
                    name="starFill"
                    size="m"
                    color="secondary"
                  />
                  <Text
                    fontSize="m"
                    style={styles.textRating}
                  >
                    {getAvgRating(employee?.avgRating)}
                  </Text>
                </Box>
              ) : null}
            </Box>
          </Box>
          <Box style={styles.boxBottom}>
            <Text
              numberOfLines={2}
              bold
            >
              {employee?.name}
            </Text>
            <Text style={styles.textPhone}>{employee?.phone}</Text>
          </Box>
        </Box>

        <Box style={styles.boxIcon}>
          <Icon
            name="right"
            size="l"
            color="grey0"
          />
        </Box>
      </Box>
      <RenderReview />
    </Card>
  );
};

export default EmployeeScreen;
