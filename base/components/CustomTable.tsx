import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

type Props = {
  data: any;
  columnStyles?: { [key: number]: ViewStyle };
  columnTextStyles?: { [key: number]: TextStyle };
  cellSpacing?: number;
};

const CustomTable = ({
  data,
  columnStyles = {},
  columnTextStyles = {},
  cellSpacing = 0,
}: Props) => {
  return (
    <View style={styles.table}>
      {data.map((row: any, rowIndex: any) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell: any, cellIndex: any) => (
            <View
              key={cellIndex}
              style={[
                styles.cell,
                columnStyles[cellIndex],
                { marginRight: cellIndex < row.length - 1 ? cellSpacing : 0 },
              ]}
            >
              <Text style={[styles.cellText, columnTextStyles[cellIndex]]}>
                {cell}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default CustomTable;

const styles = StyleSheet.create({
  table: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
  },
  cellText: {
    fontSize: 16,
  },
});
