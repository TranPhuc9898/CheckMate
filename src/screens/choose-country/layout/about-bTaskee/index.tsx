import React from "react";
import { LocalizationContext } from "@src/libs/context";
import { Box, Card, Container, Text } from "@src/components";
import styles from "./styles";
import { FlatList } from "react-native";

const DATA = [
  {
    text: "Photos & Text",
    image: "ABC",
  },
  {
    text: "Photos & Text",
    image: "ABC",
  },
  {
    text: "Photos & Text",
    image: "ABC",
  },
];

const AboutBTaskeeScreen = () => {
  const I18n = React.useContext(LocalizationContext);

  const _renderItem = ({ item, index }) => (
    <Box
      key={index}
      center
      style={styles.containerItem}
    >
      <Text>{item.text}</Text>
    </Box>
  );

  return (
    <Container headerShow={true}>
      <Card style={styles.container}>
        <Text
          bold
          style={styles.description}
        >
          {I18n.t("ABOUT_BTASKEE.DESCRIPTION")}
        </Text>
        <FlatList
          data={DATA}
          renderItem={_renderItem}
        />
      </Card>
    </Container>
  );
};

export default AboutBTaskeeScreen;
