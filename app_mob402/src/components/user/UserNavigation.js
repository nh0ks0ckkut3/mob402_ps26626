import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import ForgetPass from './screens/ForgetPass';
import Login from './screens/Login';
import Onboarding from './screens/Onboarding';
import Register from './screens/Register';
import Welcome from './screens/Welcome';
import Login_PassWord from './screens/Login_PassWord';

const UserNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='Welcome'
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="ForgetPass" component={ForgetPass} />
      <Stack.Screen name="Login_PassWord" component={Login_PassWord} />
    </Stack.Navigator>
  )
}

export default UserNavigation