import { createStackNavigator } from "@react-navigation/stack";
import BaseHeader from "../../base/components/headers/BaseHeader";
import ModalHeader from "../../base/components/headers/ModalHeader";
import EditProfileScreen from "../../screens/mainStack/profileStack/EditProfileScreen";
import ProfileScreen from "../../screens/mainStack/profileStack/ProfileScreen";
import { Screens } from "../consts/Screens";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.PROFILE_SCREEN} component={ProfileScreen} />
      <Stack.Screen
        name={Screens.EDIT_CONTACT_INFORMATION_SCREEN}
        component={EditProfileScreen}
        options={{
          presentation: "modal",
          headerShown: true,
          header: () => <ModalHeader title="Edit Contact Information" />,
        }}
      />
    </Stack.Navigator>
  );
};
