
import React, { useContext } from 'react'
import { Box ,Text} from 'components'
import styles from './styles'

import { LocalizationContext } from 'libs/context'


const NoteSupplement = () => {
  const I18n =useContext(LocalizationContext);
  return (
    <Box flex>
    <Box style={styles.containerHeader}>
      <Text
        fontSize="m"
        style={styles.txtVertical}
      >
        {I18n.t("SUPPLEMENT_INFO.NOTE_SUPPLEMENT_1")}
      </Text>
      <Text
        fontSize="m"
        style={styles.txtVertical}
      >
       {I18n.t("SUPPLEMENT_INFO.NOTE_SUPPLEMENT_2")}
      </Text>
      <Text
        fontSize="m"
        style={styles.txtVertical}
      >
       {I18n.t("SUPPLEMENT_INFO.NOTE_SUPPLEMENT_3")}
      </Text>
    </Box>
  </Box>
  )
}

export default NoteSupplement


