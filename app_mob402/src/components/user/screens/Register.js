import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Modal, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import { useState, useContext, useCallback } from 'react'
import { UserContext } from '../UserContext'
import { login, signup } from '../UserHTTP'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Loginstyles } from '../styles/LoginStyles'
import {getUpdateImage} from '../../home/HomeHTTP';

const Register = (props) => {
  const route = useRoute()
  const { email } = route.params
  const navigation = props.navigation;
  const { setUser } = useContext(UserContext)
  //email, password, name, gender, phone, avatar, age
  const [password, setpassword] = useState("")
  const [name, setName] = useState("")
  const [age, setAge] = useState(18)
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState("")
  const [avatar, setAvatar] = useState(null);
  const [imagePath, setImagePath] = useState("https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png");
  const [show, setShow] = useState(false);
  
const haddleSignUp = async () => {
  if(password.trim().length == 0 ||
    name.trim().length == 0 ||
    gender.trim().length == 0 ||
    phone.trim().length == 0 ||
    avatar.trim().length == 0 ||
    age.trim().length == 0
  ){
    Alert.alert("không bỏ trống");
}else{
    try {
        const result = await signup(email, password, name, gender, phone, avatar, age);
        if(result.message == "Đăng ký thành công"){
          ToastAndroid.show(result.message, ToastAndroid.SHORT);
          try {
            const result = await login(email, password);
            await AsyncStorage.setItem('token', result.user.token);
            setUser(result.user)
          } catch (error) {
            console.log('......dong 26', error);
            ToastAndroid.show('login failed', ToastAndroid.SHORT);
          }
        }else{
          Alert.alert("có lỗi xảy ra, thử lại sau");
        };
      } catch (error) {
        console.log('......dong 26', error);
        ToastAndroid.show('login failed', ToastAndroid.SHORT);
      }
}
}
/// xử lý hình ảnh
const takePhoto = useCallback(async response => {
  if (response.didCancel) return;
  if (response.errorCode) return;
  if (response.errorMessage) return;
  if (response.assets && response.assets.length > 0) {
    const asset = response.assets[0];
    setAvatar(asset.uri);
    setShow(false);
    // upload image
    const formData = new FormData();
    formData.append('image', {
      uri: asset.uri,
      type: asset.type,
      name: asset.fileName,
    });
    const result = await getUpdateImage(formData);
    console.log('>>>>>upload image: ', result.path);
    setImagePath(result.path);
    setAvatar(result.path);
    // console.log('>>>>>upload image: ', avatar);
  }
}, []);
/// camera chụp ảnh
const openCamera = useCallback(async () => {
  const options = {
    mediaType: 'photo',
    quality: 1,
    saveToPhotos: true,
  };
  await launchCamera(options, takePhoto);
}, []);
/// thư viện image
const openLibrary= useCallback(async () => {
  const options = {
    mediaType: 'photo',
    quality: 1,
    saveToPhotos: true,
  };
  await launchImageLibrary(options, takePhoto);
}, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.viewHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image style={Loginstyles.arrowBack} source={require('../../../media/images/ic_arrow_back.png')} />
        </TouchableOpacity>
        <Text style={Loginstyles.Label}>{email}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setShow(true);
        }}
      >
        <View style={styles.viewAvatar}>
          <Image style={styles.avatar} source={{ uri: imagePath }} />
          <Image style={styles.changeAvatar} source={require('../../../media/images/changeavatar.png')} />
        </View>
      </TouchableOpacity>
      <View style={styles.viewInput}>
        <TextInput
          placeholder='password'
          style={Loginstyles.txtInput_phoneNumber}
          value={password}
          onChangeText={text => setpassword(text)}
        >

        </TextInput>
      </View>
      <View style={styles.viewInput}>
        <TextInput
          placeholder='name'
          style={Loginstyles.txtInput_phoneNumber}
          value={name}
          onChangeText={text => setName(text)}
        >

        </TextInput>
      </View>
      <View style={styles.viewInput}>
        <TextInput
          placeholder='age'
          style={Loginstyles.txtInput_phoneNumber}
          keyboardType='numeric'
          value={age}
          onChangeText={text => setAge(text)}
        >

        </TextInput>
      </View>
      <View style={styles.viewInput}>
        <TextInput
          placeholder='phone'
          style={Loginstyles.txtInput_phoneNumber}
          value={phone}    
          onChangeText={text => setPhone(text)}
        >

        </TextInput>
      </View>
      <View style={styles.viewInput}>
        <TextInput
          placeholder='gender'
          style={Loginstyles.txtInput_phoneNumber}
          value={gender}
          onChangeText={text => setGender(text)}
        >

        </TextInput>
      </View>
      <View style={Loginstyles.view_btnNext}>
        <View></View>
        <TouchableOpacity
          onPress={() => {
              haddleSignUp();

          }}
        >
          <View style={Loginstyles.btn_next}>
            <Image source={require('../../../media/images/ic_arrow_next.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
              setShow(false);
            }}>
              
            <View style={styles.containerMODAL}>
            <TouchableOpacity onPress={() => {
                setShow(false);
              }}>
              <View style={{height:100, backgroundColor: 'white', borderTopEndRadius:20, borderTopStartRadius:20}}>
              {/* <TouchableOpacity
              onPress={() => {
                setModelVisible(false);
              }}>
                <Image style={{marginTop:10, marginStart:10}} source={require('../../../assets/IconCancel.png')}/>
                </TouchableOpacity> */}
              <View style={{flexDirection:'row',justifyContent: 'center',alignItems: 'center', marginTop:35}}>
                <View style={{flexDirection:'row', alignItems: 'center',}}>
                  <TouchableOpacity onPress={openCamera}>
                    <Image style={{tintColor:'black', width:30, height:30,}} source={require('../../../media/images/Camera.png')} />
                  </TouchableOpacity>
                  <Text style={{marginStart:10, fontSize:20, color:'#000'}}>Chụp Hình</Text>
                </View>
                <View style={{flexDirection:'row', marginStart:40, alignItems: 'center',}}>
                  <TouchableOpacity onPress={openLibrary}>
                  <Image style={{tintColor:'black', width:30, height:30,}} source={require('../../../media/images/ImageLibrary.png')} />
                  </TouchableOpacity>
                  <Text style={{marginStart:10, fontSize:20, color:'#000'}}>Thư viện</Text>
                </View>
              </View>
              </View>
            </TouchableOpacity>
            </View>
          </Modal>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register
const styles = StyleSheet.create({
  viewInput : {
    flexDirection : "row",
    borderBottomColor : '#E0E0E0',
    borderBottomWidth : 1,
    paddingHorizontal : 13,
    alignItems : 'center',
    marginTop : 22
},
  changeAvatar: {
    position: 'absolute',
    bottom: 10,
    end: 10
  },
  avatar: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center'
  },
  viewAvatar: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: '#67E965'
  },
  viewHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30
  }
})