import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { ShopStyles } from '../styles/ShopStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useEffect } from 'react'
import { getListProduct,getListCate } from '../HomeHTTP'
import {useNavigation} from '@react-navigation/native';

const Shop = (props) => {
  const navigation = props.navigation;
  const WIDTH = Dimensions.get('window').width;
  const [indexCategory, setIndexCategory] = useState('');
  const [productData, setproductData] = useState([]);
  const [cateData, setcateData] = useState([]);
  const vote = 5;
  
  
  useEffect(() =>{
    const fetchData = async () =>{
      try {
        const response = await getListCate();
        setcateData(response);
        try {
          setIndexCategory(cateData[0]._id );
        } catch (error) {
          
        }
        
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    fetchData();
  },[])
  useEffect(() => {
    try {
      setIndexCategory(cateData[0]._id );
      // fetchDataProduct();
    } catch (error) {
      
    }
  }, [cateData])
  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await getListProduct(indexCategory);
        setproductData(response);
      } catch (error) {
        console.log('Error fetching product data:', error);
      }
    };
  
    fetchDataProduct();
  }, [indexCategory]);


  
  const renderTitleCategory = val => {
    const { _id, name } = val.item;
    const onSelectItem = () => {
      setIndexCategory(_id);
    };
    return (
      <TouchableOpacity onPress={onSelectItem}>
        <Text
          style={
            [ShopStyles.textTitleContent]
          }>
          {name}
        </Text>
        <View
          style={
            _id.toString() == indexCategory.toString()
              ? ShopStyles.bottomCategory
              : null
          }></View>
      </TouchableOpacity>
    );
  };
  
  const renderDataItem = val => {
    const {
      _id,
      name,
      image,
      price
    } = val.item;
    const voteImages = Array.from({length: vote }, (v, i) => (
      <Image
        key={i}
        style={{
          width: 13,
          height: 12,
          marginRight: 5,
        }}
        source={{ uri: "https://w7.pngwing.com/pngs/134/138/png-transparent-star-golden-stars-angle-3d-computer-graphics-symmetry-thumbnail.png" }}
      />
      ));

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetailProduct', { product: val.item });
        }}>
        <View style={ShopStyles.viewItemBody}>
          <View style={ShopStyles.viewImage}>
            <Image
              style={{
                width: WIDTH * 0.3,
                height: 112,
                resizeMode : 'contain'
              }}
              source={{ uri: image }}
            />
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginStart: 15,
              marginEnd: 20
            }}>
            <Text numberOfLines={2} style={ShopStyles.txtNameProduct}>{name}</Text>
            <View style={ShopStyles.viewPrice}>
              <Text numberOfLines={2} style={ShopStyles.txtPriceProduct_sale}>
                {price * 0.5 + " đ"}
              </Text>
              <Text numberOfLines={2} style={ShopStyles.txtPriceProduct}>
                {price + " đ"}
              </Text>
            </View>
            
            <View style={ShopStyles.viewVote}>
              {voteImages}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={ShopStyles.container}>
      <View style={ShopStyles.Header}>
        <Image style={ShopStyles.logo} source={require('../../../media/images/logo_small_size.png')} />
        <View style={ShopStyles.menu}>
          <Image source={require('../../../media/images/ic_search.png')} />
          <Image source={require('../../../media/images/ic_cart.png')} />
          <Image source={require('../../../media/images/ic_filter.png')} />
        </View>
      </View>
      <View style={ShopStyles.categories}>
        <FlatList
          data={cateData}
          renderItem={renderTitleCategory}
          keyExtractor={item => item._id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={productData}
        renderItem={renderDataItem}
        key={item => item._id}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </SafeAreaView>
  )
}

export default Shop