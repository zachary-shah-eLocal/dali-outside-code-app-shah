import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ForgetPasswordScreen from "../../screens/authStack/ForgetPasswordScreen";
import { LoginScreen } from "../../screens/authStack/LoginScreen";
import NewPasswordScreen from "../../screens/authStack/NewPasswordScreen";
import { Screens } from "../consts/Screens";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name={Screens.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={Screens.FORGOT_PASSWORD_SCREEN}
        component={ForgetPasswordScreen}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name={Screens.NEW_PASSWORD_SCREEN}
        component={NewPasswordScreen}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};
