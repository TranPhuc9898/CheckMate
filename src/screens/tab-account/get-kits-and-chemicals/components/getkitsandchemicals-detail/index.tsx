import { Box, Card, Container, Text, Image } from "components";
import { LocalizationContext } from "libs/context";
import {
  formatMoney,
  getCountry,
  getCurrency,
  getTextWithLocale,
  openUrl,
} from "libs/helper";
import { borderRadius, colors, spacing } from "libs/theme";
import { useContext } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");
const SIZE_IMAGE = width - spacing.l * 4;

const KitsAndChemicalsDetail = (props: any) => {
  const I18n = useContext(LocalizationContext);
  const image = props?.route?.params?.imageUrl;
  const name = props?.route?.params?.name?.vi;
  const price = props?.route?.params?.price;
  const amount = props?.route?.params?.amount;
  const buyAddressUrl = props?.route?.params?.buyAddressUrl;
  const note = props?.route?.params?.note;

  const country = getCountry();
  return (
    <Container>
      <Card flex>
        <Box flex>
          <Box>
            <Image
              source={{
                uri: image,
              }}
              style={styles.backgroundImage}
            />
          </Box>
          <Box>
            <Text
              variant="h2"
              bold
            >
              {name}
            </Text>
            <Box style={{ paddingTop: spacing.xl }}>
              <Text fontSize="l">
                {I18n.t("KIT_CHEMICALS.KITS_AND_CHEMICALS_AMOUNT")}: {amount}
              </Text>
              <Text
                fontSize="l"
                style={styles.txtPice}
              >
                {I18n.t("KIT_CHEMICALS.KITS_AND_CHEMICALS_PRICE")}:{" "}
                {formatMoney(price)} {country?.currency?.code}
              </Text>
              {note ? (
                <Text
                  fontSize="l"
                  style={styles.txtPice}
                  italic
                  color="primary"
                >
                  {getTextWithLocale(note)}
                </Text>
              ) : null}
            </Box>
          </Box>
        </Box>
        {buyAddressUrl ? (
          <TouchableOpacity
            testID="btnBuyKitChemicals"
            style={styles.pressLink}
            onPress={() => {
              openUrl(buyAddressUrl);
            }}
          >
            <Box center>
              <Text
                bold
                color="white"
              >
                {I18n.t("KIT_CHEMICALS.PRESS_BUY_KITS_AND_CHEMICALS")}
              </Text>
            </Box>
          </TouchableOpacity>
        ) : null}
      </Card>
    </Container>
  );
};

export default KitsAndChemicalsDetail;

const styles = StyleSheet.create({
  backgroundImage: {
    width: SIZE_IMAGE,
    height: SIZE_IMAGE,
    borderRadius: borderRadius.s,
    marginBottom: spacing.xxl,
  },
  pressLink: {
    backgroundColor: colors.secondary,
    borderRadius: spacing.m,
    padding: spacing.xl,
  },
  txtPice: {
    marginTop: spacing.s,
  },
});
