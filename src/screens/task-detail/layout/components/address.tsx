/**
 * @author QuanNguyen
 * @email [quan.nguyen@btaskee.com]
 * @create date 2023-03-16 14:49:13
 * @modify date 2023-03-16 14:49:13
 * @desc [Address]
 */

import { Box, Button, Icon, Text } from "@src/components";
import styles from "../styles";
import { openMapAsync } from "libs/helper";
import { FC } from "react";
interface IAddress {
  address: string;
  lat?: string;
  lng?: string;
  isMapDisabled?: boolean;
}

const Address: FC<IAddress> = ({ address, lat, lng, isMapDisabled }) => {
  /**
   * Khi user bị block, vẫn có thể xem được công việc posted,
   * Nhưng chỉ xem được 2/3 chi tiết địa chỉ, phần còn lại sẽ hiển thị ****.
   * Phần map sẽ bị disabled
   * Những công việc user đã nhận sẽ không bị ảnh hưởng
   */
  const getAddress = () => {
    let textAddress = "";

    if (!address) {
      return textAddress;
    }

    if (isMapDisabled) {
      const numberOfKey = Math.floor(address.length / 3);
      for (let index = 0; index < numberOfKey; index++) {
        textAddress = textAddress + "*";
      }
      return textAddress + address.slice(numberOfKey);
    }
    return address;
  };

  return (
    <Box
      row
      style={styles.containerAddress}
    >
      <Box
        row
        alignCenter
      >
        <Icon
          name="location"
          color="primary"
        />
      </Box>
      <Box
        flex
        style={styles.boxContent}
      >
        <Text
          style={styles.lineHeight}
          fontWeight="m"
          color="grey0"
        >
          {getAddress()}
        </Text>
      </Box>
      <Button
        disabled={Boolean(isMapDisabled)}
        buttonStyle={styles.containerBtnMap}
        onPress={() => openMapAsync(lat, lng)}
        size="md"
      >
        <Icon name="map" />
      </Button>
    </Box>
  );
};

export default Address;
