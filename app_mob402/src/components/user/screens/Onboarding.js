import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const images = [
    'https://xuyenvietmedia.com/wp-content/uploads/2022/09/Barber.jpg',
    'https://mensfolio.vn/wp-content/uploads/2021/10/20211007-MFOnline-tiem-barber-sai-gon-Mekong-Barbershop-2.jpg',
    'https://static.wixstatic.com/media/fbfeb4_f44eecef8c4349dd9e0fe3470c1aac98.jpg/v1/crop/x_348,y_242,w_3007,h_3750/fill/w_640,h_738,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Macleod_Craig%201-123.jpg'
]
const contents_slogan = [
    `Đặt lịch nhanh\nxem lại lịch sử cắt`,
    'Mua sắm tiện lợi\nnhiều ưu đãi',
    'Ưu đãi hấp dẫn\ndành riêng cho anh'
]
const contents = [
    'Đặt lịch giữ chỗ chỉ 30 giây\nCắt xong trả tiền, hủy lịch không sao',
    'Zero5 shop\nMỹ phẩm nam cao cấp chính hãng',
    'Quà tặng, chiết khấu đặc biệt\nCập nhật liên tục'
]
import { OnboardingStyles } from '../styles/OnboardingStyles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Onboarding = (props) => {
  const [imgActive, setimgActive] = useState(0);
  const navigation = props.navigation;

  const onchange = useCallback((nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== imgActive) {
        setimgActive(slide);
      }
    }
  }, [imgActive]);

  return (
    <SafeAreaView style={OnboardingStyles.container}>
      <View style={OnboardingStyles.wrap}>
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={OnboardingStyles.wrap}
        >
          {images.map((e, index) => (
            <View key={e}>
              <Image
                resizeMode="stretch"
                style={OnboardingStyles.wrap}
                source={{ uri: e }}
              />
              <View style={OnboardingStyles.view_textInImage}>
                <Text style={OnboardingStyles.textInImage}>
                  {contents_slogan[index]}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={OnboardingStyles.view_textContent}>
        <Text style={OnboardingStyles.textContent}>
          {contents[imgActive]}
        </Text>
      </View>
      <View style={OnboardingStyles.view_bottom}>
        <TouchableOpacity
          style={OnboardingStyles.btnLogin}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text style={OnboardingStyles.txtLogin}>
            ĐĂNG NHẬP/ĐĂNG KÝ
          </Text>
        </TouchableOpacity>
        <Text style={OnboardingStyles.txtLogin}>Đặt lịch ngay</Text>
        <View style={OnboardingStyles.wrapDot}>
          {images.map((e, index) => (
            <Text
              key={e}
              style={
                imgActive === index
                  ? OnboardingStyles.dotActive
                  : OnboardingStyles.dot
              }
            >
              ●
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;