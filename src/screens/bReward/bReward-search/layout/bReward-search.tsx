import { useContext } from "react";
import { Box, Card, Icon, Text } from "@src/components";
import { LocalizationContext } from "libs/context";
import { useSelector } from "react-redux";
import { RootState } from "redux/slice";
import styles from "./styles";
import _ from "lodash";
import { store } from "redux/store";
import { cleanSearchText } from "../../slice";
import { TouchableOpacity } from "react-native";
import { spacing } from "libs/theme";

const BRewardsearch = ({ onSearch }) => {
  const I18n = useContext(LocalizationContext);

  const { listSearchOfReward } = useSelector((state: RootState) => state.userReward);

  if (_.isEmpty(listSearchOfReward)) {
    return null;
  }

  return (
    <Card style={{ marginTop: spacing.xl }}>
      <Text bold testID="txtRecentSearches" style={styles.headerStyle}>{I18n.t("BREWARD.RECENT_SEARCHES")}</Text>
      <Box row>
        {listSearchOfReward.map((item: any, index: number) => (
          <Box
            row
            style={styles.itemSearch}
            key={index}
          >
            <TouchableOpacity
              onPress={() => onSearch(item)}
            >
              <Text numberOfLines={2}>{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={styles.hitSlop}
              style={styles.wrapIcon}
              onPress={() => store.dispatch(cleanSearchText(item))}
            >
              <Box style={styles.boxIcon}>
                <Icon
                  name={"cancel"}
                  color="grey0"
                  size="l"
                />
              </Box>
            </TouchableOpacity>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default BRewardsearch;
