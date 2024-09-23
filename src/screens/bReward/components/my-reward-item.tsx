import React, { FC, useContext, useMemo } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Grayscale } from "react-native-color-matrix-image-filters";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import moment from "moment";

import { Box, Image, Text } from "components";
import { LocalizationContext } from "libs/context";
import { formatDate, getTextWithLocale } from "libs/helper";
import { colors, spacing } from "libs/theme";

const { width } = Dimensions.get("window");

const SIZE_CIRCLE = 24;
const BACKGROUND_COLOR = colors.backgroundGrey;
const SIZE_LOGO = width / 6;
const PADDING = spacing.l;
const WIDTH_LINE = 2;
const BORDER_COLOR = colors.grey5;

interface IMyRewardItem {
  item: any;
  testID?: string;
  testIDTitle?: string;
}

const RenderImage = ({ isInActive, image }) => {
  const source = {
    uri: image,
  };

  if (isInActive) {
    return (
      <Grayscale>
        <Image
          style={styles.logo}
          resizeMode={"cover"}
          source={source}
        />
      </Grayscale>
    );
  }

  return (
    <Image
      style={styles.logo}
      resizeMode={"cover"}
      source={source}
    />
  );
};

export const MyRewardItem: FC<IMyRewardItem> = ({ item, testID, testIDTitle }) => {
    const navigation = useNavigation();
    const { t } = useContext(LocalizationContext);
    const isUsed = _.get(item, "used", null);
    const isExpired = useMemo(() => {
      // check expired date
      return moment(item?.expired).isSameOrBefore(moment().toDate());
    }, [item]);
  
    const isInActive = isUsed || isExpired;
  
    const borderColorLine = isInActive ? colors.white : BORDER_COLOR;
    const backgroundColor = isInActive ? colors.grey4 : colors.white;
    const textColor = isInActive ? colors.grey0 : colors.black;
  
    const renderBottomCard = () => {
      if (isUsed) {
        return (
          <Text
            fontSize="m"
            style={{ color: textColor }}
          >
            {`${t("TAB_BENEFIT.USED")}: `}
            <Text
              fontSize="m"
              style={{ color: textColor }}
            >
              {formatDate(item?.usedAt, "other")}
            </Text>
          </Text>
        );
      }
  
      if (isExpired) {
        return (
          <Text
            fontSize="m"
            style={{ color: textColor }}
          >
            {`${t("TAB_BENEFIT.EXPIRED")}: `}
            <Text
              fontSize="m"
              style={{ color: textColor }}
            >
              {formatDate(item?.expired, "other")}
            </Text>
          </Text>
        );
      }
  
      return (
        <Box row>
          <Box flex>
            <Text
              fontSize="m"
              style={{ color: textColor, marginBottom: spacing.s }}
            >
              {t("TAB_BENEFIT.EXPIRED_ON")}
            </Text>
            <Text
              fontSize="m"
              style={{ color: textColor }}
            >
              {formatDate(item?.expired, "other")}
            </Text>
          </Box>
        </Box>
      );
    };

    return (
        <TouchableOpacity
          testID={testID}
          // onPress={onPress}
          style={[styles.container, { backgroundColor }]}
          onPress={() => navigation.navigate("GiftDetail", { rewardId: item?._id })}
        >
          <Box
            center
            style={styles.leftContainer}
          >
            <RenderImage
              isInActive={isInActive}
              image={item?.brandInfo?.image}
            />
            <Box style={[styles.line, { borderColor: borderColorLine }]} />
          </Box>
          <Box
            center
            style={styles.lineContainer}
          >
            <Box style={styles.circle} />
            <Box style={styles.circle} />
          </Box>
          <Box
            flex
            style={styles.rightContent}
          >
            <Text
              testID={testIDTitle}
              bold
              numberOfLines={2}
              style={{ color: textColor, marginBottom: spacing.s }}
            >
              {getTextWithLocale(item.title)}
            </Text>
            {item.brandInfo?.text ? (
              <Text
                numberOfLines={1}
                fontSize="m"
                style={{ color: textColor, marginBottom: spacing.s }}
              >
                {getTextWithLocale(item.brandInfo?.text)}
              </Text>
            ) : null}
            <Box style={[styles.lineBottom, { backgroundColor: borderColorLine }]} />
            <Box style={{ marginTop: spacing.m }}>{renderBottomCard()}</Box>
          </Box>
        </TouchableOpacity>
      );
    };

    const styles = StyleSheet.create({
        container: {
          borderRadius: 15,
          flexDirection: "row",
          overflow: "hidden",
        },
        leftContainer: {
          paddingVertical: PADDING,
          paddingLeft: spacing.xl,
          paddingRight: spacing.xl - SIZE_CIRCLE / 2,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderColor: BORDER_COLOR,
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
          alignItems: "center",
          justifyContent: "center",
        },
        logo: {
          width: SIZE_LOGO,
          height: SIZE_LOGO,
          borderRadius: SIZE_LOGO,
        },
        line: {
          position: "absolute",
          top: -4,
          bottom: -4,
          left: -4,
          right: -SIZE_CIRCLE / 2 - WIDTH_LINE / 2,
          borderWidth: WIDTH_LINE,
          borderStyle: "dashed",
          borderRadius: 1, //fix show borderStyle in android
        },
        lineContainer: {
          justifyContent: "space-between",
          marginTop: -SIZE_CIRCLE / 2,
          marginBottom: -SIZE_CIRCLE / 2,
        },
        circle: {
          width: SIZE_CIRCLE,
          height: SIZE_CIRCLE,
          borderRadius: SIZE_CIRCLE,
          backgroundColor: BACKGROUND_COLOR,
          borderWidth: 1,
          borderColor: BORDER_COLOR,
        },
        rightContent: {
          paddingVertical: PADDING,
          paddingRight: spacing.xl,
          paddingLeft: spacing.xl - SIZE_CIRCLE / 2,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderColor: BORDER_COLOR,
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
          justifyContent: "center",
        },
        lineBottom: {
          marginTop: spacing.m,
          height: 1,
        },
      });