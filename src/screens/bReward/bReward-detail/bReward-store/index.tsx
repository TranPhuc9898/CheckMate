import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Card, Box, Text, Icon } from "components";
import { getTextWithLocale, navigateTo } from "libs/helper";
import { useNavigation } from "@react-navigation/native";
import { LocalizationContext } from "libs/context";
import _ from "lodash";
import styles from "./styles";

interface IRenderStoreReward {
  dataStore?: any;
}
const RenderStoreReward: React.FC<IRenderStoreReward> = ({ dataStore }) => {
  // Hook
  const navigation = useNavigation();
  const I18n = React.useContext(LocalizationContext);
  if (_.isEmpty(dataStore)) {
    return null;
  }
  return (
    <Card>
      <Box>
        <Text bold>{I18n.t("BREWARD.STORE")}</Text>
      </Box>

      <Box>
        {dataStore?.map((item, index) => {
          return (
            <Box key={index}>
              {index === 0 ? (
                <Box
                  row
                  style={styles.boxContainer}
                >
                  <Box
                    style={styles.boxIcon}
                    // center
                  >
                    <Icon
                      name="location_social"
                      size="m"
                      color="primary"
                    />
                  </Box>
                  <Box flex>
                    {/* Office name */}
                    {item?.name &&
                    item?.name !== getTextWithLocale(item?.text) ? (
                      <Text
                        bold
                        numberOfLines={1}
                        style={styles.txtOfficeName}
                      >
                        {item?.name}
                      </Text>
                    ) : null}
                    {/* Office address */}
                    <Text
                      numberOfLines={1}
                      color="grey0"
                    >
                      {getTextWithLocale(item?.text)}
                    </Text>
                  </Box>
                </Box>
              ) : null}
            </Box>
          );
        })}
      </Box>

      <Box style={styles.numberOfOffice}>
        <TouchableOpacity
          testID="btnDataStore"
          onPress={() => {
            navigateTo("RewardStore", dataStore);
          }}
        >
          <Box
            row
            style={styles.boxStore}
          >
            <Box
              center
              style={styles.boxBranch}
            >
              <Text
                color="primary"
                fontSize="m"
              >
                {I18n.t("BREWARD.BRANCH_STORE", { t: dataStore?.length })}
              </Text>
            </Box>
            <Box center>
              <Icon
                name="right"
                size="s"
                color="primary"
              />
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
    </Card>
  );
};

export default RenderStoreReward;
