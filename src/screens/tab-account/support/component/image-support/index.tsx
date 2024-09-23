import React, { useContext } from 'react'
import { Box,Image ,Text} from 'components'
import { LocalizationContext } from 'libs/context';

import styles from "./styles"


interface ISupportImage {
    image:any
    textSupport:string
    textExtraSupport?:string
}
const ImageSupport:React.FC<ISupportImage> = ({image,textSupport,textExtraSupport}) => {
  return (
    <Box center>
    {/* Image */}
    <Image
      source={image}
      style={styles.backgroundImageStyle}
    />
    <Box style={styles.text}>
      {/* Text: Hỗ trợ công việc hằng ngày  */}
      <Text
        color="primary"
        variant='h3'
      >
        {textSupport}
      </Text>
    </Box>
    <Box >
    <Text
        color="primary"
        variant='h3'
        center
      >
        {textExtraSupport}
      </Text>
    </Box>
  </Box>
  )
}

export default ImageSupport
