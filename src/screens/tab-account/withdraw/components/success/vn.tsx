import { Box, Divider, Image, PriceItem, Text } from "components";
import { LocalizationContext } from "libs/context";
import { formatCardNumber, getCountry } from "libs/helper";
import { colors, spacing } from "libs/theme";
import { useContext } from "react";
import FastImage from "react-native-fast-image";
import styles from "./styles";

const Success = ({ amount, user }) => {
  const I18n = useContext(LocalizationContext);
  const country = getCountry();
  return (
    <Box>
      <Box
        center
        style={styles.giftStyle}
      >
        <FastImage
          style={styles.imageLoading}
          source={require("@images/alert/success.gif")}
          resizeMode="contain"
        />
      </Box>
      <Text
        bold
        center
        color="primary"
      >
        {I18n.t("TAB_ACCOUNT.PAYOUT_SUCCESS")}
      </Text>
      <Box
        row
        between
        style={styles.boxMainAccount}
      >
        <Box
          flex
          center
        >
          <Text>{I18n.t("TAB_ACCOUNT.AMOUNT")}</Text>
          <Box style={styles.boxContainer}>
            <PriceItem
              cost={amount}
              priceStyle={styles.mainAccountStyle}
              currencyStyle={styles.currencyStyle}
            />
          </Box>
        </Box>
        <Box
          flex
          center
        >
          <Text>{I18n.t("WITHDRAW.TRANSFER_FEE")}</Text>
          <Box style={styles.boxContainer}>
            <PriceItem
              cost={0}
              priceStyle={[
                styles.mainAccountStyle,
                { color: colors.secondary },
              ]}
              currencyStyle={[
                styles.currencyStyle,
                { color: colors.secondary },
              ]}
            />
          </Box>
        </Box>
      </Box>
      <Divider width={1} />
      <Box
        row
        alignCenter
        style={styles.boxAccount}
      >
        <Image
          source={require("@images/bank/techcombank.png")}
          style={styles.imageBank}
        />
        <Box flex>
          <Text bold>{I18n.t("WITHDRAW.TECHCOMBANK")}</Text>
          {user.TCBankNumber ? (
            <Text style={styles.textUserName}>
              {formatCardNumber(user.TCBankNumber)}
            </Text>
          ) : null}
          {/* <Text>{user.name.toUpperCase()}</Text> */}
        </Box>
      </Box>
    </Box>
  );
};
export default Success;
