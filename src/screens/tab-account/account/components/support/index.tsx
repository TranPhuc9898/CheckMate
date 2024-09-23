import { useContext } from 'react'
import { LocalizationContext } from 'libs/context';
import { navigateTo } from 'libs/helper';
import { Box, CardItem,Text } from 'components';


const Support = () => {
    const I18n = useContext(LocalizationContext);
  return (
    <CardItem
      testID="btnSupport"
      iconName="right"
      title={I18n.t("SUPPORT.TITLE")}
      onPress={() => navigateTo("SupportScreen")}
    >
      <Box>
        <Text>{I18n.t("SUPPORT.DESCRIPTION")}</Text>
      </Box>
    </CardItem>
  )
}

export default Support
