import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LocalizationContext } from "@src/libs/context";
import React from "react";

import MyTaskScreen from "screens/tab-home-my-tasks";
import NewTaskScreen from "screens/tab-home-new-tasks";
import { configTopTab } from "./config";

const Tab = createMaterialTopTabNavigator();

const TaskTab = (props) => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <Tab.Navigator {...configTopTab}>
      <Tab.Screen
        name="TabNewTask"
        component={NewTaskScreen}
        options={{
          swipeEnabled: false,
          tabBarLabel: I18n.t("HOME.TAB_NEW_TASK"),
          tabBarTestID: "TabNewTask",
        }}
      />
      <Tab.Screen
        name="TabMyTask"
        component={MyTaskScreen}
        options={{
          swipeEnabled: false,
          tabBarLabel: I18n.t("HOME.TAB_MY_TASK"),
          tabBarTestID: "TabMyTask",
        }}
      />
    </Tab.Navigator>
  );
};

export default TaskTab;
