/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-11 15:00:17
 * @modify date 2022-10-11 15:00:17
 * @desc [Choose country and language]
 */

import { FC, useContext, useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";

import { Image, Container, Box, Text, Button, Card } from "@src/components";
import { LocalizationContext } from "@src/libs/context";
import { useSelector } from "react-redux";
import { countries } from "@src/libs/config";

import { colors, spacing } from "libs/theme";
import { RootState } from "redux/slice";
import styles from "./styles";
import { setIsoCode, setLocale } from "redux/slice/app-slice";
import { store } from "redux/store";
import { requestTrackingPermission } from "react-native-tracking-transparency";
import * as RNLocalize from "react-native-localize";
import { defaultLocale, locales } from "libs/config";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import { canGoBack } from "libs/helper";

interface IChooseCountry {
  navigation: any;
}

const ChooseCountry: FC<IChooseCountry> = ({ navigation }) => {
  const selector = useSelector((state: RootState) => state.app);
  const I18n = useContext(LocalizationContext);
  const [isoCode, setIsoCodeToState] = useState(selector.isoCode || "");
  const [locale, setLocaleToState] = useState(selector.locale || "");
  // Calculate spacing top
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets(); // for Iphone X
  const headerHeight =
    getDefaultHeaderHeight(frame, false, insets.top) - spacing.xxl;

  // Show tracking permission
  const configTracking = async () => {
    // requestTrackingPermission for IOS
    await requestTrackingPermission();
  };

  // Set locale first
  useEffect(() => {
    configTracking();
    // lấy ngôn ngữ của app theo ngôn ngữ của thiết bị khi lần đầu tiên mở app
    if (!selector.locale) {
      const languageTag =
        RNLocalize.findBestAvailableLanguage(locales)?.languageTag ||
        defaultLocale;
      setLocaleToState(languageTag);
      // Set locale to reducer
      store.dispatch(setLocale(languageTag));
    }
  }, []);

  // Show country
  const renderCountry = useMemo(() => {
    return (
      <Box between>
        {countries.map((item: any) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.countryContainer,
              {
                backgroundColor:
                  isoCode === item.isoCode ? colors.primary1 : colors.white,
              },
            ]}
            onPress={() => {
              // Set isoCode to state
              setIsoCodeToState(item.isoCode);
              // Set locale to state
              setLocaleToState(item.languageDefault);
              // Set locale to reducer
              store.dispatch(setLocale(item.languageDefault));
            }}
            testID={"country" + item.isoCode}
          >
            <Box
              row
              alignCenter
              style={styles.recordCountry}
            >
              <Image
                style={styles.flagStyles}
                source={item.flag}
              />
              <Text fontSize="xl" color={isoCode === item.isoCode ? "white" : "black"}>{I18n.t(item.key)}</Text>
            </Box>
          </TouchableOpacity>
        ))}
      </Box>
    );
  }, [isoCode, selector.locale]);

  // Confirm country and language
  const _onConfirmCountry = () => {
    // Set isoCode to reducer
    store.dispatch(setIsoCode(isoCode));
    // Set locale to reducer
    store.dispatch(setLocale(locale));
    if (canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("IntroApp");
    }
  };

  return (
    <Container
      headerShow={false}
      style={styles.containerStyle}
    >
      <Card
        flex
        style={[styles.cardStyle, { marginTop: headerHeight }]}
      >
        <Box flex>
          <Text
            center
            variant="h3"
            color="primary"
            style={styles.titleStyles}
          >
            {I18n.t("CHOOSE_COUNTRY.TITLE_CHOOSE_COUNTRY")}
          </Text>
          {renderCountry}
        </Box>
        <Button
          title={I18n.t("CHOOSE_COUNTRY.BUTTON_NEXT")}
          onPress={_onConfirmCountry}
          disabled={!Boolean(isoCode && selector.locale)}
          testID={"btnNextToLogin"}
        />
      </Card>
    </Container>
  );
};

export default ChooseCountry;
