/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-24 15:06:09
 * @modify date 2022-10-24 15:06:09
 * @desc [Render price]
 */
import { Text, Skeleton } from "@src/components";
import { borderRadius, spacing } from "@src/libs/theme";
import { formatMoney, getCountry, getCurrency } from "libs/helper";
import { IPrice } from ".";
import { typeOfTransaction } from "libs/config";

const Price: React.FC<IPrice> = ({
  cost,
  currency,
  priceStyle,
  currencyStyle,
  style = {},
  testID,
  loading,
  collapse,
  type,
}) => {
  const textType = typeOfTransaction[type] || "";
  if (loading) {
    return (
      <Skeleton
        animation="pulse"
        height={spacing.xl}
        width={70}
        style={{
          borderRadius: borderRadius.s,
        }}
      />
    );
  }

  let price = formatMoney(cost);
  const currencyDefault = getCurrency(2);
  if (collapse) {
    price = formatMoney(cost / 1000) + "k";
  }

  return (
    <Text
      testID={testID}
      style={style}
    >
      {textType ? (
        <Text
          fontSize="m"
          style={priceStyle}
        >
          {textType}
        </Text>
      ) : null}
      <Text
        fontSize="l"
        style={priceStyle}
      >
        {formatMoney(cost)}
      </Text>
      <Text
        bold
        fontSize="m"
        style={currencyStyle}
      >
        {currency || currencyDefault}
      </Text>
    </Text>
  );
};

export default Price;
