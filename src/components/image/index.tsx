import FastImage from "react-native-fast-image";

/**
 * @see https://github.com/DylanVann/react-native-fast-image
 */
export interface ICustomImage extends React.ComponentProps<typeof FastImage> {}

const DEFAULT_IMAGE = require("assets/images/default-image.png");

const CustomImage: React.FunctionComponent<ICustomImage> = (props) => {

  let source = props?.source;

  if (!source) {
    source = DEFAULT_IMAGE;
  }

  if (source.hasOwnProperty('uri')) {
    source.uri = source?.uri && (source?.uri.includes("http") || source?.uri.includes("file")) ? source.uri  : null;
    if (!source.uri) {
      source = DEFAULT_IMAGE
    }
  }

  return (
    <FastImage
      style={{ width: 200, height: 200 }}
      resizeMode={FastImage.resizeMode.contain}
      {...props}
      source={source}
    />
  );
}

export default CustomImage;
