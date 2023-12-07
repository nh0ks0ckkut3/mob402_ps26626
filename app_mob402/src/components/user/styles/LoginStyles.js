import { StyleSheet } from 'react-native'

export const Loginstyles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
        paddingHorizontal : 24
    },
    arrowBack : {
        marginTop : 30
    },
    Label : {
        marginTop : 19,
        fontSize : 20,
        fontWeight : '400',
        color : 'black'
    },
    txtInput_phoneNumber : {
        fontSize : 24,
        fontWeight : '400',
        color : 'black',
        width : '90%'
    },
    viewInput : {
        flexDirection : "row",
        borderBottomColor : '#E0E0E0',
        borderBottomWidth : 1,
        paddingHorizontal : 13,
        alignItems : 'center',
        marginTop : 42
    },
    view_btnNext : {
        flexDirection : 'row',
        justifyContent: 'space-between',
        marginTop : 37
    },
    btn_next : {
        backgroundColor : '#67E965',
        width : 54,
        height : 54,
        borderRadius : 27,
        justifyContent : 'center',
        alignItems : 'center'
    },
    txt_forgetPass : {
        color : '#37DD34',
        fontSize : 12,
        fontWeight : '400',
        textDecorationLine : 'underline'
    }
})