import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 100,
        height: 63,
        backgroundColor: 'lightgray',
        shadowOffset: {width: 4, height: 12},
        display: 'flex',
        justifyContent: 'space-between',
        gap: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // Add any additional styles here
      },
      header: {
        gap: 18,
        flexDirection: 'row',
        alignItems: 'center',
      },
      trigger: {
        transform: [{ rotate: '180deg' }],
        height: 16,
        width: 'auto',
        marginRight: 8,
        // Add any additional styles for the arrow icon here
      },
      label: {
        fontSize: 16,
        fontWeight: 600,
        // Add any additional styles for the label here
      },
});