import { StyleSheet } from "react-native";
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { fonts } from "../config/theme";
//   const { width } = Dimensions.get('window');
const commonstyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    backgroundcolor: {
        backgroundColor: "#C6A06A"
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: responsiveWidth(4),
        borderTopColor: '#333',
        alignItems: 'center',
    },
    button: {
        padding: 13,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,

        backgroundColor: '#fff',
        width: "100%"
    },
    buttontext: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 800,
        fontFamily: 'SFPRODISPLAYSEMIBOLDITALIC',
    },
    text1: {
        fontSize: 12,
        fontWeight: 550,
        fontFamily: 'Obviously-MediumItalic',
        marginVertical: 10,
        lineHeight: 15,
        color: "#000",
        textAlign: "center"
    },
    text2: {
        fontSize: 16,
        fontWeight: 700,
        color: "#fff",
        fontFamily: fonts.bold,
    },
    text3: {
        fontSize: 20,
        fontWeight: 700,
        fontFamily: fonts.bold,
        color: "#000",
    },
    text4: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: fonts.medium,
        color: "#000"
    },
    text5: {
        fontSize: 20,
        fontWeight: 700,
        fontFamily: fonts.bold,
        color: "#fff"
    },
    text6: {
        fontSize: 16,
        fontWeight: 700,
        fontFamily: fonts.bold,
        color: "#000"
    },

    text7: {
        fontSize: 12,
        fontWeight: 700,
        fontFamily: fonts.medium,
        color: "#000"
    },
    text8: {
        fontSize: 14,
        fontWeight: 700,
        fontFamily: fonts.bold,
        color: "#000"
    },
    text9: {
        fontSize: 14,
        fontWeight: 700,
        fontFamily: fonts.bold,
        color: "#000"
    },
    text10: {
        fontSize: 12,
        fontWeight: 400,
        fontFamily: fonts.regular,
        color: "#000"
    },
    text11: {
        fontSize: 14,
        fontWeight: 700,
        fontFamily: fonts.bolditalic,
        color: "#757575"
    },
    text12: {
        fontSize: 24,
        fontWeight: 700,
        fontFamily: fonts.bolditalic,
        color: "#757575"
    },
    text13: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: fonts.regular,
        color: "#757575"
    },
    text14: {
        fontSize: 16,
        fontWeight: 500,
        fontFamily: fonts.medium,
        color: "#262757"
    },

    marginBottom16: { marginBottom: 16 },
    marginBottom24: { marginBottom: 24 },
    marginBottom32: { marginBottom: 32 },

    marginBottom12: {
        marginBottom: 12
    },
    marginTop24: { marginTop: 24 },
    marginTop10: { marginTop: 10 },
    hr: {
        height: 0.5,
        borderBottomWidth: 0.5,
        backgroundColor: "#9E9E9E",
        // marginTop:16
        // marginTop: 12,
        // marginBottom: 12
    },
    row: {
        flexDirection: "row",
    },
    smallbutton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        borderRadius: 16,
        backgroundColor: '#fff',
        borderColor: 'red',
        width: 112,
        borderWidth: 1
    },
    smallgreenbuttontext: {
        color: '#000',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500'
    },
    smallgraybutton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        borderRadius: 16,
        backgroundColor: '#b8b8b8',
        width: 112,

    },
    smallgreenbutton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        borderRadius: 16,
        // backgroundColor: '#00B562',
        width: 112,
        borderColor: "#262757",
        borderWidth: 0.5

    },

})

export default commonstyles;