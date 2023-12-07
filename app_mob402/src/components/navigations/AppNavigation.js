import React, { useContext } from 'react'

import UserNavigation from '../user/UserNavigation'
import HomeNavigation from '../home/HomeNavigation'

import { UserContext } from '../user/UserContext'

import { NavigationContainer } from '@react-navigation/native';

const AppNavigation = (props) => {
    const { user } = useContext(UserContext);
    return (
        <NavigationContainer>
            {user ? <HomeNavigation /> : <UserNavigation />}
        </NavigationContainer>
    )
}

export default AppNavigation