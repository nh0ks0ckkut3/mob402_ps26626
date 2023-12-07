import {
  View, Text, Image, TouchableOpacity, TextInput, Alert,
  ToastAndroid
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Loginstyles } from '../styles/LoginStyles'
import { useState } from 'react'
import { isExist } from '../UserHTTP'

const Login = (props) => {
  const navigation = props.navigation;
  const [email, setEmail] = useState("hoadtps26626@fpt.edu.vn")
  const isValidEmail = (email) => {
    // Biểu thức chính quy để kiểm tra địa chỉ email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handdlecheckExist = async () => {
    try {
      const result = await isExist(email);
      if(result.message){
          navigation.navigate("Login_PassWord", { email : email})
      }else{
        navigation.navigate("Register", { email : email})
      }
      
    } catch (error) {
      console.log('......dong 21', error);
      ToastAndroid.show('login failed', ToastAndroid.SHORT);
    }
  }
  return (
    <SafeAreaView style={Loginstyles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image style={Loginstyles.arrowBack} source={require('../../../media/images/ic_arrow_back.png')} />
      </TouchableOpacity>
      <Text style={Loginstyles.Label}>Vui lòng nhập email</Text>
      <View style={Loginstyles.viewInput}>
        <TextInput
          placeholder='hoadtps26626@fpt.edu.vn'
          style={Loginstyles.txtInput_phoneNumber}
          value={email}
          onChangeText={text => setEmail(text)}
        >

        </TextInput>
        <TouchableOpacity
          onPress={() => {
            setEmail("")
          }}
        >
          <Image source={require('../../../media/images/ic_close.png')} />
        </TouchableOpacity>
      </View>
      <View style={Loginstyles.view_btnNext}>
        <View></View>
        <TouchableOpacity
          onPress={() => {
            if (isValidEmail(email)) {
              handdlecheckExist();
            } else {
              Alert.alert("Thông báo", "Email không hợp lệ");
            }

          }}
        >
          <View style={Loginstyles.btn_next}>
            <Image source={require('../../../media/images/ic_arrow_next.png')} />
          </View>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}

export default Login