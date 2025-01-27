import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CallDetailsScreen from "../../screens/mainStack/homeStack/summeryStack/CallDetailsScreen";
import LeadDetailsScreen from "../../screens/mainStack/homeStack/summeryStack/LeadDetailsScreen";
import SummaryScreen from "../../screens/mainStack/homeStack/summeryStack/SummaryScreen";
import { Screens } from "../consts/Screens";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.SUMMARY_SCREEN} component={SummaryScreen} />
      <Stack.Screen
        name={Screens.SUMMERY_LEAD_DETAILS_SCREEN}
        component={LeadDetailsScreen}
      />
      <Stack.Screen
        name={Screens.SUMMERY_CALL_DETAILS_SCREEN}
        component={CallDetailsScreen}
      />
    </Stack.Navigator>
  );
};
