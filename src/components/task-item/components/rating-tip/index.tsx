import { Icon } from "components";
import { FC } from "react";
import styles from "../styles";

interface IRatingTip {
  ratingTip?: boolean;
}

const RatingTip: FC<IRatingTip> = ({ ratingTip }) => {
  if (!ratingTip) {
    return null;
  }
  return (
    <Icon
      name="tip"
      color="secondary"
      style={styles.iconStyle}
    />
  );
};
export default RatingTip;
