/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2022-10-13 10:32:17
 * @modify date 2022-10-13 10:32:17
 * @desc [Show laundry detail]
 */

import { FC } from "react";
import { Box, Divider, PriceItem, Text } from "@src/components";
import styles from "./styles";
import _ from "lodash";
import { getTextWithLocale } from "libs/helper";
import { IDetailInfo } from "..";
import LaundryDate from "./laundry-date";

const LaundryDetail: FC<IDetailInfo> = ({
  laundryDate,
  detail,
}) => {
  // Render detail clothes
  const _listClothes = (clothes: any) => {
    return clothes?.map((item, index) => (
      <Box key={item?.type + index}>
        <Divider />
        <Box
          row
          alignCenter
          style={styles.boxClothes}
        >
          <Box
            flex
            style={styles.lineClothes}
          >
            <Text
              color="grey0"
              fontSize="m"
              bold
            >
              {getTextWithLocale(item?.text)}
            </Text>
            <Text
              color="grey0"
              fontSize="m"
            >
              x{item?.quantity}
              <Text
                color="grey0"
                fontSize="m"
              >
                {getTextWithLocale(item?.unit)}
              </Text>
            </Text>
          </Box>
          <PriceItem
            cost={item?.price}
            priceStyle={styles.priceStyle}
            currencyStyle={styles.priceStyle}
          />
        </Box>
      </Box>
    ));
  };

  // Render content
  const _renderContent = ({ text, data }) => {
    if (_.isEmpty(data)) {
      return null;
    }
    return (
      <Box style={styles.containerHeader}>
        <Text
          bold
          color="primary"
        >
          {getTextWithLocale(text)}
        </Text>
        <Box style={styles.boxClothes}>{_listClothes(data)}</Box>
      </Box>
    );
  };

  return (
    <Box>
      {/* Collection date */}
      <LaundryDate
        date={laundryDate?.date}
        collectionDate={laundryDate?.collectionDate}
      />
      {/* Laundry detail */}
      <Box style={styles.containerLaundryDetail}>
        {/* Washing detail */}
        {_renderContent({
          text: detail?.washing?.text,
          data: detail?.washing?.dataV2,
        })}
        {/* Dry cleaning detail */}
        {_renderContent({
          text: detail?.dryClean?.text,
          data: detail?.dryClean?.data,
        })}
        {/* Others detail */}
        {_renderContent({
          text: detail?.others?.text,
          data: detail?.others?.dataV2,
        })}
      </Box>
    </Box>
  );
};

export default LaundryDetail;
