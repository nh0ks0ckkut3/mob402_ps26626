import { StyleSheet, Dimensions } from 'react-native'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const OnboardingStyles = StyleSheet.create({

    container: {
        flex: 1
    },
    div_logo: {
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: "center"
    },
    img: {
        resizeMode: "cover",
        height: 450
    },
    view_h1: {
        width: 279,
        height: 72,
        marginStart: 24,
        marginTop: 24
    },
    h1: {
        color: 'black',
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 36,
        letterSpacing: 0.12
    },

    view_p: {
        width: 318,
        height: 48,
        marginStart: 24,
        marginBottom: 68
    },
    p: {
        color: '#A0A3BD',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12
    },
    view_bottom: {
        alignItems: "center",
        justifyContent: "space-between"
    },
    backNnext: {
        width: 136,
        height: 50,
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    backHidden: {
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0.12,
        marginEnd: 5,
        textAlignVertical: 'center',
        color: '#B0B3B8',
        width: 0,
        height: 0
    },
    backShow: {
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0.12,
        marginEnd: 5,
        textAlignVertical: 'center',
        color: '#B0B3B8'
    },
    viewTextBack: {
        height: '100%',
        justifyContent: 'center'
    },
    view_btnNext: {
        width: 85,
        height: 50,
        backgroundColor: "#1877F2",
        paddingTop: 13,
        paddingStart: 24,
        borderRadius: 6
    },
    view_btnGetStart: {
        width: 142,
        height: 50,
        backgroundColor: "#1877F2",
        paddingTop: 13,
        paddingStart: 24,
        borderRadius: 6
    },
    btn: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "600",
        color: "white",
        letterSpacing: 0.12
    },
    wrap: {
        width: WIDTH,
        height: HEIGHT*0.7,
    },
    wrapDot: {
        flexDirection: 'row',
        marginTop : 16,
        width : 116,
        justifyContent : 'space-between'
    },
    dotActive: {
        color: '#A7F8A5'
    },
    dot: {
        color: '#A0A3BD'
    },
    view_textInImage: {
        width: WIDTH,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        height : 100
    },
    textInImage: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center'
    },
    view_textContent : {
        width : WIDTH,
        marginTop : 38,
    },
    textContent : {
        textAlign : 'center',
        fontSize : 18,
        fontWeight : '600'
    },
    btnLogin : {
        marginTop : 21,
        width : 188,
        height : 50,
        backgroundColor : '#A7F8A5',
        borderRadius : 30,
        justifyContent : 'center',
        marginBottom : 14
    },
    txtLogin : {
        fontSize : 12,
        fontWeight : '400',
        color : 'black',
        textAlign : 'center'
    }

})