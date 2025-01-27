import { Platform, Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    footer: {
        height: 80,
        position: 'static',
        width: width,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f7fbfc',
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        flexDirection: 'row',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: .5,
        shadowRadius: 5,
        
    },
    linksContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        height: 80,
    },
    iconContainer: {
        width: 80,
        overflow: 'hidden',
        alignItems: 'center',
    },
    label: {
        fontFamily: Platform.OS === 'ios' ? 'montserrat' : 'Roboto',
        fontSize: 12,
        fontWeight: '500',
    },
    NavLink: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        marginBottom: 20,
        
    },

  });