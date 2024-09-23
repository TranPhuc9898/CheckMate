import React, { FunctionComponent, ComponentProps, useEffect } from "react";
import { View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import {
  Avatar,
  CardItem,
  Box,
  Text,
  Icon,
  TransitionView,
} from "@src/components";
import {
  IRespond,
  getTextWithLocale,
  getAvgRating,
  IObjectText,
} from "@src/libs/helper";
import { getServicesOfUserAPI } from "apis/user";
import styles from "./styles";
import PremiumBanner from "./components/banner-premium";

interface IProfile extends ComponentProps<typeof View> {
  user: {
    name: string;
    phone: string;
    avatar: string;
    workingPlaces: any;
    avgRating: number;
    isPremiumTasker: boolean;
  };
  navigation?: any;
}

const ProfileScreen: FunctionComponent<IProfile> = ({ user, navigation }) => {
  const {
    name,
    phone,
    avatar,
    workingPlaces = [],
    avgRating,
    isPremiumTasker,
  } = user;
  const [listServices, setListServices] = React.useState([]);

  const district = workingPlaces.map((e: any) => e.district);

  const fetchData = async () => {
    const result: IRespond = await getServicesOfUserAPI();
    const services =
      (result.isSuccess && result.data.map((e: any) => e.text)) || [];
    setListServices(services);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderListText = (array: any) => (
    <Box
      flex
      style={styles.textServices}
    >
      <Text numberOfLines={1}>
        {array.map((e: IObjectText, index: number) => (
          <Text
            key={index}
            fontSize="m"
          >
            {getTextWithLocale(e)}
            {index + 1 < array.length ? ", " : "."}
          </Text>
        ))}
      </Text>
    </Box>
  );

  const _renderRating = () => {
    if (!avgRating) {
      return null;
    }
    return (
      <Box
        row
        alignCenter
      >
        <Icon
          name="starFill"
          color="secondary"
          size={"m"}
        />
        <Text
          fontSize="m"
          style={styles.textRating}
        >
          {getAvgRating(avgRating)}
        </Text>
      </Box>
    );
  };

  const I18n = React.useContext(LocalizationContext);
  return (
    <TransitionView duration={1000}>
      <CardItem
        iconName="right"
        title={I18n.t("TAB_ACCOUNT.PROFILE")}
        onPress={() => navigation.navigate("Profile")}
        testID="btnProfileDetail"
      >
        <Box
          row
          alignCenter
        >
          <Avatar
            size={80}
            avatar={avatar}
          />
          <Box
            flex
            between
            style={styles.boxBottom}
          >
            <Text
              numberOfLines={2}
              bold
              variant="h3"
              color="secondary"
            >
              {name}
            </Text>
            <Text
              fontSize="m"
              style={styles.textPhone}
            >
              {phone}
            </Text>
            {_renderRating()}
            <Box>
              {/*  TODO: Tasker yêu cầu ẩn districts */}
              {/* <Box row>
              <Text
                fontSize="s"
                color="primary"
                numberOfLines={2}
                bold
              >
                {I18n.t("TAB_ACCOUNT.DISTRICTS")}:
              </Text>
              {renderListText(district)}
            </Box> */}
            </Box>
          </Box>
        </Box>
        <Box
          row
          alignCenter
          style={styles.boxServices}
        >
          <Text
            fontSize="m"
            color="primary"
            numberOfLines={2}
            bold
          >
            {I18n.t("TAB_ACCOUNT.SERVICES")}:
          </Text>
          {renderListText(listServices)}
        </Box>
        {/* Render premium banner */}
        <PremiumBanner
          isPremiumTasker={isPremiumTasker}
          navigation={navigation}
        />
      </CardItem>
    </TransitionView>
  );
};

export default ProfileScreen;
