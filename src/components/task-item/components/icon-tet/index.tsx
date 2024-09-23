import { Icon } from "@src/components";
import { FC } from "react";
import styles from "../styles";
export interface IIconTet {
  isTetBooking?: boolean;
}

const IconTet: FC<IIconTet> = ({ isTetBooking }) => {
  if (isTetBooking) {
    return (
      <Icon
        name="tet"
        color="secondary"
        size="xxxl"
        style={styles.iconStyle}
      />
    );
  }
  return null;
};

export default IconTet;
