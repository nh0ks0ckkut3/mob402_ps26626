import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'

const DetailProduct = (props) => {
  const navigation = props.navigation;
  const route = useRoute()
  const { product } = route.params
  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.Header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image style={Styles.back} source={require('../../../media/images/ic_arrow_back.png')} />
        </TouchableOpacity>

        <Text style={Styles.txtTitle}>{product.name.substring(0, 20)}</Text>
        <View style={Styles.menu}>
          <TouchableOpacity>
            <Image source={require('../../../media/images/ic_search.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={{ marginStart: 33 }} source={require('../../../media/images/ic_cart.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={Styles.viewImg}>
        <Image style={Styles.img} source={{ uri: product.image }} />
      </View>
      <View style={Styles.viewPrice}>
        <Text style={Styles.txtPrice}>{product.price} đ</Text>
      </View>
      <View style={Styles.viewName}>
        <Text style={Styles.txtName}>{product.name}</Text>
      </View>
        <TouchableOpacity
          style={Styles.viewbtnAddCart}
          onPress={()=>{

          }}
        >
          <View style={Styles.viewAddCart}>
            <Image source={require('../../../media/images/ic_cart.png')} />
            <Text style={Styles.txtBuy}>Thêm giỏ hàng</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[Styles.viewbtnAddCart, { right : 0, backgroundColor : '#A7F8A5'}]}>
          <View >
            <Text style={Styles.txtBuy}>Mua ngay</Text>
            <Text style={Styles.txt}>Không ưng đổi ngay</Text>
          </View>
        </TouchableOpacity>

    </SafeAreaView>
  )
}

export default DetailProduct

const WIDTH = Dimensions.get('window').width;
export const Styles = StyleSheet.create({
  txt : {
    fontSize : 10,
    fontWeight : '300',
    color : 'black'
  },
  txtBuy : {
    fontSize : 15,
    fontWeight : '700',
    color : 'black',
    marginStart : 10
  },
  viewAddCart : {
    flexDirection : 'row'
  },
  viewbtnAddCart: {
    width: '49.5%',
    height: 50,
    backgroundColor: '#DEF2EF',
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center',
    position: 'absolute',
    bottom: 8,
  },
  viewContainerBuy: {
    height: 50,
    width: '100%',
    position: 'absolute',
    bottom: 8,
    flexDirection : 'row'
  },
  txtName: {
    fontSize: 16,
    color: "black",
    fontWeight: '500'
  },
  viewName: {
    marginTop: 18,
    marginStart: 33
  },
  txtPrice: {
    fontSize: 20,
    color: "#ED2929",
    fontWeight: '500'
  },
  viewPrice: {
    marginTop: 21,
    marginStart: 30
  },
  img: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
  },
  viewImg: {
    width: '90%',
    height: 360,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black'
  },
  back: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  menu: {
    flexDirection: 'row',
    paddingEnd: 22
  },
  Header: {
    flexDirection: 'row',
    width: '100%',
    height: 65,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingStart: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black'
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  }
})