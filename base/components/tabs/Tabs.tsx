import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../theme/colors";
import Text from "../Text";

type TabsButtonProps = {
  label: string;
  activetab: string;
  setActivetab: (tab: string) => void;
};

const TabsButton = ({ label, activetab, setActivetab }: TabsButtonProps) => {
  const isActive = label === activetab;
  const handlePress = () => {
    if (isActive) return;
    setActivetab(label);
  };
  return (
    <TouchableOpacity
      activeOpacity={isActive ? 1 : 0.7}
      style={[
        styles.button,
        isActive && {
          borderBottomColor: Colors.secondary,
          borderBottomWidth: 1,
        },
      ]}
      onPress={handlePress}
    >
      <Text style={{ paddingRight: 10 }}>{label}</Text>
    </TouchableOpacity>
  );
};

type TabsProps = {
  tabs: Array<{ label: string; tab: React.ReactNode }>;
};

const Tabs = ({ tabs }: TabsProps) => {
  const [activetab, setActivetab] = React.useState(tabs[0].label);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {tabs.map((tab, index) => (
          <TabsButton
            key={index}
            label={tab.label}
            activetab={activetab}
            setActivetab={setActivetab}
          />
        ))}
      </View>
      <View style={styles.contentContainer}>
        {tabs.find((tab) => tab.label === activetab)?.tab}
      </View>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 10,
    // paddingRight: 10,
    top: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  contentContainer: {
    flexGrow: 1,
    width: "100%",
  },
});
