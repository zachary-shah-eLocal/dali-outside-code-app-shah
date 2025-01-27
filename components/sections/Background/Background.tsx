import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { View, Text, ScrollView } from "react-native";

import { styles } from "./BackgroundStyles";
import { BackgroundWaves } from "../../../svgs";

interface WrapperProps {
  children: ReactNode;
}

export const Background: React.FC<WrapperProps> = ({ children }) => {
  return (
    <LinearGradient
      colors={["#cbecff", "#e5f3ff", "#b2def7"]}
      style={styles.gradient}
    >
        <BackgroundWaves style={styles.waves} />
        

     {children}

      
    </LinearGradient>
  );
};
