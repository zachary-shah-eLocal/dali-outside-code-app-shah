import { createStackNavigator } from "@react-navigation/stack";
import ModalHeader from "components/headers/ModalHeader";
import PaymentMethodsScreen from "screens/mainStack/homeStack/billingStack/PaymentMethodsScreen";
import BillingScreen from "../../screens/mainStack/homeStack/billingStack/BillingScreen";
import { Screens } from "../consts/Screens";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.BILLING_SCREEN} component={BillingScreen} />
      <Stack.Screen
        name={Screens.PAYMENT_METHODS_SCREEN}
        component={PaymentMethodsScreen}
      />
    </Stack.Navigator>
  );
};
