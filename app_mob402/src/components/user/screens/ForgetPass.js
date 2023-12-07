import { View, Text, Image, TouchableOpacity, TextInput, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Loginstyles } from '../styles/LoginStyles'
import { useState, useContext } from 'react'
import { useRoute } from '@react-navigation/native'
import { UserContext } from '../UserContext'
import { resetPass } from '../UserHTTP'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgetPass = (props) => {
  const route = useRoute()
  const { email } = route.params
  const navigation = props.navigation;
  const [otp, setotp] = useState("")
  const [newPass, setNewPass] = useState("")
  const [newPass2, setNewPass2] = useState("")

  const handleResetPass = async () => {
    if (newPass.trim().length == 0 || newPass2.trim().length == 0 || otp.trim().length == 0) {
      Alert.alert("không bỏ trống");
    } else if (newPass != newPass2) {
      Alert.alert("mật khẩu không trùng");
    }
    else {
      try {
        const result = await resetPass(email, otp, newPass);
        if(result.message == "đổi mật khẩu thành công"){
          ToastAndroid.show(result.message, ToastAndroid.SHORT);
        }else{
          Alert.alert("có lỗi xảy ra, thử lại sau");
        };
        navigation.goBack();
      } catch (error) {
        console.log('......dong 26', error);
        ToastAndroid.show('login failed', ToastAndroid.SHORT);
      }
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
      <Text style={Loginstyles.Label}>nhập mã OTP được gửi đến email:</Text>
      <Text style={[Loginstyles.Label, { fontSize: 12 }]}>OTP của bạn chỉ có hiệu lực trong vòng 1 phút</Text>
      <View style={Loginstyles.viewInput}>
        <TextInput
          placeholder='otp'
          style={Loginstyles.txtInput_phoneNumber}
          maxLength={4}
          value={otp}
          onChangeText={text => { setotp(text) }}
        >

        </TextInput>
        <TouchableOpacity
          onPress={() => {
            setotp("")
          }}
        >
          <Image source={require('../../../media/images/ic_close.png')} />
        </TouchableOpacity>
      </View>
      {/* <Text style={Loginstyles.Label}>nhập mật khẩu mới:</Text> */}
      <View style={Loginstyles.viewInput}>
        <TextInput
          placeholder='mật khẩu mới'
          style={Loginstyles.txtInput_phoneNumber}
          maxLength={20}
          value={newPass}
          onChangeText={text => { setNewPass(text) }}
        >

        </TextInput>
        <TouchableOpacity
          onPress={() => {
            setNewPass("")
          }}
        >
          <Image source={require('../../../media/images/ic_close.png')} />
        </TouchableOpacity>
      </View>
      {/* <Text style={Loginstyles.Label}>nhập lại mật khẩu mới:</Text> */}
      <View style={Loginstyles.viewInput}>
        <TextInput
          placeholder='nhập lại mật khẩu mới'
          style={Loginstyles.txtInput_phoneNumber}
          maxLength={20}
          value={newPass2}
          onChangeText={text => { setNewPass2(text) }}
        >

        </TextInput>
        <TouchableOpacity
          onPress={() => {
            setNewPass2("")
          }}
        >
          <Image source={require('../../../media/images/ic_close.png')} />
        </TouchableOpacity>
      </View>
      <View style={Loginstyles.view_btnNext}>
        <View></View>
        <TouchableOpacity
          onPress={() => {
            handleResetPass()
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

export default ForgetPass