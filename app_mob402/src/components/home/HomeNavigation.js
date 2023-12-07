import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'react-native';
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Book from './screens/Book';
import Cart from './screens/Cart';
import DetailHistory from './screens/DetailHistory';
import DetailProduct from './screens/DetailProduct';
import DetailService from './screens/DetailService';
import History from './screens/History';
import Home from './screens/Home';
import News from './screens/News';
import Profile from './screens/Profile';
import Shop from './screens/Shop';
import EditProfile from './screens/EditProfile';

const screenOptions = ({ route }) => ({
    
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
        if (route.name == "Home") {
            if (focused) {
                return <Image source={require('../../media/images/ic_home_bottom_nav_focus.png')} style={styles.icNav} />
            } else {
                return <Image source={require('../../media/images/ic_home_bottom_nav_focus.png')} style={styles.icNav} />
            }
        } else if (route.name == "Shop") {
            if (focused) {
                return <Image source={require('../../media/images/ic_shop_bottom_nav_unfocus.png')} style={styles.icNav} />
            } else {
                return <Image source={require('../../media/images/ic_shop_bottom_nav_unfocus.png')} style={styles.icNav} />
            }
        }
        else if (route.name == "Profile") {
            if (focused) {
                return <Image source={require('../../media/images/ic_profile_bottom_nav_unfocus.png')} style={styles.icNav} />
            } else {
                return <Image source={require('../../media/images/ic_profile_bottom_nav_unfocus.png')} style={styles.icNav} />
            }
        }
        else if (route.name == "Book") {
            if (focused) {
                return <Image source={require('../../media/images/ic_book_bottom_nav_unfocus.png')} style={styles.icNav} />
            } else {
                return <Image source={require('../../media/images/ic_book_bottom_nav_unfocus.png')} style={styles.icNav} />
            }
        }
        else if (route.name == "News") {
            if (focused) {
                return <Image source={require('../../media/images/ic_news_bottom_nav_unfocus.png')} style={styles.icNav} />
            } else {
                return <Image source={require('../../media/images/ic_news_bottom_nav_unfocus.png')} style={styles.icNav} />
            }
        }

    },
    tabBarLabel: ({ focused, color, size }) => {
        if (route.name == "Home") {
            if (focused) {
                return <Text style={[{ color: '#1877f2' }, styles.textNav]}>Home</Text>
            } else {
                return <Text style={[{ color: '#4E4B66' }, styles.textNav]}>Home</Text>
            }
        } else if (route.name == "Shop") {
            if (focused) {
                return <Text style={[{ color: '#1877f2' }, styles.textNav]}>Shop</Text>
            } else {
                return <Text style={[{ color: '#4E4B66' }, styles.textNav]}>Shop</Text>
            }
        }
        else if (route.name == "Book") {
            if (focused) {
                return <Text style={[{ color: '#1877f2' }, styles.textNav]}>Book</Text>
            } else {
                return <Text style={[{ color: '#4E4B66' }, styles.textNav]}>Book</Text>
            }
        }
        else if (route.name == "Profile") {
            
            if (focused) {
                return <Text style={[{ color: '#1877f2' }, styles.textNav]}>Profile</Text>
            } else {
                return <Text style={[{ color: '#4E4B66' }, styles.textNav]}>Profile</Text>
            }
        }
        else if (route.name == "News") {
            
            if (focused) {
                return <Text style={[{ color: '#1877f2' }, styles.textNav]}>News</Text>
            } else {
                return <Text style={[{ color: '#4E4B66' }, styles.textNav]}>News</Text>
            }
        }
    },
    tabBarStyle: { backgroundColor: 'white', position: 'absolute', height: 78, flexDirection: 'row', justifyContent: 'space-between',
                    paddingBottom: 15, paddingTop: 15},
})
const HomeBottomTab = ( props ) => {
    return (
        
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={screenOptions}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Shop" component={Shop} />
            <Tab.Screen name="Book" component={Book} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="News" component={News} />
        </Tab.Navigator>
    )
}
const HomeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        initialRouteName='HomeBottomTab'>
        <Stack.Screen
          options={{ headerShown: false }}
          name='HomeBottomTab'
          component={HomeBottomTab}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='Home'
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='Cart'
          component={Cart}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='DetailHistory'
          component={DetailHistory} />
        <Stack.Screen
          options={{ headerShown: false }}
          name='DetailProduct'
          component={DetailProduct} />
        <Stack.Screen
          options={{ headerShown: false }}
          name='DetailService'
          component={DetailService} />
        <Stack.Screen
          options={{ headerShown: false }}
          name='History'
          component={History} />
        <Stack.Screen
          options={{ headerShown: false }}
          name='EditProfile'
          component={EditProfile} />
  
      </Stack.Navigator>
    )
  }
  
  
  
  export default HomeStack

  const styles = StyleSheet.create({
    textNav: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '400',
        letterSpacing: 0.12
    },
    icNav: {
        width: 24,
        height: 24
    }
})