import React, { useEffect, useState, useRef } from "react";
import { LocalizationContext } from "@src/libs/context";
import { TouchableOpacity, ScrollView } from "react-native";
import { Box, Icon, Image, Text } from "@src/components";
import styles from "../layout/styles";
import _ from "lodash";
import getBrewardCategories from "apis/benefit/get-breward-categories";
import { IRespond, handleError, getTextWithLocale } from "libs/helper";

interface IMemberInforItem {
  navigation?: any;
}

const MemberInforItem: React.FC<IMemberInforItem> = ({ navigation }) => {
  const I18n = React.useContext(LocalizationContext);
  const ref = useRef(null);
  const [categories, setCategories] = useState([]);

  const _initData = async () => {
    // Call api get task detail
    const result: IRespond = await getBrewardCategories();
    if (result?.isSuccess) {
      // Save data to state
      return setCategories(result?.data?.categories || []);
    }
    handleError(result?.error);
  };

  useEffect(() => {
    _initData();
  }, []);

  const onChooseCategories = (category) => {
    navigation.navigate("ListReward", {
      categoryName: category?.name,
      title: getTextWithLocale(category?.text),
    });
  };

  return (
    <Box>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <Box
          row
          style={styles.boxServices}
        >
          <TouchableOpacity
            onPress={() => onChooseCategories("")}
            style={[styles.itemService, styles.activeCategories]}
          >
            <Icon
              name="listTask"
              size={"xl"}
              color={"white"}
              style={styles.iconCategories}
            />
            <Text color={"white"}>{I18n.t("BREWARD.ALL")}</Text>
          </TouchableOpacity>
          {categories.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                testID={"category_" + item?.name}
                style={[styles.itemService]}
                onPress={() => onChooseCategories(item)}
              >
                <Image
                  source={{ uri: item.icon }}
                  style={[styles.iconCategories]}
                />
                <Text>{getTextWithLocale(item?.text)}</Text>
              </TouchableOpacity>
            );
          })}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default MemberInforItem;
