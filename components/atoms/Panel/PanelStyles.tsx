import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    panel: {
      borderRadius: 15,
      overflow: 'hidden',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      shadowOffset: {width: 0, height: 15},
      maxHeight: height / 4,
      margin: 12,
    },
    noBackground: {
      backgroundColor: 'transparent',
    },
    header: {
      display: 'flex',
      gap: 10,
      marginHorizontal: 24,
      paddingBottom: 10,
      paddingTop: 20,
    },
    headerBorder: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    centerContents: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 12,
      marginLeft: 7,
      letterSpacing: 0.5,
      fontWeight: '300',
    },
    titleButton: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
    },
    body: {
      display: 'flex',
      width: '100%',
      flexGrow: 1,
      minHeight: 0,
      flexDirection: 'column',
      paddingVertical: 15,
      paddingHorizontal: 24,
    },
    controls: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      display: 'flex',
      gap: 2,
      flexGrow: 1,
    },
    row: {
      // Define default row styles here
    },
  });