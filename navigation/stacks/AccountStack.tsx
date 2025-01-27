import { createStackNavigator } from "@react-navigation/stack";
import BaseHeader from "../../base/components/headers/BaseHeader";
import ModalHeader from "../../base/components/headers/ModalHeader";
import AccountAddPauseScreen from "../../screens/mainStack/accountStack/AccountAddPauseScreen";
import AccountBudgetsScreen from "../../screens/mainStack/accountStack/AccountBudgetsScreen";
import AccountContactsScreen from "../../screens/mainStack/accountStack/AccountContactsScreen";
import AccountHolidaysScreen from "../../screens/mainStack/accountStack/AccountHolidaysScreen";
import AccountLocationsScreen from "../../screens/mainStack/accountStack/AccountLocationsScreen";
import AccountNewContactScreen from "../../screens/mainStack/accountStack/AccountNewContactScreen";
import AccountPausesScreen from "../../screens/mainStack/accountStack/AccountPausesScreen";
import AccountScreen from "../../screens/mainStack/accountStack/AccountScreen";
import { Screens } from "../consts/Screens";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.ACCOUNT_SCREEN} component={AccountScreen} />
      <Stack.Screen
        name={Screens.ACCOUNT_CONTACTS_SCREEN}
        component={AccountContactsScreen}
      />
      <Stack.Screen
        name={Screens.ACCOUNT_NEW_CONTACTS_SCREEN}
        component={AccountNewContactScreen}
        options={{
          presentation: "modal",
          headerShown: true,
          header: () => <ModalHeader title="Create contact" />,
        }}
      />
      <Stack.Screen
        name={Screens.ACCOUNT_LOCATIONS_SCREEN}
        component={AccountLocationsScreen}
      />
      <Stack.Screen
        name={Screens.ACCOUNT_HOLIDAYS_SCREEN}
        component={AccountHolidaysScreen}
      />
      <Stack.Screen
        name={Screens.ACCOUNT_PAUSES_SCREEN}
        component={AccountPausesScreen}
      />
      <Stack.Screen
        name={Screens.ACCOUNT_ADD_PAUSE_SCREEN}
        component={AccountAddPauseScreen}
      />
      <Stack.Screen
        name={Screens.ACCOUNT_BUDGETS_SCREEN}
        component={AccountBudgetsScreen}
      />
    </Stack.Navigator>
  );
};
