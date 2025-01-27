import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

type Props = {
  list: any[];
  containerStyles?: ViewStyle;
  textStyles?: TextStyle;
};

const Row = ({ item, textStyles = {} }: any) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Text style={{ lineHeight: 21, ...textStyles }}>{"\u2022"}</Text>
      <Text style={{ lineHeight: 21, ...textStyles }}>{item}</Text>
    </View>
  );
};

const ULComponent = ({
  list,
  containerStyles = {},
  textStyles = {},
}: Props) => {
  return (
    <View style={containerStyles}>
      {list.map((item, index) => (
        <Row key={index} item={item} textStyles={textStyles} />
      ))}
    </View>
  );
};

export default ULComponent;
