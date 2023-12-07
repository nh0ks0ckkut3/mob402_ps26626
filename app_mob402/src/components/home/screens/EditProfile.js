import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import React from 'react'
import { ProfileStyles } from '../styles/ProfileStyles'
import { UserContext } from '../../user/UserContext'
import { useState, useContext, useCallback } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getUpdateImage } from '../HomeHTTP'
import { setPersonInformation } from '../../user/UserHTTP'
import { Modal } from 'react-native';

const EditProfile = (props) => {
  const { user, setUser } = useContext(UserContext)
  let role = "";
  if (user.user.role == 1) {
    role = "admin"
  } else if (user.user.role == 2) {
    role = "manager"
  } else {
    role = "khách hàng thân thiết"
  }
  const [show, setShow] = useState(false);
  const [imagePath, setImagePath] = useState(user.avatar);
  const [avatar, setAvatar] = useState(user.user.avatar);
  const [phone, setPhone] = useState(user.user.phone);
  const [age, setAge] = useState(user.user.age);
  const [gender, setGender] = useState(user.user.gender);
  const [statusEdit, setstatusEdit] = useState(false);
  const navigation = props.navigation;

  const hanlderEditProfile = async () => {
    try {
      const result = await setPersonInformation(user.user._id, phone, imagePath, age, gender);
      try {
        console.log(result);
        setUser(result);
        ToastAndroid.show("cập nhật thành công", ToastAndroid.SHORT);
        setstatusEdit(false);
      } catch (error) {
        
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  /// xử lý hình ảnh
  const takePhoto = useCallback(async response => {
    if (response.didCancel) return;
    if (response.errorCode) return;
    if (response.errorMessage) return;
    if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      setShow(false);
      // upload image
      const formData = new FormData();
      formData.append('image', {
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
      });
      try {
        const result = await getUpdateImage(formData);
        setImagePath(result.path);
        setAvatar(result.path);
      } catch (error) {
        console.log(error);
      }


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
  const openLibrary = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    await launchImageLibrary(options, takePhoto);
  }, []);

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.Header}>
        <Image style={Styles.background} source={require('../../../media/images/anh-bia-595x311.jpg')} />
        <TouchableOpacity style={Styles.viewAvatar}
          onPress={() => {
            setShow(true);
          }}
        >
          <Image style={Styles.avatar} source={{ uri: avatar }} />
          <Image style={Styles.changeAvatar} source={require('../../../media/images/ic_camera.png')} />
        </TouchableOpacity>

      </View>
      <View style={Styles.viewMain}>
        <Text style={Styles.txtName}>{user.user.name}</Text>
        <TouchableOpacity
          style={Styles.btnEdit}
          onPress={() => {
            if (statusEdit) {
              hanlderEditProfile();
            }else{
              setstatusEdit(true);
            }
            
          }}
        >
          <Text style={Styles.txtEdit}> {!statusEdit ? "Chỉnh sửa trang cá nhân" : "Lưu"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.btnEdit, { backgroundColor: '#DEF2EF', marginTop: 7 }]}
        >
          <Text style={Styles.txtEdit}>Thêm địa chỉ nhận hàng</Text>
        </TouchableOpacity>
        <View style={Styles.space}>

        </View>
        <View style={Styles.viewName}>
          <Text style={[Styles.txtEdit, { fontWeight: '700' }]}>Thông tin chi tiết</Text>
          <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
            <Text style={Styles.txtInfo}>Email : </Text>
            <TextInput
              style={Styles.txtInfo_show}
              editable={false}
            >{user.user.email}</TextInput>
          </View>
          <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
            <Text style={Styles.txtInfo}>Tuổi : </Text>
            <TextInput
              style={statusEdit ? Styles.txtInfo_edit : Styles.txtInfo_show}
              editable={statusEdit}
              keyboardType='numeric'
              onChangeText={(text) => setAge(text)}
            >{age}</TextInput>
          </View>
          <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
            <Text style={Styles.txtInfo}>Giới tính : </Text>
            <TextInput
              style={statusEdit ? Styles.txtInfo_edit : Styles.txtInfo_show}
              editable={statusEdit}
              onChangeText={(text) => setGender(text)}
            >{gender}</TextInput>
          </View>
          <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
            <Text style={Styles.txtInfo}>SĐT : </Text>
            <TextInput
              style={statusEdit ? Styles.txtInfo_edit : Styles.txtInfo_show}
              editable={statusEdit}
              keyboardType='numeric'
              onChangeText={(text) => setPhone(text)}
            >{phone}</TextInput>
          </View>
        </View>
        <View style={Styles.viewName}>
          <Text style={[Styles.txtEdit, { fontWeight: '700' }]}>Địa chỉ nhận hàng</Text>
          <Text style={Styles.txtInfo}>Nhà : 87/3 Nguyễn Sỹ Sách - Tân Bình</Text>
          <Text style={Styles.txtInfo}>Công ty : Công viên phần mềm Quang Trung - Tô ký</Text>
          <Text style={Styles.txtInfo}>Địa chỉ 1 : 453 Lê Hông Phong - Thủ Dầu Một</Text>
          <Text style={Styles.txtInfo}>Địa chỉ 2 : 2/38 Trần Bình Trọng - Thủ Dầu Một</Text>
        </View>
        <View style={Styles.viewName}>
          <Text style={[Styles.txtEdit, { fontWeight: '700' }]}>Địa chỉ Salon gần anh</Text>
          <Text style={Styles.txtInfo}>gần Nhà : 99 Phan Huy Ích - Tân Bình</Text>
          <Text style={Styles.txtInfo}>gần Công ty : 36 Nguyễn Ảnh Thủ - Q.12</Text>
          <Text style={Styles.txtInfo}>gần Địa chỉ 1 : 641 CMT8 - Phú Cường - Thủ Dầu Một</Text>
          <Text style={Styles.txtInfo}>gần Địa chỉ 2 : 80 Phú Lợi - Phú Hòa - Thủ Dầu Một</Text>
        </View>
        <TouchableOpacity>
          <View style={Styles.viewOption}>
            <Image style={Styles.imgOption} source={require('../../../media/images/world.png')} />
            <Text style={Styles.txtOption}>Xem hệ thống salon</Text>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          onRequestClose={() => {
            setShow(false);
          }}>

          <View style={Styles.containerMODAL}>
            <TouchableOpacity onPress={() => {
              setShow(false);
            }}>
              <View style={{ height: 100, backgroundColor: 'white', borderTopEndRadius: 20, borderTopStartRadius: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                  <View>
                    <TouchableOpacity onPress={openCamera} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%' }}>
                      <Image style={{ tintColor: 'black', width: 30, height: 30, }} source={require('../../../media/images/Camera.png')} />
                      <Text style={{ marginStart: 10, fontSize: 20, color: '#000' }}>Chụp Hình</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity onPress={openLibrary} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: '100%' }}>
                      <Image style={{ tintColor: 'black', width: 30, height: 30, }} source={require('../../../media/images/ImageLibrary.png')} />
                      <Text style={{ marginStart: 10, fontSize: 20, color: '#000' }}>Thư viện</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}

export default EditProfile
export const Styles = StyleSheet.create({
  txtInfo_show: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    textAlignVertical: 'center',
    color: 'black',
    textAlign : 'right'
  },
  txtInfo_edit: {
    paddingVertical: 0,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    width : '70%',
    textAlign : 'right'
  },
  containerMODAL: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
    // flexDirection: 'row',
  },
  txtOption: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4a4949',
    marginStart: 7
  },
  viewOption: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: 336,
    height: 37,
    paddingStart: 5,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10
  },
  space: {
    width: '100%',
    height: 10,
    backgroundColor: '#D9D9D9',
    marginTop: 10
  },
  txtEdit: {
    fontSize: 15,
    color: 'black'
  },
  btnEdit: {
    backgroundColor: '#A7F8A5',
    marginHorizontal: 15,
    marginTop: 15,
    alignItems: 'center',
    borderRadius: 5,
    height: 30,
    justifyContent: 'center'
  },
  viewAvatar: {
    position: 'absolute',
    start: 15,
    top: 40
  },
  background: {
    width: '100%',
    height: 160,
    position: 'relative'
  },
  changeAvatar: {
    position: 'absolute',
    bottom: 20,
    right: 10
  },
  viewMain: {
    width: '100%',
    height: '100%'
  },
  txtInfo: {
    marginTop: 5,
    color: 'black',
    marginStart: 10
  },
  viewName: {
    marginHorizontal: 15,
    marginTop: 10
  },
  txtName: {
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
    marginStart: 25
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'white'
  },
  Header: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 40

  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})