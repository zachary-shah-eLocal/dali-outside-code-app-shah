import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    btn: {
      color: 'grey',
      gap: 8,
      borderWidth: 1,
      borderRadius: 8,
      borderStyle: 'solid',
      backgroundColor: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 250,
    },
    txt: {
      color: 'white',
      fontWeight: '700',
      fontSize: 15,
      letterSpacing: 0.286,
    },
    primary: { backgroundColor: '#fa6c48' },
    secondary: { backgroundColor: 'gray' },
    warning: { backgroundColor: 'orange' },
    danger: { backgroundColor: 'red' },
    disabled: { backgroundColor: 'lightgray' },
    xs: { padding: 5 },
    small: { padding: 8 },
    medium: { 
        paddingHorizontal: 16,
        paddingVertical: 10,
        lineHeight: 19.6,
    },
    large: { 
        paddingHorizontal: 13,
        paddingVertical: 16,
        height: 48,
        lineHeight: 22.4,
    },
    lg: { padding: 15 },
    contained: { borderWidth: 1, borderColor: 'transparent' },
    outlined: { borderWidth: 1, borderColor: 'black' },
    text: { borderWidth: 0 },

});
