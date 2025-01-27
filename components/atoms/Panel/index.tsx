import { styles } from "./PanelStyles";

import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";

// Panel component
type PanelProps = {
  children: React.ReactNode;
  hideBackground?: boolean;
};

export const Panel = ({ children, hideBackground }: PanelProps) => {
  return (
    <View style={[styles.panel, hideBackground && styles.noBackground]}>
      {children}
    </View>
  );
};

// PanelHeader component
type PanelHeaderProps = {
  children: React.ReactNode;
  noBorder?: boolean;
  center?: boolean;
  onPress?: () => void;
};

export const PanelHeader = ({
  children,
  noBorder,
  center,
  onPress,
}: PanelHeaderProps) => {
  if (onPress) {
    return (
      <TouchableOpacity
        style={[
          styles.header,
          !noBorder && styles.headerBorder,
          center && styles.centerContents,
        ]}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <View
      style={[
        styles.header,
        !noBorder && styles.headerBorder,
        center && styles.centerContents,
      ]}
    >
      {children}
    </View>
  );
};

// PanelTitle component
type PanelTitleProps = {
  children: React.ReactNode;
  subtitle?: String;
};

export const PanelTitle = ({ children, subtitle }: PanelTitleProps) => {
  return (
    <View>
      <Text style={styles.title}>
        {children}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </Text>
    </View>
  );
};

// PanelTitleButton component
type PanelTitleButtonProps = {
  children: React.ReactNode;
};

export const PanelTitleButton = ({ children }: PanelTitleButtonProps) => {
  return <View style={styles.titleButton}>{children}</View>;
};

// PanelBody component
type PanelBodyProps = {
  children: React.ReactNode;
};

export const PanelBody = ({ children }: PanelBodyProps) => {
  return <View style={[styles.body]}>{children}</View>;
};

// PanelControls component
type PanelControlsProps = {
  children: React.ReactNode;
};

export const PanelControls = ({ children }: PanelControlsProps) => {
  return <View style={styles.controls}>{children}</View>;
};

// PanelRow component
type PanelRowProps = {
  children: React.ReactNode;
};

export const PanelRow = ({ children }: PanelRowProps) => {
  return <View style={styles.row}>{children}</View>;
};
