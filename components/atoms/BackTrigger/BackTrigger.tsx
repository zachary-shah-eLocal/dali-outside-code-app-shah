import React, { useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ArrowIcon } from "../../../svgs";

import { Navigation } from "../../../helpers/Navigationhelper";
import { styles } from "./BackTriggerStyles";

interface BackTriggerProps {
  label: string;
  children?: React.ReactNode;
  handleClick?: () => void;
}

export const BackTrigger: React.FC<BackTriggerProps> = ({
  label,
  children,
  handleClick,
}) => {
  const handleGoBack = () => {
    if (handleClick) {
      handleClick();
    } else {
      Navigation.pop();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={handleGoBack}>
        <ArrowIcon style={styles.trigger} />
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
      {children}
    </View>
  );
};
