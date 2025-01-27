import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  formContainerComponent: {
    width: width,
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 100,
    flex: 1,
  },
  actionsContainer: {
    textAlign: 'center',
  },
});
