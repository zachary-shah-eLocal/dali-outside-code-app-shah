import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useAuth } from "../features/auth";
import { Navigation } from "../helpers/Navigationhelper";
import { Stacks } from "./consts/Stacks";
import AuthStack from "./stacks/AuthStack";
import MainStack from "./stacks/MainStack";

const Stack = createStackNavigator();

const Navigator = () => {
  const { auth } = useAuth();
  return (
    <NavigationContainer ref={Navigation.navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {auth ? (
          <Stack.Screen name={Stacks.MAIN_STACK} component={MainStack} />
        ) : (
          <Stack.Screen name={Stacks.AUTH_STACK} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
