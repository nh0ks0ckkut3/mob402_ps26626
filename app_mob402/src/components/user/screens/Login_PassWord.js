import { View, Text, Image, TouchableOpacity, TextInput, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Loginstyles } from '../styles/LoginStyles'
import { useState, useContext } from 'react'
import { useRoute } from '@react-navigation/native'
import { UserContext } from '../UserContext'
import { login, forgetPass } from '../UserHTTP'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {
    const navigation = props.navigation;
    const [passWord, setpassWord] = useState("")
    const { setUser } = useContext(UserContext)
    const route = useRoute()
    const { email } = route.params

    const handleLogin = async () => {
        if(passWord.trim().length == 0 ){
            Alert.alert("nhập mật khẩu");
        }else{
            try {
                const result = await login(email, passWord);
                try {
                    await AsyncStorage.setItem('token', result.user.token);
                    setUser(result.user)
                } catch (error) {
                   
                }
                
              } catch (error) {
                console.log('......dong 26', error);
                ToastAndroid.show('sai mật khẩu', ToastAndroid.SHORT);
              }
        }
        
    }
    const handleForgetpass = async () => {
            try {
                const result = await forgetPass(email);
                if(result.message){
                    navigation.navigate("ForgetPass", { email : email})
                }else{
                    Alert.alert("có lỗi xảy ra, thử lại sau");
                }
              } catch (error) {
                console.log('......dong 38', error);
                ToastAndroid.show('Forgetpass failed', ToastAndroid.SHORT);
              }
    }
    const handleConfirmation = () => {
        Alert.alert(
          'Confirmation',
          `gửi mã xác nhận về email: ${email}`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                handleForgetpass()
              },
            },
          ],
          { cancelable: false }
        );
      };

    return (
        <SafeAreaView style={Loginstyles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Image style={Loginstyles.arrowBack} source={require('../../../media/images/ic_arrow_back.png')} />
            </TouchableOpacity>
            <Text style={Loginstyles.Label}>Anh vui lòng nhập mật khẩu</Text>
            <Text style={[Loginstyles.Label, { fontSize: 12 }]}>email đăng ký {email}</Text>
            <View style={Loginstyles.viewInput}>
                <TextInput
                    placeholder='password'
                    style={Loginstyles.txtInput_phoneNumber}
                    maxLength={20}
                    value={passWord}
                    onChangeText={text => { setpassWord(text) }}
                >

                </TextInput>
                <TouchableOpacity
                    onPress={() => {
                        setpassWord("")
                    }}
                >
                    <Image source={require('../../../media/images/ic_close.png')} />
                </TouchableOpacity>
            </View>
            <View style={Loginstyles.view_btnNext}>
                <View></View><TouchableOpacity
                onPress={() => {
                    handleConfirmation()
                }}
                >
                    <Text style={Loginstyles.txt_forgetPass}>Quên mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        handleLogin()
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