import React, { FunctionComponent, ComponentProps, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { LocalizationContext } from "@src/libs/context";
import { Container, Box, Icon, Text, Card } from "@src/components";
import styles from "./styles";
import { listSocial } from "libs/config";
import { getIsoCodeGlobal, openUrl } from "libs/helper";
import _ from "lodash";
import { trackingCleverTapScreenView } from "@src/libs/tracking/track-clever-tap";

interface CommunityProps extends ComponentProps<typeof View> {
  navigation;
}

const CommunityScreen: FunctionComponent<CommunityProps> = ({ }) => {
  const I18n = React.useContext(LocalizationContext);

  const getListSocial = listSocial[getIsoCodeGlobal()];
  // List social empty
  if (_.isEmpty(getListSocial)) {
    return null;
  }

  useEffect(() => {
    trackingCleverTapScreenView("Community");
  }, []);

  return (
    <Container>
      <Card>
        <Box
          row
          style={styles.boxContainer}
        >
          {getListSocial.map((item) => (
            <Box
              key={item.icon}
              center
            >
              <TouchableOpacity
                onPress={() => openUrl(item?.link)}
                style={styles.boxIcon}
              >
                <Icon
                  name={item?.icon}
                  size="xxxl"
                />
              </TouchableOpacity>
              <Text fontSize="m">{item?.name}</Text>
            </Box>
          ))}
        </Box>
      </Card>
    </Container>
  );
};

export default CommunityScreen;
