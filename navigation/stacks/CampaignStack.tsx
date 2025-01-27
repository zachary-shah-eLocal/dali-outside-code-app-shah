import { createStackNavigator } from "@react-navigation/stack";
import ModalHeader from "components/headers/ModalHeader";
import { Screens } from "navigation/consts/Screens";
import React from "react";
import CampaignDetailsScreen from "screens/mainStack/homeStack/campaingStack/CampaignDetailsScreen";

import CampaignListingsScreen from "screens/mainStack/homeStack/campaingStack/CampaignListingsScreen";
import CampaignsScreen from "screens/mainStack/homeStack/campaingStack/CampaignsScreen";
import EditLocationScreen from "screens/mainStack/homeStack/campaingStack/EditLocationScreen";
import ListingDetailsScreen from "screens/mainStack/homeStack/campaingStack/ListingDetailsScreen";
import RemainingBudgetScreen from "screens/mainStack/homeStack/campaingStack/RemainingBudgetScreen";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Screens.CAMPAIGNS_SCREEN}
        component={CampaignsScreen}
      />
      <Stack.Screen
        name={Screens.CAMPAIGN_DETAILS_SCREEN}
        component={CampaignDetailsScreen}
      />
      <Stack.Screen
        name={Screens.CAMPAIGN_LISTING_SCREEN}
        component={CampaignListingsScreen}
      />
      <Stack.Screen
        name={Screens.CAMPAIGN_LISTING_DETAILS_SCREEN}
        component={ListingDetailsScreen}
      />
      <Stack.Screen
        name={Screens.REMAINING_BUDGET_SCREEN}
        component={RemainingBudgetScreen}
      />
      <Stack.Screen
        name={Screens.EDIT_LOCATION_DETAILS_SCREEN}
        component={EditLocationScreen}
        options={{
          presentation: "modal",
          headerShown: true,
          header: () => <ModalHeader title="Edit Location Details" />,
        }}
      />
    </Stack.Navigator>
  );
};
