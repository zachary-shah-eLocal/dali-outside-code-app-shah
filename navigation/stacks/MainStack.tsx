import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ContactScreen from "../../screens/mainStack/ContactScreen";
import SwitchAccountScreen from "../../screens/mainStack/SwitchAccountScreen";
import { Screens } from "../consts/Screens";
import { Stacks } from "../consts/Stacks";
import AccountStack from "./AccountStack";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Stacks.HOME_STACK} component={HomeStack} />
      <Stack.Screen name={Stacks.ACCOUNT_STACK} component={AccountStack} />
      <Stack.Screen name={Stacks.PROFILE_STACK} component={ProfileStack} />
      <Stack.Screen name={Screens.CONTACT_SCREEN} component={ContactScreen} />
      <Stack.Screen
        name={Screens.SWITCH_ACCOUNT_SCREEN}
        component={SwitchAccountScreen}
      />
    </Stack.Navigator>
  );
};
