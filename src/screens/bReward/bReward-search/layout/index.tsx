import { useCallback, useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import _ from "lodash";
import SkeletonMyReward from "screens/bReward/my-reward/skeleton";

import { Box, Container, Icon, TextInput } from "@src/components";
import HeaderReward from "components/header-reward";
import { LocalizationContext } from "libs/context";
import { spacing } from "libs/theme";
import { RootState } from "redux/slice";
import { store } from "redux/store";

import ListReward from "../../components/list-reward";
import { onSearchText, resetIncentiveState, setIncentivesData } from "../../slice";
import BRewardsearch from "./bReward-search";
import EmptyData from "./empty-data";
import styles from "./styles";

const BRewardDetail = ({ navigation, route }) => {
  const I18n = useContext(LocalizationContext);
  const [searchText, setSearchText] = useState<any>();
  const [showLoading, setShowLoading] = useState(false);
  const handleChangeWithDebounce = useCallback(
    _.debounce(async (text) => {
      setShowLoading(true);
      await store.dispatch(onSearchText(text));
      setShowLoading(false);
    }, 700),
    []
  );

  const { incentivesData } = useSelector((state: RootState) => state.userReward);

  const onSearch = async (text) => {
    setSearchText(text);
    setTimeout;
    handleChangeWithDebounce(text);
  };

  const cleanSearch = async () => {
    setSearchText("");
    store.dispatch(setIncentivesData([]));
  };

  useEffect(() => {
    store.dispatch(setIncentivesData([]));
    return () => {
      store.dispatch(resetIncentiveState());
    };
  }, []);

  const _renderLoading = () => {
    if (showLoading) {
      return <SkeletonMyReward />;
    }
    if (_.isEmpty(incentivesData)) {
      return (
        <Box>
          <BRewardsearch onSearch={onSearch} />
          <EmptyData />
        </Box>
      );
    }
    return null;
  };

  return (
    <Container
      style={styles.boxContainer}
      headerShow={false}
    >
      <HeaderReward
        navigation={navigation}
        headerStyle={styles.headerStyle}
        giftStyle={styles.giftStyle}
        isHideRightIcon={true}
      />
      <TextInput
        autoFocus
        testID="btnSearchVouchers"
        leftIcon={
          <Icon
            name={"search"}
            size="l"
            color="grey2"
            style={{ marginLeft: 10 }}
          />
        }
        rightIcon={
          <TouchableOpacity onPress={() => cleanSearch()}>
            <Icon
              name={"close"}
              size="l"
              color="grey1"
              style={{ marginRight: spacing.s }}
            />
          </TouchableOpacity>
        }
        placeholder={I18n.t("BREWARD.VOUCHERS_SEARCHES")}
        value={searchText}
        onChangeText={(text) => onSearch(text)}
        onSubmitEditing={() => onSearch(searchText)}
        color="white"
        inputContainerStyle={styles.inputStyle}
        containerStyle={styles.containerStyle}
        errorStyle={styles.errorStyle}
        inputStyle={styles.textInput}
      />

      {_renderLoading()}

      <ListReward data={incentivesData} />
    </Container>
  );
};

export default BRewardDetail;
