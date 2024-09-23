import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { Box, Button, Card, Text,Icon } from "components";
import { LocalizationContext } from "libs/context";
import styles from "./styles";
import { navigateTo } from "libs/helper";
const ChangePassword = () => {
  const I18n = useContext(LocalizationContext);
  return (
    <Box style={styles.boxQRCode}>
      <Button
          testID="btnChangePassword"
          size="lg"
          title={I18n.t("CHANGE_PASSWORD.CHANGE_PASSWORD")}
          onPress={() => {
            navigateTo("ChangePassword");
          }}
          color={"primary"}
        >
         <Icon name="resetPass" size="l"/>
         <Box style={{paddingLeft:10}}>
         <Text bold color="white">{I18n.t("CHANGE_PASSWORD.CHANGE_PASSWORD")}</Text>
         </Box>
    
         </Button>
    </Box>
        
  );
};

export default ChangePassword;
