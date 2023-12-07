import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { ProfileStyles } from '../styles/ProfileStyles'
import { UserContext } from '../../user/UserContext'
import { useState, useContext, useCallback } from 'react'
import { Modal } from 'react-native';
import { changePass } from '../../user/UserHTTP'

const Profile = (props) => {
  const { user, setUser } = useContext(UserContext)
  const [show, setShow] = useState(false)
  const [currentPass, setcurrentPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [newPassRepeat, setNewPassRepeat] = useState("")
  let role = "";
  if (user.user.role == 1) {
    role = "admin"
  } else if (user.user.role == 2) {
    role = "manager"
  } else {
    role = "khách hàng thân thiết"
  }
  const navigation = props.navigation;
  const handleChangePass = async () => {
    try {
      const result = await changePass(user.user._id, currentPass, newPass);
      try {
        console.log(result);
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
        if (result.message == "đổi mật khẩu thành công") {
          setUser(null);
        }
      } catch (error) {

      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <SafeAreaView style={ProfileStyles.container}>
      <View style={ProfileStyles.Header}>
        <Image style={ProfileStyles.avatar} source={require('../../../media/images/hoaAvatar.jpg')} />
        <View style={ProfileStyles.viewName}>
          <Text style={ProfileStyles.txtName}>{user.user.name}</Text>
          <Text style={ProfileStyles.txtRole}>{role}</Text>
        </View>
      </View>
      <View style={ProfileStyles.Ads}>
        <Image style={ProfileStyles.img_ads} source={require('../../../media/images/skinner.jpg')} />
        <View style={ProfileStyles.view_content_ads}>
          <Text style={ProfileStyles.txtTitle_ads}>Liệu trình vàng - Tri ân  khách hàng</Text>
          <Text style={ProfileStyles.txtContent_ads}>
            Ưu đãi mua 6 tặng 1 hoặc mua 1 tặng 2 với các liệu trình{'\n'}
            Gội massage siêu thư giãn{'\n'}
            Gội massage  đá  nóng Himalaya{'\n'}
            Gội thư giãn Midnight{'\n'}
            Chăm sóc da chuyên sâu Lightsmooth{'\n'}
            Gội massage Đả thông kinh lạc ngũ hành</Text>
          <TouchableOpacity>
            <View style={ProfileStyles.btn_ads}>
              <Text style={ProfileStyles.txt_btn_ads}>XEM CHI TIẾT LIỆU TRÌNH</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      >
        <View style={ProfileStyles.viewOption}>
          <Image style={ProfileStyles.imgOption} source={require('../../../media/images/User.png')} />
          <Text style={ProfileStyles.txtOption}>Thông tin cá nhân</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={ProfileStyles.viewOption}>
          <Image style={ProfileStyles.imgOption} source={require('../../../media/images/scissor.png')} />
          <Text style={ProfileStyles.txtOption}>Lịch sử cắt</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setShow(true);
        }}
      >
        <View style={ProfileStyles.viewOption}>
          <Image style={ProfileStyles.imgOption} source={require('../../../media/images/padlock.png')} />
          <Text style={ProfileStyles.txtOption}>Đổi mật khẩu</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setUser(null)
        }}
      >
        <View style={ProfileStyles.viewOption}>
          <Image style={ProfileStyles.imgOption} source={require('../../../media/images/Key.png')} />
          <Text style={ProfileStyles.txtOption}>Đăng xuất</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(false);
        }}>

        <TouchableOpacity style={ProfileStyles.containerMODAL}
          onPress={() => {
            setShow(false);
          }}
        >
          <TouchableOpacity style={ProfileStyles.modal}
            activeOpacity={1}
          >
            <View style={ProfileStyles.viewTitleChangePass}>
              <Text style={ProfileStyles.txtTitleChangePass}>Đổi mật khẩu</Text>
            </View>
            <TextInput style={ProfileStyles.inputChangePass}
              placeholder='Nhập mật khẩu cũ'
              value={currentPass}
              onChangeText={(text) => { setcurrentPass(text) }}
            >

            </TextInput>
            <TextInput style={ProfileStyles.inputChangePass}
              placeholder='Nhập mật khẩu mới'
              value={newPass}
              onChangeText={(text) => { setNewPass(text) }}
            >

            </TextInput>
            <TextInput style={ProfileStyles.inputChangePass}
              placeholder='Xác nhận lại mật khẩu mới'
              value={newPassRepeat}
              onChangeText={(text) => { setNewPassRepeat(text) }}
            >

            </TextInput>
            <TouchableOpacity
              style={ProfileStyles.btnConfirmChangePass}
              onPress={() => {
                if (currentPass.trim().length == 0 || newPass.trim().length == 0 || newPassRepeat.trim().length == 0) {
                  Alert.alert("không bỏ trống");
                } else if (newPass != newPassRepeat) {
                  Alert.alert("xác nhật mật khẩu mới không đúng");
                } else if (newPass == currentPass) {
                  Alert.alert("mật khẩu mới phải khác mật khẩu hiện tại");
                } else {
                  handleChangePass();
                }
              }}
            >
              <Text style={ProfileStyles.txtConfirmChangePass}>Xác nhận</Text>
            </TouchableOpacity>
          </TouchableOpacity>

        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}

export default Profile