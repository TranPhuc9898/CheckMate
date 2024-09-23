import { Box, Icon } from "@src/components";
import { FC } from "react";
import styles from "../styles";
import _ from "lodash";

interface IFooterItem {
  requirements?: any;
}
const FooterItem: FC<IFooterItem> = ({ requirements }) => {
  
  const _renderContent = () => {
    if (_.isEmpty(requirements)) return null;
    return (
      requirements?.map((item: any, index: number) => (
        <Icon
          key={"requirements_" + index}
          name={item}
          color="secondary"
          style={styles.iconStyle}
          size="xxl"
        />
      ))
    )
  }
  
  return (
    <Box
      row
      alignCenter
    >
      {_renderContent()}
    </Box>
  );
};

export default FooterItem;
