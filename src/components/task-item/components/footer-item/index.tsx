import { Box, Icon, PriceItem, Text } from "@src/components";
import { IObjectText, getUserIdGlobal } from "libs/helper";
import { FC, useContext } from "react";
import styles from "../styles";
import {
  Requirements,
  RatingTip,
  StatusCancelTask,
  ReasonCancelTask,
} from "../index";
import { statusTask } from "libs/config";
import { LocalizationContext } from "libs/context";
import { getLocalePaymentMethod } from "libs/helper";
import _ from "lodash";

interface IFooterItem {
  requirements?: any;
  paymentMethod?: any;
  cost?: any;
  testID?: any;
}
const FooterItem: FC<IFooterItem> = ({
  requirements,
  paymentMethod,
  cost,
  testID,
}) => {
  const I18n = useContext(LocalizationContext);

  const renderFooter = () => {
    const collectMoneyMethod = getLocalePaymentMethod(paymentMethod);
    if (collectMoneyMethod) {
      return (
        <Box
          row
          alignCenter
        >
          <Icon
            name="collectMoney"
            color="primary"
            size="l"
          />
          <Text
            variant="h4"
            style={styles.collectMoneyText}
          >
            {I18n.t(collectMoneyMethod)}
          </Text>
        </Box>
      );
    }
    return (
      <>
        {/* Requirements */}
        <Requirements requirements={requirements} />
      </>
    );
  };

  return (
    <Box style={styles.minHeightContainer}>
      <Box
        row
        between
        alignCenter
        style={styles.bottomContainer}
      >
        {renderFooter()}
        <PriceItem
          cost={cost}
          testID={testID}
          priceStyle={styles.priceStyle}
          currencyStyle={styles.currencyStyle}
        />
      </Box>
    </Box>
  );
};

export default FooterItem;
