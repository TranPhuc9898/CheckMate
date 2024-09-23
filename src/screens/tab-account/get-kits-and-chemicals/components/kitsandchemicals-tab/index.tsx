import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LocalizationContext } from "@src/libs/context";
import { configTopTab } from "navigation/config";
import React from "react";

import GetChemicals from "screens/tab-account/get-kits-and-chemicals/components/get-chemicals";
import GetKits from "screens/tab-account/get-kits-and-chemicals/components/get-kits";
const Tab = createMaterialTopTabNavigator();
const KitsAndChemicalsTab = () => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <Tab.Navigator {...configTopTab}>
      <Tab.Screen
        name="GET_KITS"
        component={GetKits}
        options={{
          tabBarLabel: I18n.t("KIT_CHEMICALS.GET_KITS"),
        }}
      />
      <Tab.Screen
        name="GET_CHEMICALS"
        component={GetChemicals}
        options={{
          tabBarTestID: "TAB_CHEMICALS",
          tabBarLabel: I18n.t("KIT_CHEMICALS.GET_CHEMICALS"),
        }}
      />
    </Tab.Navigator>
  );
};

export default KitsAndChemicalsTab;
