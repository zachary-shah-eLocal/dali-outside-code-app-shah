import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomTabButton from "../../components/atoms/BottomTabButton";
import { Header } from "../../components/sections/Header";
import { Navigation } from "../../helpers/Navigationhelper";
import { Stacks } from "../consts/Stacks";
import BillingStack from "./BillingStack";
import CampaignStack from "./CampaignStack";
import SummaryStack from "./SummaryStack";

const BottomTab = createBottomTabNavigator();

export default () => {
  const Comp = () => <></>; // Dummy component
  const insets = useSafeAreaInsets();
  return (
    <BottomTab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          height: 80,
          paddingTop: 12,
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <BottomTab.Screen
        name={Stacks.SUMMERY_STACK}
        component={SummaryStack}
        options={{
          tabBarIcon: (props) => (
            <BottomTabButton
              label="Summary"
              focused={props.focused}
              onPress={() => {
                Navigation.navigate(Stacks.SUMMERY_STACK);
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={Stacks.CAMPAIGN_STACK}
        component={CampaignStack}
        options={{
          tabBarIcon: (props) => (
            <BottomTabButton
              label="Campaigns"
              focused={props.focused}
              onPress={() => {
                Navigation.navigate(Stacks.CAMPAIGN_STACK);
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={Stacks.BILLING_STACK}
        component={BillingStack}
        options={{
          tabBarIcon: (props) => (
            <BottomTabButton
              label="Billing"
              focused={props.focused}
              onPress={() => {
                Navigation.navigate(Stacks.BILLING_STACK);
              }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
