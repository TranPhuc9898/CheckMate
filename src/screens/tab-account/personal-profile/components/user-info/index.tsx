import React, { FunctionComponent, ComponentProps, useEffect } from "react";
import { View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Card, Box, Text, Icon } from "@src/components";
import { IRespond, getTextWithLocale } from "@src/libs/helper";
import { getServicesOfUserAPI } from "apis/user";
import styles from "./styles";

interface CommunityProps extends ComponentProps<typeof View> {
  user: {
    name: string;
    workingPlaces: any;
    isPremiumTasker: boolean;
    level: any;
  };
  navigation?: any;
}

const CommunityScreen: FunctionComponent<CommunityProps> = ({ user }) => {
  const { name, workingPlaces = [], isPremiumTasker, level } = user;
  const [listServices, setListServices] = React.useState([]);

  // const district = workingPlaces.map((e: any) => e.district);

  const fetchData = async () => {
    const result: IRespond = await getServicesOfUserAPI();
    const services =
      (result.isSuccess &&
        result.data.map((e: any) => getTextWithLocale(e.text))) ||
      [];
    setListServices(services);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatArrayText = (arrayText: string[]): JSX.Element => {
    return arrayText.reduce((result, text, index) => {
      const separator =
        index === arrayText.length - 1 ? "." : <Text color="primary"> | </Text>;
      return (
        <>
          {result}
          {text.trim()}
          {separator}
          <Box style={{ paddingRight: 5 }}></Box>
        </>
      );
    }, <></>);
  };

  const formatArrayTextComma = (arrayText: string[]): JSX.Element => {
    return arrayText.reduce((result, text, index) => {
      const separator = index === arrayText.length - 1 ? "." : ",";
      return (
        <>
          {result}
          {text.trim()}
          {separator}
          <Box style={{ paddingRight: 5 }}></Box>
        </>
      );
    }, <></>);
  };
  const I18n = React.useContext(LocalizationContext);
  return (
    <Card>
      <Box center>
        <Text
          color="primary"
          fontSize="xl"
          numberOfLines={2}
          bold
        >
          {name}
        </Text>
      </Box>
      <Box>
        <Box style={styles.level}>
          <Box>
            <Text bold>{I18n.t("TAB_ACCOUNT.LEVEL")}:</Text>
            <Box style={styles.textLevel}>
              {level && level?.level > 1 ? (
                <Text>{I18n.t("TAB_ACCOUNT.LEVEL_2")}</Text>
              ) : (
                <Text>{I18n.t("TAB_ACCOUNT.LEVEL_1")}</Text>
              )}
            </Box>
          </Box>
          <Box>
            {isPremiumTasker ? (
              <Box style={styles.boxIconPremium}>
                <Icon
                  name="premium"
                  size="xl"
                  color="primary"
                />
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box style={styles.listService}>
          <Text bold>{I18n.t("TAB_ACCOUNT.SERVICES")}:</Text>
          <Box style={styles.textListService}>
            <Text>{formatArrayTextComma(listServices)}</Text>
          </Box>
        </Box>

        {/* Quận */}
        {/* <Box>
          <Text bold>{I18n.t("TAB_ACCOUNT.DISTRICTS")}:</Text>
        </Box>
        <Box style={styles.textDistrict}>
          <Text> {formatArrayText(district)}</Text>
        </Box> */}

        <Box></Box>
      </Box>
    </Card>
  );
};

export default CommunityScreen;
