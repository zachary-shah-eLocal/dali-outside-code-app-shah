import { styles } from "./HeaderStyles";

import { FlexSpacer, Logo, PopperOverlay } from "../../../components/atoms";
import { useAccountId } from "../../../features/accounts/AccountContext";
import { useAuth } from "../../../features/auth";

import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { MenuOption, withMenuContext } from "react-native-popup-menu";
import LogoutIcon from "../../../base/icons/headerMenu/LogoutIcon";
import PhoneIcon from "../../../base/icons/headerMenu/PhoneIcon";
import ProfileIcon from "../../../base/icons/headerMenu/ProfileIcon";
import SettingsIcon from "../../../base/icons/headerMenu/SettingsIcon";
import SwitchIcon from "../../../base/icons/headerMenu/SwitchIcon";
import { Navigation } from "../../../helpers/Navigationhelper";
import { Screens } from "../../../navigation/consts/Screens";
import { Stacks } from "../../../navigation/consts/Stacks";
import { HomeIcon } from "../../../svgs";

export const Header = withMenuContext((props) => {
  const { logout, auth } = useAuth();
  const { removeAccountId } = useAccountId();
  const firstLetter = auth?.getIdToken().payload.name.substring(0, 1);

  const { ctx } = props;
  const navigate = (screen: string) => {
    Navigation.navigate(screen);
    ctx.menuActions.closeMenu();
  };

  const handleLogout = async () => {
    await logout();
    removeAccountId();
  };

  const dropdownItems = [
    { title: "Account", to: Stacks.ACCOUNT_STACK, Icon: <SettingsIcon /> },
    { title: "Profile", to: Stacks.PROFILE_STACK, Icon: <ProfileIcon /> },
    {
      title: "Switch Account",
      to: Screens.SWITCH_ACCOUNT_SCREEN,
      Icon: <SwitchIcon />,
    },
    { title: "Contact Us", to: Screens.CONTACT_SCREEN, Icon: <PhoneIcon /> },
    { title: "Sign Out", to: "", Icon: <LogoutIcon />, onPress: handleLogout },
  ];

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <FlexSpacer />

        <PopperOverlay buttonText={firstLetter}>
          <FlatList
            data={dropdownItems}
            keyExtractor={(item) => item.to}
            contentContainerStyle={{ rowGap: 12 }}
            renderItem={({ item }) => (
              <MenuOption>
                <TouchableOpacity
                  onPress={
                    item.onPress
                      ? item.onPress
                      : () => item.to && navigate(item.to)
                  }
                  style={styles.dropdownItem}
                >
                  {item.Icon}
                  <Text style={styles.iconText}>{item.title}</Text>
                </TouchableOpacity>
              </MenuOption>
            )}
          />
        </PopperOverlay>
      </View>
    </View>
  );
});
