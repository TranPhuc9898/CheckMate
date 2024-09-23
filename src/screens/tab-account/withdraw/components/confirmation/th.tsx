import { Box, Divider, Image, PriceItem, Text } from "components";
import { LocalizationContext } from "libs/context";
import { formatCardNumber, getCountry } from "libs/helper";
import { useContext } from "react";
import styles from "./styles";

const Confirmation = ({ amount, user }) => {
  const I18n = useContext(LocalizationContext);
  return (
    <Box>
      <Text
        bold
        center
        color="secondary"
      >
        {I18n.t("TAB_ACCOUNT.CONFIRMATION_WITHDRAW")}
      </Text>
      <Box
        center
        style={styles.boxMainAccount}
      >
        <Text
          bold
          color="primary"
          fontSize="xl"
        >
          {I18n.t("TAB_ACCOUNT.AMOUNT")}
        </Text>
        <Box margin="l">
          <PriceItem
            cost={amount}
            priceStyle={styles.mainAccountStyle}
          />
        </Box>
      </Box>
      <Divider width={1} />
      <Box
        row
        alignCenter
        style={styles.boxAccount}
      >
        <Image
          source={require("@images/bank/kasikorn-bank.png")}
          style={styles.imageBank}
        />
        <Box flex>
          <Text bold>{I18n.t("WITHDRAW.KASIKORN_BANK")}</Text>
          {user.TCBankNumber ? (
            <Text style={styles.textUserName}>
              {formatCardNumber(user.TCBankNumber)}
            </Text>
          ) : null}
          {/* <Text>{user.name.toUpperCase()}</Text> */}
        </Box>
      </Box>
      <Divider width={1} />
      <Text
        center
        color="secondary"
        style={styles.txtNoteConfirm}
      >
        {I18n.t("WITHDRAW.RECEIPT_OF_MONEY_INFO_TH")}
      </Text>
    </Box>
  );
};
export default Confirmation;
