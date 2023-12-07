import { StyleSheet, Dimensions } from 'react-native'

const WIDTH = Dimensions.get('window').width;
export const ShopStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    Header: {
        height: 50,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 0.2
    },
    logo: {
        height: 49.8
    },
    menu: {
        flexDirection: 'row',
        width: 107,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textTitleContent: {
        paddingStart: 24,
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        marginTop: 11,
        textAlign: 'center',
    },
    bottomCategory: {
        borderColor: 'black',
        borderWidth: 0.2,
        marginStart: 24,
        marginBottom : 10
    },
    categories: {
        borderBottomColor : '#95958B',
        borderBottomWidth : 0.2
    },
    viewItemBody: {
        paddingTop : 14,
        width : WIDTH/2
      },
      viewImage : {
        width : '100%',
        alignItems : 'center'
      },
      txtNameProduct : {
        fontSize : 12,
        fontWeight : '300',
        color : '#000000',
        marginTop : 15
      },
      txtPriceProduct_sale : {
        fontSize : 12,
        fontWeight : '600',
        color : '#ed2929',
        marginEnd : 23
      },
      txtPriceProduct : {
        fontSize : 8,
        fontWeight : '200',
        color : '#000000',
        textDecorationLine : 'line-through'
      },
      viewPrice : {
        flexDirection : 'row',
        marginTop : 10,
        alignItems : 'center',
      },
      viewVote : {
        flexDirection : 'row',
        marginTop : 10,
        marginBottom : 12
      }
})