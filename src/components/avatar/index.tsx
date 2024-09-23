/**
 * @author Huu Toan Nguyen
 * @email huutoan.nguyen@btaskee.com
 * @create date 2022-10-28 09:00
 * @modify date 2022-10-11 09:17
 * @desc custom text component
 */

import FastImage from "react-native-fast-image";
import { StyleSheet } from "react-native";
import { colors, spacing } from "@src/libs/theme";
import { getAvatar } from 'libs/helper';
import Box from "components/box";

/**
 * @see https://github.com/DylanVann/react-native-fast-image
 */
interface IAvatar extends React.ComponentProps<typeof FastImage> {
  /**
   * Url of avatar
   */
  avatar: string;

  /**
   * Size of avatar
   */
  size: number;

  /**
   * Style of box wrap avatar
   */
  containerStyle?: object;
  /**
   * Resize mode
   */
  resizeMode?: keyof typeof FastImage.resizeMode
}

const ComponentAvatar: React.FunctionComponent<IAvatar> = ({
  containerStyle,
  resizeMode,
  size,
  avatar,
}) => {
  let source = require("@icons/chat/icon_avatar_default.png");
  if (avatar) {
    source = getAvatar(avatar);
  }
  return (
    <Box style={[containerStyle || {}, styles.container]}>
      <FastImage
        resizeMode={resizeMode || FastImage.resizeMode.contain}
        style={[styles.image, { width: size, height: size }]}
        source={source}
      />
    </Box>
  );
};

ComponentAvatar.defaultProps = {
  size: 80,
};

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 180,
  },
  container: {
    borderRadius: 180,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default ComponentAvatar;
