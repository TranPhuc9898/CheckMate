import { Box, Card, Divider, Icon, Image, PriceItem, Text } from "components";
import { LocalizationContext } from "libs/context";
import { formatMoney, getCountry } from "libs/helper";
import { FC, useContext } from "react";
import styles from "./styles";

interface IUnableWithDraw {
  mainAccount: number;
  minimumMoneyAccount: number;
  minPayout: number;
}

const UnableWithDraw: FC<IUnableWithDraw> = ({
  mainAccount,
  minimumMoneyAccount,
  minPayout,
}) => {
  const I18n = useContext(LocalizationContext);
  const country = getCountry();
  return (
    <Card flex>
      {/* Main account */}
      <Box
        row
        between
        style={styles.containerMainAccount}
      >
        <Box row>
          <Text>{I18n.t("TAB_ACCOUNT.MAIN_ACCOUNT")}:</Text>
        </Box>
        <PriceItem
          cost={mainAccount}
          priceStyle={styles.priceStyle}
          currencyStyle={styles.currencyStyle}
          style={styles.boxPrice}
        />
      </Box>
      {/* End main account */}

      {/* Image */}
      <Box
        center
        margin="xxl"
      >
        <Image source={require("assets/images/task/warning-task.png")} />
      </Box>
      {/* End image */}

      {/* Min money withdraw */}
      <Box margin="l">
        <Text center>
          {I18n.t("WITHDRAW.UNABLE_TO_WITHDRAW_1")}
          <Text
            center
            color="secondary"
            bold
          >
            {I18n.t("WITHDRAW.MONEY", {
              cost: formatMoney(minimumMoneyAccount + minPayout),
              currency: country.currency.sign,
            })}
          </Text>
          <Text center>{I18n.t("WITHDRAW.UNABLE_TO_WITHDRAW_2")}</Text>
        </Text>
      </Box>
      {/* End min money withdraw */}

      <Divider style={styles.dividerStyle} />

      {/* Note */}
      <Box
        row
        alignCenter
        style={styles.txtNote}
      >
        <Icon
          name="warning"
          color="primary"
        />
        <Text
          color="primary"
          bold
        >
          {" "}
          {I18n.t("WITHDRAW.LABEL_NOTE")}
        </Text>
      </Box>
      {/* End note */}
      
      <Box style={styles.boxNote}>
        {/* Text note 1 */}
        <Text style={styles.txtNote}>
        • {I18n.t("WITHDRAW.MIN_MONEY")}
          <Text
            center
            color="secondary"
            bold
          >
            {I18n.t("WITHDRAW.MONEY", {
              cost: formatMoney(minPayout),
              currency: country.currency.sign,
            })}
          </Text>
        </Text>
        {/* End text note 1 */}

        {/* Text note 2 */}
        <Text style={styles.txtNote}>
          • {I18n.t("WITHDRAW.MIN_MONEY_NOTE")}
          <Text
            bold
            color="secondary"
          >
            {I18n.t("WITHDRAW.MONEY", {
              cost: formatMoney(minimumMoneyAccount),
              currency: country.currency.sign,
            })}
          </Text>
        </Text>
        {/* End text note 2 */}
      </Box>
    </Card>
  );
};
export default UnableWithDraw;