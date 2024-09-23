import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Box, Card, Container, Divider, Icon, Text } from "components";
import { getTextWithLocale } from "libs/helper";
// styles
import styles from "./styles";
import HeaderReward from "components/header-reward";
import { LocalizationContext } from "libs/context";
import { useNavigation } from "@react-navigation/native";

const RewardStore: React.FC<any> = (props) => {
  // Hook
  const navigation = useNavigation();
  const [dataStore, setDataStore] = useState<[any]>(props?.route?.params);
  const I18n = React.useContext(LocalizationContext);
  //
  const _renderStore = ({ item, index }: { item: any; index: any }) => {
    const isLastItem = index === dataStore.length - 1;
    return (
      <Box
        key={index}
        style={styles.boxCard}
        testID={`btnStoreItem${index}`}
      >
        <Box
          row
          style={styles.boxContainer}
        >
          <Box style={styles.boxIcon}>
            <Icon
              name="location_social"
              size="m"
              color="primary"
            />
          </Box>
          <Box flex>
            {/* Office name */}
            {item?.name && item?.name !== getTextWithLocale(item?.text) ? (
              <Text
                bold
                numberOfLines={1}
                style={styles.txtOfficeName}
              >
                {item?.name}
              </Text>
            ) : null}
            {/* Office text */}
            <Text color="grey0">{getTextWithLocale(item?.text)}</Text>
          </Box>
        </Box>

        {!isLastItem && <Divider width={1} />}
      </Box>
    );
  };

  const _renderStoreEmpty = () => {
    return (
      <Box center>
        <Text>{I18n.t("BREWARD.BRANCH_STORE_EMPTY")}</Text>
      </Box>
    );
  };
  return (
    <Container
      headerShow={false}
      style={styles.containerStyle}
    >
      <HeaderReward
        title={I18n.t("BREWARD.STORE")}
        navigation={navigation}
        headerStyle={styles.headerStyle}
        giftStyle={styles.giftStyle}
        isGift={false}
        isHideRightIcon={true}
      />

      <Card flex>
        <FlatList
          renderItem={_renderStore}
          data={dataStore}
          keyExtractor={(item, index) => `${item.toString()}-${index}`}
          ListEmptyComponent={_renderStoreEmpty}
          ListHeaderComponent={
            <Text bold>
              {I18n.t("BREWARD.BRANCH_STORE", { t: dataStore.length })}
            </Text>
          }
        />
      </Card>
    </Container>
  );
};

export default RewardStore;
