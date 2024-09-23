import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LocalizationContext } from "@src/libs/context";
import { configTopTab } from "navigation/config";
import NewTaskScreen from "screens/tab-home-new-tasks/layout";
import TaskWaitingCollect from "../tab-waiting-collect";
import TaskWaitingReturn from "../tab-waiting-return";

const Tab = createMaterialTopTabNavigator();

const TaskLaundryTab = () => {
  const I18n = React.useContext(LocalizationContext);
  return (
    <Tab.Navigator {...configTopTab}>
      <Tab.Screen
        name="TabNewTask"
        component={NewTaskScreen}
        options={{
          tabBarLabel: I18n.t("HOME.TAB_NEW_TASK"),
          tabBarTestID: "TabNewTask",
        }}
      />
      <Tab.Screen
        name="TabTaskWaitingCollect"
        component={TaskWaitingCollect}
        options={{
          tabBarLabel: I18n.t("LAUNDRY.TITLE_WAITING_COLLECT"),
          tabBarTestID: "TabTaskWaitingCollect",
        }}
      />
      <Tab.Screen
        name="TabTaskLaundryWaitingReturn"
        component={TaskWaitingReturn}
        options={{
          tabBarLabel: I18n.t("LAUNDRY.TITLE_WAITING_RETURN"),
          tabBarTestID: "TabTaskLaundryWaitingReturn",
        }}
      />
    </Tab.Navigator>
  );
};

export default TaskLaundryTab;
